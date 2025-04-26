import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Currency Converter API",
            version: "1.0.0",
            description: "API for converting currencies, fetching historical rates, and managing alerts.",
        },
        servers: [
            {
                url: "https://currency-converter-api-zks2.onrender.com/",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
