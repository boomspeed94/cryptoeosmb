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
# Start project
1. Install mogodb <br/>
2. Update .env file
3. Run: ` npm start`

# API Documentation 
### Require Headers:
  ```
    Content-Type    application/json
    X-Requested-With    XMLHttpRequest
  ```
#### Websocket:
 1. Client connect to server: <br/>
   `var connection = new WebSocket('ws://domain.com/notification');`
 2. Message response:
  ```
   {
    "status":200,
    "lottery":true,
    "winning_number":{
      "type":"JackPot",
      "white_ball_1":4,
      "white_ball_2":12,
      "white_ball_3":24,
      "white_ball_4":35,
      "white_ball_5":53,
      "red_ball":16,
      "date_created":"Sat, 16 Feb 2019 17:25:05 GMT"
      }
  }
  ```
  
  3. Endpoint testing:
    GET: http://localhost:3000/api/v1/lottery/testing <br/>
 #### Countdown Time: Countdown time per day
   API endpoint: `http://domain.com/api/v1/lottery_times`
   1. GET: get countdown time <br/>
     Response: <br/>
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
