import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'StarWars API',
    version: '1.0.0',
    description: 'API para la creación y obtención de personajes de StarWars',
  },
  servers: [
    {
      url: 'http://localhost:3000/dev',
      description: 'Servidor Local'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/handler.ts']
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
