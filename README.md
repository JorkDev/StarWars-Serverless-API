
# StarWars Serverless API - Node.js AWS

## Descripción del Proyecto

Este proyecto consiste en crear una API utilizando **Node.js** y desplegarla en **AWS Lambda** mediante el uso del **Serverless Framework**. La API realiza una integración con la API pública de StarWars (**SWAPI**) y traduce los nombres de los atributos del inglés al español. Además, se integra con una base de datos MySQL para almacenar los datos obtenidos y manipulados.

Los puntos clave del proyecto incluyen:
- Creación de dos endpoints: uno para crear un elemento (**POST**) y otro para obtener la información almacenada (**GET**).
- Traducción de los modelos obtenidos de SWAPI del inglés al español.
- Despliegue de la API en AWS Lambda mediante el Serverless Framework.
- Almacenamiento de los datos en una base de datos MySQL.

## Instalación y Configuración

### Clonación del Repositorio

Para clonar este repositorio y trabajar localmente, sigue estos pasos:

1. Clona el repositorio:

```bash
git clone https://github.com/JorkDev/StarWars-Serverless-API
```

2. Accede al directorio del proyecto:

```bash
cd StarWars-Serverless-API
```

3. Instala las dependencias necesarias:

```bash
npm install
```

### Configuración del Entorno

Crea un archivo **`.env`** en el directorio raíz del proyecto para definir las variables de entorno necesarias, como la conexión a la base de datos MySQL. Aquí tienes un ejemplo de configuración:

```bash
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=starwars
```

Este archivo define los detalles de la conexión a la base de datos MySQL.

### Creación de la Base de Datos

Antes de ejecutar la aplicación, es necesario crear la base de datos en MySQL. Ejecuta los siguientes comandos en tu servidor MySQL:

```sql
CREATE DATABASE starwars;
USE starwars;

CREATE TABLE personajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  altura VARCHAR(255),
  peso VARCHAR(255),
  color_cabello VARCHAR(255),
  color_piel VARCHAR(255),
  color_ojos VARCHAR(255),
  ano_nacimiento VARCHAR(255),
  genero VARCHAR(255)
);
```

Esto creará la base de datos `starwars` y la tabla `personajes`, donde se almacenarán los datos obtenidos y traducidos de la API de SWAPI.

### Configuración de AWS

Asegúrate de tener configuradas las credenciales de AWS en tu entorno local para poder desplegar el proyecto en AWS Lambda. Puedes configurar tus credenciales de AWS con el siguiente comando:

```bash
aws configure
```

### Despliegue en AWS

Para desplegar la API en AWS Lambda utilizando el Serverless Framework, ejecuta el siguiente comando:

```bash
serverless deploy
```

Este comando desplegará las funciones Lambda, los endpoints de la API Gateway, y la base de datos en MySQL.

### Ejecución de la API Localmente

Si deseas ejecutar la API localmente antes de desplegarla en AWS, puedes usar el siguiente comando:

```bash
serverless offline
```

Esto iniciará un servidor local para probar los endpoints.

### Swagger - Documentación de la API

He integrado Swagger para documentar los endpoints de la API y facilitar su uso y prueba.

Para levantar la documentación Swagger de manera local:

1. Ejecuta el siguiente comando para iniciar el servidor de Swagger:

```bash
npx ts-node swagger-server.ts
```

2. Una vez que el servidor esté corriendo, puedes acceder a la documentación de la API en:

```
http://localhost:3000/api-docs
```

Esta URL te llevará a una interfaz de Swagger donde podrás ver y probar los endpoints.

### Linting y Tipos

Este proyecto está escrito en **TypeScript** para garantizar un tipado estricto y prevenir errores comunes. Además, se recomienda ejecutar **ESLint** para asegurar la calidad del código.

Para ejecutar **TypeScript** y asegurarte de que el código no tiene errores de tipado:

```bash
npx tsc
```

Para correr **ESLint** (si está configurado):

```bash
npm run lint
```

### Endpoints

#### POST `/create`
Crea un nuevo personaje en la base de datos. Los datos son obtenidos de la API de SWAPI y los atributos se traducen al español antes de almacenarse.

**Request:**

```json
{
  "swapiUrl": "https://swapi.py4e.com/api/people/1/"
}
```

**Response:**

```json
{
  "message": "Personaje creado exitosamente desde SWAPI",
  "personaje": {
    "nombre": "Luke Skywalker",
    "altura": "172",
    "peso": "77",
    "color_cabello": "blond",
    "color_piel": "fair",
    "color_ojos": "blue",
    "ano_nacimiento": "19BBY",
    "genero": "male"
  }
}
```

#### GET `/get`
Recupera todos los personajes almacenados en la base de datos.

**Response:**

```json
[
  {
    "nombre": "Luke Skywalker",
    "altura": "172",
    "peso": "77",
    "color_cabello": "blond",
    "color_piel": "fair",
    "color_ojos": "blue",
    "ano_nacimiento": "19BBY",
    "genero": "male"
  },
  {
    "nombre": "C-3PO",
    "altura": "167",
    "peso": "75",
    "color_cabello": "n/a",
    "color_piel": "gold",
    "color_ojos": "yellow",
    "ano_nacimiento": "112BBY",
    "genero": "n/a"
  }
]
```

## Casos de Prueba

El proyecto incluye pruebas unitarias básicas que validan la correcta integración con SWAPI, la traducción de los atributos, y la funcionalidad de los endpoints GET y POST. Las pruebas están diseñadas utilizando Jest.

Para ejecutar los casos de prueba, simplemente ejecuta:

```bash
npm test
```

## Reflexiones Finales

Este proyecto implementa una API serverless moderna que aprovecha al máximo el Serverless Framework y AWS Lambda, además de una integración muy entretenida y educativa con la API de Star Wars, lo cual me emocionó especialmente porque soy un fan acérrimo de Star Wars. Personalmente, uno de los mayores retos fue asegurarme que la configuración de serverless sea estable y que todo el flujo de creación y recuperación de datos funcionara sin errores. Elegí utilizar MySQL, lo que me brindó una gran flexibilidad en la gestión de la base de datos, y el despliegue sin servidor facilitó una escalabilidad eficiente sin preocuparme por la infraestructura.

El uso del framework Serverless y la integración con SWAPI hace que este proyecto sea una excelente oportunidad para aprender sobre tecnologías modernas en la nube y la gestión de APIs.

La combinación de tecnología de punta y mi pasión por Star Wars hizo que este proyecto fuera no solo una experiencia educativa, sino también increíblemente divertida y gratificante.
