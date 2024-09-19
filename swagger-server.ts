import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});
