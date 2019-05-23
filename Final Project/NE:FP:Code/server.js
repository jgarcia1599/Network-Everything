/*
  UDP And HTTP Server
  Context: node.js
  Serve a web page to a browser with a control panel
  Read control panel and send results to Arduino via UDP
  Use webSockets between http client and server
  created 7 March 2019
  by Michael Shiloh
  Updated to deal with 3 IR sensors and a webcam runing on a Raspberry Pi server
  updated 16 May 2019
  by Junior Garcia
*/

/* UDP server talks to Arduino */
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4')
var ARDUINO_UDP_PORT = 7000;
var ARDUINO_LISTENING_AT= 5000;
var ARDUINO_ADDRESS = '10.225.161.125';

/* HTTP server talks to browser */
const http = require('http')
const express = require('express'); // web server application
const app = express();        // instantiate express server
const httpServer = http.Server(app);  // connects http library to server
const HTTP_SERVER_PORT = 8001; 

// Express creates the simple web page
// The argument says where to find pages and scripts
app.use(express.static('public'));  //folder that has the other scripts 

// websockets so that webpage can talk back to server

//Use to send email 
var nodemailer = require('nodemailer');
/* UDP server callback functions */
const webSocket = require('socket.io')(httpServer);  
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'junior.f.garcia99@gmail.com',
        pass: 'password'
    }
});
const mailOptions = {
  from: 'junior.f.garcias99@gmail.com', // sender address
  to: 'jfg388@nyu.edu', // list of receivers
  subject: 'Beware!', // Subject line
  html: 'There is someone threatening the safety of your house!! Look at their malicious face using this link: https//:192.168.1.33:8080'// plain text body
};
function sendEmail() {
  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err);
     else
       console.log(info);
  });//Mail notifier attempted but couldnt work as a lot of attempts were being done to login tot the email account. 
}

function UDPServerIsListening() {
  console.log('UDP Server is listening');
}

function UDPServerReceivedMessage(message, sender) {

  if (message.readUInt8(0)==0){//If the arduino sends HIGH
    console.log("Person is faaar");
    webSocket.emit("far");//Send the far message tho the client
  }
  if (message.readUInt8(0)==1){
    console.log("Person is closee")
    webSocket.emit("near");//send the near message to the client if we receive a 0 from the arduino
  }
  // print the message
  console.log(
    'Received message from: ' +
    sender.address + 
    ':' + 
    sender.port);
  console.log(
    'Message length: ' +
    message.length + 
    ' Message contents: ' +
    message);
}

/* Register the UDP callback functions */
udpServer.bind(ARDUINO_UDP_PORT );
udpServer.on('listening', UDPServerIsListening);
udpServer.on('message', UDPServerReceivedMessage);

// if(mailcondition==true)
// {
//   udpServer.on('message', sendEmail);
// }


/* HTTP callback functions */

httpServer.listen(HTTP_SERVER_PORT, () => {
  console.log('httpServer: Listening at', httpServer.address());
});

httpServer.on('connection', (socket) => {
  console.log("httpServer: An HTTP client has connected")
});


/* and here is the websocket event handler */

webSocket.on('connect', function (socket) {
    console.log('Web server socket: Client connected');

    // if you get the near message
    socket.on('near', function () {
      console.log('Person is near your house!!');
    });

    //

    // if you get the 'disconnect' message, say the user disconnected
    socket.on('disconnect', function () {
      console.log('Web server socket: user disconnected');
  });
});


