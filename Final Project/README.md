Final Project for Network Everything Spring 2019

Project 3 Final Documentation

Overview

For my Final Project, I wanted to create a Home Alert Security System (HASS) that alerted users whenever someone would approach their home. The HASS has a camera, a speaker and three IR distance measuring sensors. Whenever someone approaches HASS, an alert message is emitted from the speaker that scares the users off by saying &quot;Get away from me&quot;. I wanted the HASS to portray something resembling a personality by making the &quot;Get away from me&quot; alert message a little amusing and not that scary. In addition, a tab opens up whenever the user appr

Pictures

Hardware and Software Schematics

Parts

Software

- Arduino code that reads the analog input from the three sensors and sends a message to the server using udp
- Server code that interfaces between the arduino (using the udp library) and the web browser (using websockets)
- Client.js code that displays the appropriate image and sound depending on the message received (&quot;near&quot; or &quot;far&quot;) by the server. Also, if the near message is received by the server, a tab that has the livestream of the camera will be opened.
- Index.html that displays the image on the the web browser depending on the instructions indicated by the client.js code.

Hardware

- Arduino MKR1010
  - Three IR distance measuring sensors
- Raspberry Pi
  - Webcam
  - Speaker
- A USB battery pack that makes the HASS portable
- A box made from  acrylic that keeps everything together designed with Adobe Illustrator

Process and Implementation

Originally, I wanted the HASS to run entirely on a Raspberry Pi. After I soldered all the components to a prototyping board, the code wasn&#39;t working at all the night before the showcase which makes me thing that maybe one of the components was not soldered properly. As such, I did a last minute fix to this issue by quickly emulating the same hardware schematics on an Arduino MKR101 which is a piece of hardware we were more familiar with throughout the semester.

Another issue that came in the last instances of the project&#39;s implementation was that I didn&#39;t quite remembered where to put the condition that detects the message from the arduino in the server.js code. As such, I went back to one of the examples we did in class &quot;UDPandHTTPServer&quot; in order to implement the same logical flow on my server code. The sensors were basically detecting a boolean condition, whether someone was within range or not, which resembles the boolean logic of clicking a button. Therefore, using this class example proved to be imperative for my project&#39;s execution.

Something else that I wanted to implement in my code was the nodemailer in Node.js to send an email alert whenever someone was close to the HASS. However, I wasn&#39;t able to fix an issue that was constantly appearing whenever the nodemailer sendmail() function was called. A lot of login attempts were happening. I think this is due to the fact that every time a 1 was send from the arduino to the server, an attempt needed to be made. A 1 was being sent basically every second (if not every millisecond) the user was standing in front of the sensors, which created an overflow of login attempts to my email account.

I think this project has a lot of potential. Such potential wasn&#39;t reached however because I had little experience coding in Node.js and using a raspberry pi. However,this project made me excited in learning more about these technologies, and extending the project&#39;s technical complexity by using computer vision to detect a happy intruder from a sad intruder or even training the HASS so that it know whenever whatever is standing in front of it is actually a person or another object.
