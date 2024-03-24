const cors = require('cors');

const corsMiddleware =(acceptedOrigins = []) =>{
    if (!acceptedOrigins.length) return cors();

    return cors({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin)) return callback(null,true);

            if (!origin) return callback(null, true);

            return callback(new Error('Not allowed by CORS'));
        }
    });
};

module.exports = corsMiddleware;