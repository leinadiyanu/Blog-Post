import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Blog Website API',
            version: '1.0.0',
            description: 'API documentation for A simple Blog Website'
            },
            servers: [
                {
                    url: "http://localhost:5000"
                },
            ],
    },
    apis: [`${__dirname}/../routes/*.js`]
};

const swaggerSpec = swaggerJsdoc(options);
// console.log('Swagger paths:', JSON.stringify(swaggerSpec.paths, null, 2));

export {swaggerUi, swaggerSpec};