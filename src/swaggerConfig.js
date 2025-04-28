import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Currency Converter API",
            version: "1.0.0",
            description: "API for currency conversion, historical rates, and alerts.",
        },
        servers: [
            {
                url: "https://currency-converter-api-zks2.onrender.com", 
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // Optional, but recommended
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Apply globally to all routes
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
