const swaggerUi = require('swagger-ui-express');
const v1swaggerDocument = require('./v1swagger.json');

const swaggerDocs = (app) => {
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(v1swaggerDocument));
};

module.exports = swaggerDocs;