import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import connection from "./db";

interface SWAPICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface TranslatedCharacter {
  nombre: string;
  altura: string;
  peso: string;
  color_cabello: string;
  color_piel: string;
  color_ojos: string;
  ano_nacimiento: string;
  genero: string;
}

const translateSWAPICharacter = (
  character: SWAPICharacter
): TranslatedCharacter => ({
  nombre: character.name,
  altura: character.height,
  peso: character.mass,
  color_cabello: character.hair_color,
  color_piel: character.skin_color,
  color_ojos: character.eye_color,
  ano_nacimiento: character.birth_year,
  genero: character.gender,
});

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crea un nuevo personaje en la base de datos
 *     description: Obtiene un personaje desde SWAPI y lo almacena en la base de datos MySQL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               swapiUrl:
 *                 type: string
 *                 description: La URL del personaje en SWAPI
 *     responses:
 *       200:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 personaje:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     altura:
 *                       type: string
 *                     peso:
 *                       type: string
 *                     color_cabello:
 *                       type: string
 *                     color_piel:
 *                       type: string
 *                     color_ojos:
 *                       type: string
 *                     ano_nacimiento:
 *                       type: string
 *                     genero:
 *                       type: string
 *       500:
 *         description: Error al crear el personaje
 */
export const createCharacter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { swapiUrl } = JSON.parse(event.body!);

    const response = await axios.get<SWAPICharacter>(swapiUrl);
    const translatedCharacter = translateSWAPICharacter(response.data);

    const query = `
      INSERT INTO personajes (nombre, altura, peso, color_cabello, color_piel, color_ojos, ano_nacimiento, genero)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(query, Object.values(translatedCharacter));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Personaje creado exitosamente desde SWAPI",
        personaje: translatedCharacter,
      }),
    };
  } catch (error) {
    const typedError = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo crear el personaje",
        details: typedError.message,
      }),
    };
  }
};

/**
 * @swagger
 * /get:
 *   get:
 *     summary: Obtiene los personajes almacenados en la base de datos
 *     description: Devuelve todos los personajes almacenados en la base de datos MySQL
 *     responses:
 *       200:
 *         description: Lista de personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   altura:
 *                     type: string
 *                   peso:
 *                     type: string
 *                   color_cabello:
 *                     type: string
 *                   color_piel:
 *                     type: string
 *                   color_ojos:
 *                     type: string
 *                   ano_nacimiento:
 *                     type: string
 *                   genero:
 *                     type: string
 *       500:
 *         description: Error al obtener los personajes
 */
export const getCharacters = async (): Promise<APIGatewayProxyResult> => {
  try {
    const query = "SELECT * FROM personajes";
    const [rows] = await connection.query(query);

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    const typedError = error as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudieron obtener los personajes",
        details: typedError.message,
      }),
    };
  }
};
