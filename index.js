require("./config");

const app = require('./app');
const http = require('http');

const port = CONFIG.port;

app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires admin privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
    console.log("Server on " + bind);
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
    console.log("Server on " + bind);
}