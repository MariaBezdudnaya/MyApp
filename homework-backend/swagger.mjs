import swaggerJSDoc from 'swagger-jsdoc';
import {getPort} from './app.mjs';

const swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: `localhost:${getPort()}`,
    basePath: '/',
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'jwt',
            in: 'header',
            bearerFormat: 'JWT',
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./app.mjs'],
};

export const swaggerSpec = swaggerJSDoc(options);