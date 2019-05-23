/*
  WiFi UDP Send Byte on Button Press
  Based on UDP Send and Receive String
  created 3 February 2019
  by Michael Shiloh
  Extended version that deals with three IR distance measuring sensors 
  Updated 16 May 2019
  by Junior Garcia
*/

//#include <SPI.h>
//#include <WiFi101.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
#include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

unsigned int localPort = 5000;      // local port to listen on

char packetBuffer[255]; //buffer to hold incoming packet

WiFiUDP Udp;

const int sensor1=A1;
const int sensor2=A2;
const int sensor3=A3;
int val1=0;
int val2=0;
int val3=0;//Initialize variables that will retain the readings of every sensor.
bool sent=false;
const int distance=300; //Desired distance that will activate the device. Obtained from iteratitive trials. 

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
//  while (!Serial) {
//    ; // wait for serial port to connect. Needed for native USB port only
//  }
//Remove Serial condition as you want the arduino to work independent of the serial monitor


  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempt to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  Serial.println("Connected to wifi");
  printWiFiStatus();

  Serial.print("Initializing WiFiUDP library and listening on port ");
  Serial.println(localPort);
  Udp.begin(localPort);
  
}

void loop() {
  int val1 = analogRead(sensor1);       // reads the value of the IR sensor 1  
  int val2 = analogRead(sensor2);       // reads the value of the IR sensor 2
  int val3 = analogRead(sensor3);       // reads the value of the IR sensor 3
  // IP address of the receiving device
  IPAddress receivingDeviceAddress(10,225,161,124);
  unsigned int receivingDevicePort = 7000;//port the server will be listening to

//  
  if (val1>=distance || val2>=distance || val3>=distance) {//If any of the 3 sensors pick up an object on any range greater than or equal to 300
    //Serial.println("Person is near!!!!"); //print statement only needed for testing
    Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);
    boolean person=HIGH;//Send a HIGH
    Udp.write(person);
    Udp.endPacket();
  }
  else 
  {
    Serial.println("No one is near the house");//Otherwise, send a low
    Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);
    boolean person=LOW;
    Udp.write(person);
    Udp.endPacket();
  }

}
void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("My IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
