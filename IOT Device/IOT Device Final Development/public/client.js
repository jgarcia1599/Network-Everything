
/* 
This is the websocket library which will allow us to send messages
back to the web server 
*/
var socket = io();


function alarmON() {
  console.log ("sending a message to the web server to turn on the Alarm");
  // this is how we send a message back to the web server
  socket.emit('alarmON'); 
}

function alarmOFF() {
  console.log ("sending a message to the web server to turn off the Alarm");
  socket.emit('alarmOFF');
}
function Displaytime(){
	now= new Date();
	hours=now.getHours();
	minutes=now.getMinutes();
	seconds=now.getSeconds();
	time=hours+":"+minutes+":"+seconds;
	document.getElementById('time').innerHTML=time;
	refresh();
}
function refresh(){
var refresh=1000; // Refresh rate in milli seconds
mytime=setTimeout('Displaytime()',refresh)
}

function setAlarm(){
	
}
