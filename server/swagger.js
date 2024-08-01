const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

// const specs = swaggerJsdoc(options)
var options = {
    swaggerOptions: {
        validatorUrl: null
    }
};


module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}