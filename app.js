import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import debug from 'debug';
import cors from 'cors';
import sequelize from "./config/Sequelize.js";
import {Server} from "socket.io";
import usersRouter from './routes/userRoute.js';

const app = express()
const server = http.createServer(app)
const io = new Server(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
});

sequelize.sync().then(() => {
  console.log("Database connected successfully")
})


io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);


  socket.on("SEND_MESSAGE", (data) => {
    io.emit("MESSAGE_RESPONSE", data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

});

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/User', usersRouter);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log(bind)
  }