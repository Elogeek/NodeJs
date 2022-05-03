const http = require('http');
const app = require('./app');
const server = http.createServer(app);

/**
 * Log error message and exit.
 * @param msg
 */
const logExit = msg => {
    const bind = typeof server.address() === 'string' ? 'pipe ' + server.address() : 'port: ' + port;
    console.error(`${bind} ${msg}`);
    process.exit(1);
}

/**
 * Server errors handling.
 * @param error
 */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            logExit('requires elevated privileges.');
            break;
        case 'EADDRINUSE':
            logExit('is already in use.');
            break;
        default:
            throw error;
    }
};

server.on('error', errorHandler);

// Normalisation du port, on s'assure d'avoir un port valide.
const portNormalizer = (port, defaultPort) => undefined !== port && !isNaN(parseInt(port)) ? parseInt(port) : defaultPort;
const port = portNormalizer(process.env.PORT, 3000 );
app.set('port', port);
server.listen(port, () => console.log("Server started, listening port: " + port));


