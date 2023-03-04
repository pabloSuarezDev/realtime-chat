const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3900;
const { ip } = require('./global/global')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      `http://${ip}:3000`
    ],
    credentials: true
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

const usuario = require('./routes/usuario');
const conversacion = require('./routes/conversacion');
const mensaje = require('./routes/mensaje');

app.use('/api/v1/usuario', usuario);
app.use('/api/v1/conversacion', conversacion);
app.use('/api/v1/mensaje', mensaje);

io.on('connection', (socket) => {
  console.log('Conectado con socket.io');
  socket.on('mensajes', async(mensaje) => {

    const request = await fetch(`http://${ip}:3900/api/v1/mensaje/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mensaje)
    });

    const data = await request.json();

    if(data.status === "success") {
      const change = await fetch(`http://${ip}:3900/api/v1/conversacion/nuevo-mensaje`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mensaje)
      });

      const changeData = await change.json();

      if(changeData.status === "success") {
        socket.emit('mensajes', (mensaje));
        socket.broadcast.emit('mensajes', (mensaje));
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});