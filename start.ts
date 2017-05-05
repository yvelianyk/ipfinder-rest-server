/**
 * Module dependencies.
 */

import { app } from './app';
import { config } from './config';
//import * as mongoose from 'mongoose';
//import * as http from 'http';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/**
 * Connect to Mongo Database
 */
// mongoose.connect(config.MONGO_DB_URL);
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection to Database error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('Connected to Database succesfully!')
// });

/**
 * Create HTTP server.
 * Listen on provided port, on all network interfaces.
 */
const server = app.listen(port);

/**
 * Handling errors.
 */
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val): boolean | number {

  const normalizedPort = parseInt(val, 10);

  if (isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}