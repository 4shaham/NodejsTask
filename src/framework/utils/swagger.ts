import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';



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
                url:process.env.HOSTURL
                // url:'http://localhost:5005' 
            },
        ],  
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional, clarifies the type of token expected
              },
            },
          },         
          security: [
            {
              bearerAuth: [],
            },
          ],
    },
    apis: ['./src/adapters/controller/*.ts'], 
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);


export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log('Swagger Docs available at /api-docs');
};
