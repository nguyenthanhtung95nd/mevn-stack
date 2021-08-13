const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * Determines the current environment and sets the appropriate variables
 * @param {Express App} app 
 */
function setEnvironment(app) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app);
    }
}

/**
 * Used to set development environment variables
 * @param {Express App} app 
 */
function setDevEnv(app) {
    console.log("setting development environment");
    process.env.NODE_ENV = 'development';
    app.use(bodyParser.json()); // Allows parsing JSON from the client
    app.use(morgan('dev')); // Log HTTP Requests to the node console (for debugging purposes)
    app.use(cors()); // Enable Cross Origin Requests, since Vue.JS is on a different origin
    process.env.DB_URL = 'mongodb+srv://xxxxxx/BookDb?retryWrites=true&w=majority';
    process.env.TOKEN_SECRET = 'my-development-token-secret'; // Set the token secret in development
}

/**
 * Used to set production environment variables
 * @param {Express App} app 
 */
function setProdEnv(app) {
    console.log("setting production environment");
    process.env.NODE_ENV = 'production';
    process.env.DB_URL = 'my-url-db-secret'; // Database URL Production secure
    process.env.TOKEN_SECRET = 'my-production-token-secret'; // TOKEN_SECRET Production secure
    app.use(bodyParser.json());
}

module.exports = {
    setEnvironment: setEnvironment
};