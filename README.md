# Installation for development
`npm install dev`

# Project Structure
```
src
  |-- components
  |-- jwt
  |-- config.js
.env
```

# API Documentation 

#### Websocket:
 1. Connect to server: <br/>
   `var connection = new WebSocket('ws://domain.com/notification');`
 2. Message response:
  ```
   {
    "status": 200,
    "lottery": true,
    "winning_number": "10 12 14 59 03 49"
   }
  ```
 #### Countdown Time: Countdown time per day
   API endpoint: `http://domain.com/api/v1/lottery_times`
   1. GET: get countdown time <br/>
     ```
      {
          "lottery_time": "16:00:00"
      }
     ```
   2. POST: create countdown time <br/>
    @Params
      ```
      {
        "time": "16:00:00"   //Format HH:mm:ss
      }
      ```
   3. PUT: update countdown time
     @Params
        ```
        {
          "time": "16:00:00"   //Format HH:mm:ss
        }
        ```
  
`In comming...`
