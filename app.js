import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import debug from 'debug';
import cors from 'cors';
import sequelize from "./config/Sequelize.js";
import {Server} from "socket.io";
import usersRouter from './routes/userRoute.js';
import admin from 'firebase-admin';

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

//FIREBASE CONFIG

const serviceAccount = {
  "type": "service_account",
  "project_id": "talubeiro-official",
  "private_key_id": "aed02a2e547e35eeee25362a859d0f7d54224363",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDq7VbuVYQp/UYH\nGeiS3GvrrsFSRLHbPAEGije/pDwxyY2NOlkRqelFNUnHOwXyjcOAhYbuZ6m1O02C\nqKvZmMHIsN4p49C0hx6BFoKTHttO0xO3P2Ef3AvFiz3sG5QizJZDSk3006uCaagV\nD7HF1psUmc3AeeRJkeBc6vRcTJUNZsmElFS+Nfu4Bb4v+QY+JCHHw4zPefJcZ12a\n3BTOoHOKMSXEpR9uTofvil5KWgk9xu+HZIfdPOibLAeDi/zWtJWm/eyTN8y3PTIo\nhu6vB8N4cbqpc4nlU3JNftTKlWrUASvSdPxanEMNG7NV8hojcohNf3Z5yIdi2rgF\nJjTvjVsvAgMBAAECggEAMeWB+rH4FbEBEB4NGzAszcx6q/4CJpXKg/iUWaRI0qxD\n39SeOVW0wWnNhz6+hyNb/C6gF3+1+FOlpVQs19UNh5IlRZFo8Qbn0DQXPKcnnkjP\nnbKc7tbeOzFVUBIVdwSr/5PHFfJlMZg+Rmbkc6genRQDstdQyN1uYV3X08jCOauM\nfLu3W5N46Zf9xc+0Jx5bqMCGRx/0/uSDaAqGYfeOAEMIXO9TlwhZPizCnIz9rJTM\naPyISRzulUJF9P5LcLhvKuSzedQSZyl54dJDZxQbeaZRCAQb3U+JmrsxachVHjGN\n4HcicIHJsXBIHvpr7WaLv37pYBnxYVha1TB62wEYDQKBgQD6KBJ+55o1hE2WRlZC\nlSmPR7vYovuUoXcMTyYcJ0Rif4l3rlRjy3EZKF1MazvcNBxXGgeHrlPpKJxO+kYD\nqqDc11lbTxYjcN4I9AdNeiUwLquT6dSbpeAQ4FTFMR6Z3VyWVcTb7LImdRWI4S0F\nF90fHh6yZumRftIfRYtUtC6lFQKBgQDwajIktsRMztWx7117+4wNhx3bFAT68Xgi\nDmd1pG1mr1KGdp5oqmpxuGFL2qfzkoIy35y0KNGN5386mt6M1kPH54uC8EsJq2E/\nYTSdslxTa0l/9/XjQFEgxoXgruwlfXoNaIMpSpufWANXducI2t/URx5R5jXqaxr5\nxZXtgsaYMwKBgAWH50jJBB7UywZcjcGxHJcfZebXS6qwmzo5ccVDlP58hWSRBSqj\nr993hgCPimZG/K1sVOhKEW7hR/tzCyM/nYjkdgRPzlSARVh7VMIAxlu3XHHLxLig\nRUD6RMWLXXrXaxmj0dNu+01gX1aEbANl0KzEdLdLETT3UdwBJKB9z141AoGAH+dn\n2hlq+WplT2SdekuKbW0l2CHS+145/AL/VcxJPFw9zlxFb0xWLdszBjbxHNCveILW\nL85O6M70wlk0+WmhuxCOIgUzYAgfMqL6sYau298b9OB5//tUCM5vi76K1frNzKO2\n7C7bcgzi/KNpy3IITApYCrRLKV2nScgfulIleqMCgYBqGBkngzCWkekWgDXYA+XG\n2rykZDtFkVDdcQuT30T/t5ZTMB5Ve3suOKhKHQedenWOd1BOfT64fFjJEd9FT/Q6\nKaptrVii1sYghqr6/maoWgFDi6Cte4uMh9o0p9Zpzf9aBin6KmafUaPySO0aZYtx\nzysWVX7UEZ467c1YiGELdg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-puxq6@talubeiro-official.iam.gserviceaccount.com",
  "client_id": "110920085098183413647",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-puxq6%40talubeiro-official.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://talubeiro-official-default-rtdb.firebaseio.com"
});

// Função para verificar se todos os sockets de uma sala estão desconectados
function checkRoomDisconnect(roomId) {
  const roomSockets = io.sockets.adapter.rooms.get(roomId);
  return roomSockets === undefined || roomSockets.size === 0;
}

// Função para excluir um registro no Realtime Database
function deleteRoomRecord(recordId) {
  const db = admin.database();
  const ref = db.ref('rooms');
  const roomRef = ref.child(recordId);
  return roomRef.remove();
}

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_DICE_MESSAGE_EVENT = "newDiceMessage";

const rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

    socket.on('join', function(roomId) {
      socket.join(roomId);
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }
      rooms[roomId].push(socket.id);
      console.log("USER CONNECTED ON A: "+roomId)
    });

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      console.log("TENTANDO ENVIAR MENSAGEM ")
      data = {...data, isDiceMessage: false}
      io.emit(NEW_CHAT_MESSAGE_EVENT, data);
    })

    socket.on(NEW_DICE_MESSAGE_EVENT, (data) => {
      console.log("TENTANDO ENVIAR MENSAGEM DE DADO ")
      data = {...data, isDiceMessage: true}
      io.emit(NEW_CHAT_MESSAGE_EVENT, data);
    })

    socket.on('disconnect', () => {
      // Encontrar a sala em que o socket estava
      const roomName = Object.keys(rooms).find(room => rooms[room].includes(socket.id));
      if (roomName) {
        // Remover o socket da sala
        rooms[roomName] = rooms[roomName].filter(id => id !== socket.id);
  
        // Se não houver mais sockets na sala, deletar a sala
        if (rooms[roomName].length === 0) {
          delete rooms[roomName];
          console.log(`Sala ${roomName} deletada.`);
        } else {
          // Enviar uma atualização de contagem de usuários para a sala
          io.to(roomName).emit('userCount', rooms[roomName].length);
        }
      }
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