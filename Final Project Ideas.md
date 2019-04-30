Final Project Idea: Security Camera Alert System

https://pimylifeup.com/raspberry-pi-security-camera/
https://pimylifeup.com/raspberry-pi-twitter-bot/
    
Phyical Components:
- A raspberry pi
- Some form  of container that keeps everything together
- A camera
- A speaker
- A sensor that detects when someone gets really close (passive infrared sensor, ultrasonic distance meausring sensor, infrared distance measuring sensor
   
Software Components:
- Web setup with nodejs: A simple website that gives you the livestream of the camera and takes a picture of the intruder. Whenever an intruder is within range, the user can click on a button on the website to scare the intruder off through a get out message delivered by the physical interface via the speaker.
- Mail notifier:Notify the person through email whenever there is an intruder. The email will include a picture of the intruder.
- Login to the Web system to keep a jsonfile of all the users who can get a notification
    
Possible Software Extensions:
- Database of all intruders: The website can have a page that contains a picture of all the intruders and show them for public awareness
     
- TwitterBot: There can be a public twitter account that tweets all followers whenever there is an intruder. This can be used instead or in conjuction with the mail notifier. 
   
- Use computor vision to distinguish happy intruder and an angry intruder:
https://cloud.google.com/vision/


