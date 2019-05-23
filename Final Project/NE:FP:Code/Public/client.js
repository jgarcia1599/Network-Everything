//Client File
var socket = io();
var tab = 0;
var Window;


socket.on('near', (data) => {
    console.log("Person is near you aaah!");
	display();
});
socket.on('far', (data) => {
	console.log("Person is far away take it easy");
	display2();
});
function display () {
    tab=0;
    var image = document.getElementById("image");
    image.src="danger.png";
    var music = document.getElementById("music");
    music.play();
    console.log("play music");//Play get away from me sound 
    if(tab == 0){

        Window = window.open("http://10.225.161.122:8081/", "myWindow", "width=200,height=100");//  If the sensor sends the near message, open a tab with the livestream of the webcam running on the rpi server
        tab = 1;
        }
}
function display2 () {
    var image = document.getElementById("image");
    image.src="safe.jpeg";
}
