import { createCharacter, getCharacters } from '../src/handler';
import axios from 'axios';
import connection from '../src/db';

jest.mock('axios');
jest.mock('../src/db');

describe('createCharacter', () => {
  it('should create a character and return success message', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { name: 'Luke Skywalker', height: '172', mass: '77' }
    });

    (connection.query as jest.Mock).mockResolvedValueOnce({});

    const event = {
      body: JSON.stringify({ swapiUrl: 'https://swapi.py4e.com/api/people/1/' })
    };

    const response = await createCharacter(event as any);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe('Personaje creado exitosamente desde SWAPI');
  });
});

describe('getCharacters', () => {
  it('should return a list of characters', async () => {
    (connection.query as jest.Mock).mockResolvedValueOnce([[{ nombre: 'Luke Skywalker' }]]);

    const response = await getCharacters();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)[0].nombre).toBe('Luke Skywalker');
  });
});
