# arduinotemp.js
Example of an Arduino Exploria board recording the current temperature every second in javascript.
This requires a Telegraf server to be running. A telegraf.conf example is included in the github.

To run start telegraf with the example configuration file (or telegraf with the statsd plugin) and load the package dependencies using ```npm install``` then run  ```node main.js``` 
Note this is only tested on node 4.2.1 and supporting libraries may not build if you use a different version of node.

