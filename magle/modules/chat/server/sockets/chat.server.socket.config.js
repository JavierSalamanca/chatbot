'use strict';
const recastai = require('recastai');

const client = new recastai.request('40f00ecc048548a36a2728142b77e507', 'es');

var conversation = "";

// Create the chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected

    var objects = ["herencia", "clase", "subclase", "super", "metodo", "atributo", "sobre escritura", "clase objeto"];
    var intentions = ["que", "como", "es", "ejemplo", "necestio", "cuando", "implementacion", "no comprendo"];


  io.emit('chatMessage', {
    type: 'status',
    text: 'Is now connected',
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
                if (res.action) {
                    console.log('Action: ', res.action.slug)
                }
                const reply = res.reply();
                var action = res.action;
                var botReply = {
                    created: Date.now(),
                    text: "",
                    type: "message",
                    profileImageURL: null,
                    username: "Tutor bot"
                };
                io.emit('chatMessage', botReply);

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
