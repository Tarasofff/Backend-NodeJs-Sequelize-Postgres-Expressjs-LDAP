module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'Express API'

        },
        servers: [
            {
                url: 'http://localhost:1111'
            }
        ]
    },
    apis: ['openapi.yaml'],
}