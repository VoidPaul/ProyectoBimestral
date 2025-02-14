import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Comercial API",
            version: "1.0.0",
            description: "API para una gestión comercial",
            contact:{
                name: "Angel Javier Tum González",
                email: "atum-2023017@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3002/comercialPF/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        /*"./src/user/user.routes.js",
        "./src/pet/pet.routes.js",
        "./src/appointment/appointment.routes.js"*/
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}