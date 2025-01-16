import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project Management API',
            version: '1.0.0',
            description: 'API documentation for the Project Management System',
        },
        servers: [
            {
                url: 'http://localhost:5005', // Update with your deployed URL
            },
        ],
    },
    apis: ['./src/adapter/controllers/**/*.ts'], // Path to your route annotations
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Function to set up Swagger
export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log('Swagger Docs available at /api-docs');
};
