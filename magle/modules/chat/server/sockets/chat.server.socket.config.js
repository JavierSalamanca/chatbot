'use strict';
const recastai = require('recastai');

const client = new recastai.request('40f00ecc048548a36a2728142b77e507', 'es');

var conversation = "";

// Create the chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
    io.emit('chatMessage', {
        type: 'status',
        text: "Hola, yo soy Tutor bot y te puedo guiar en el aprendizaje de programacion orientada a objetos\n\n",
        created: Date.now(),
        profileImageURL: socket.request.user.profileImageURL,
        username: socket.request.user.username
    });
    io.emit('chatMessage', {
        type: 'status',
        text: "Para saber cual es mi area de conocimiento pregunta por mis 'conocimientos'",
        created: Date.now(),
        profileImageURL: socket.request.user.profileImageURL,
        username: socket.request.user.username
    });
  io.emit('chatMessage', {
    type: 'status',
      text: "Mi area de conocimiento principal es: Herencia.\n" +
      "mas especificamente seria:\n" +
      "-Clases\n" +
      "-Superclase\n" +
      "-Subclase\n" +
      "-Atributos\n" +
      "-Metodos\n" +
      "-Visibilidad \n" +
      "-Sobrecarga\n" +
      "-Sobreescritura\n",
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.username
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;
    io.emit('chatMessage', message);
    if(conversation!=="") {
        client.converseText(message.text, conversation)
            .then(function (res) {
                if(res.action !== "conocimiento") {
                    if (res.action) {
                        console.log('Action: ', res.action.slug)
                    }
                    const reply = res.reply();
                    var action = res.action;
                    var botReply = {
                        created: Date.now(),
                        text: reply,
                        type: "message",
                        profileImageURL: null,
                        username: "Tutor bot"
                    };
                    io.emit('chatMessage', botReply);
                }else{
                    var botReply = {
                        created: Date.now(),
                        text: "Mi area de conocimiento principal es: Herencia\n" +
                        "mas especificamente seria:\n" +
                        "-Clases\n" +
                        "-Superclase\n" +
                        "-Subclase\n" +
                        "-Atributos\n" +
                        "-Metodos\n" +
                        "-Visibilidad \n" +
                        "-Sobrecarga\n" +
                        "-Sobreescritura\n",
                        type: "message",
                        profileImageURL: null,
                        username: "Tutor bot"
                    };
                    io.emit('chatMessage', botReply);
                }
            });
    }else{
        client.converseText(message.text)
            .then(function (res) {
                    conversation = res.conversationToken;
                if (res.action) {
                    console.log('Action: ', res.action.slug)
                }
                const reply = res.reply();
                var action = res.action;
                var botReply = {
                    created: Date.now(),
                    text: reply,
                    type: "message",
                    profileImageURL: null,
                    username: "Tutor bot"
                };
                io.emit('chatMessage', botReply);

            });
    }

    // Emit the 'chatMessage' event

  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
};
