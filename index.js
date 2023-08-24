const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 8000;
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8' });

// Import our custom modules here:
const { getRandomLeg, getRandomStart, rollTheDice, calculateWinner, getSpinRoulette } = require('./my_modules/utility.js');

        const { authenticateUser,
                getCurrentUser,
                updateUserTicket,
                addUser } = require('./my_modules/login.js');

       

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('/utility', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Headers', 'task');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.sendStatus(200);
});

app.get('/getUserData', textBodyParser, async function (req,res) {
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    if (reqTask === 'getUserData') {
        try {
            const {currentUserName, currentUser} = await getCurrentUser();
            console.log(currentUser);
            res.setHeader('Access-Control-Allow-Origin', '*');
            // allow client to access the custom 'request-result' header:
            res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
            // set the custom header 'request-result'
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
            res.status(200).json({currentUserName,currentUser});
        } catch (error) {
            console.log('getCurrentUser() error :' ,error);
            es.status(500).send("Server Error");
        }
        
    }
})

app.get('/getUserRoulette', textBodyParser, async function (req,res) {
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);


    if (reqTask === 'spin') {
        getSpin = getSpinRoulette();
        res.status(200).json({ getSpin });
    }
})


app.get('/ghostleg', textBodyParser, async function (req, res){
    console.log('req.headers: ' , req.headers);

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
    console.log("ghostLeg start");
    //Task Check
    if (reqTask === 'ghostleg') {
        try{
            console.log('try');
            heightNode = getRandomLeg();
            startPoint = getRandomStart();
            console.log('heightNode: ',heightNode);
            console.log('startPoint: ',startPoint);
            res.status(200).json({heightNode,startPoint});
            console.log('successful');
        } catch (error) {
            console.log('authenticateUser() error:', error);
            res.status(500).send("Server Error");
        }
    }
})

app.get('/login', textBodyParser, async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    // TASK Check
    if (reqTask === 'login') {
        try {
            const loginResult = await authenticateUser(req);
            console.log('req.query: ',req.query);
            console.log('authenticateUser() result: ', loginResult);

            if (loginResult == true) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                // allow client to access the custom 'request-result' header:
                res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
                // set the custom header 'request-result'
                res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
                res.status(200).send("Login Successful");
            } else {
                res.status(403).send("Login Failed"); // 403 Forbidden Access
            }
        } catch (error) {
            console.log('authenticateUser() error:', error);
            res.status(500).send("Server Error");
        }
    }

    res.end();

    /* 
    // remade and moved to login.js
    const { username, password } = req.query;
    fs.readFile('/data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Server error");
            return;
        }

        const users = JSON.parse(data);
        if (users[username] && users[username].password === password) {
            res.send("Login successful");
        } else {
            res.send("Login failed");
        }
    });
    */
});

app.post('/plusTicket', async function(req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request
    const reqData = req.body; // get the request data

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
    console.log("req.body: ", req.body);
    console.log('req.body.username: ',req.body.username);
    console.log('req.body.ticket: ',req.body.ticket);

    if (reqTask === 'plusTicket') {
      try{
          const username = reqData.username;
          const ticket = reqData.ticket;
          await updateUserTicket(username,ticket);
          console.log("plusTicket() finished succesfully");
          res.status(200).send("plusTicket() finished succesfully");
      } catch (error) {
          console.log('updateUserTicket() error: ', error);
          res.status(500).send("Server Error");
      }
    }
})

app.post('/login', async function (req, res) {
    // print the HTTP Request Headers
   console.log('req.headers: ', req.headers); 

   const reqOrigin = req.headers['origin']; // get the origin of the request
   const reqTask = req.headers['task']; // get the task of the request
   const reqData = req.body; // get the request data

   console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
   console.log("req.body: ", req.body);
   console.log("req.body.username: ", req.body.username);
   console.log("req.body.password: ", req.body.password);

   // TASK Check
   if (reqTask === 'signup') {
       try {
           let filePath = './data/users.json';
           const username = reqData.username;
           const password = reqData.password;
           await addUser(filePath,username,password);

       } catch (error){
           console.log('authenticateUser() error:', error);
           res.status(500).send("Server Error");
       }
   }
});

app.get('/duygu', async function (req, res) {
    console.log('req.headers: ', req.headers);
  
    const reqOrigin = req.headers['origin'];
    const reqTask = req.headers['task'];
  
    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
  
    if (reqTask === 'duygu') { 
      try {
        const result = rollTheDice();
        const winner = calculateWinner(result.randomNumber1, result.randomNumber2);
        res.status(200).json({ roll: result, result: winner });
      } catch (error) {
        console.log('Error:', error);
        console.log('Request headers:', req.headers);
        res.status(500).json({ error: 'An error occurred' });
      }
    } else {
      res.status(400).json({ error: 'Invalid task' }); // Return a 400 Bad Request status
    }
  });
  


app.listen(port, (err) => {
  if (err) {
    console.log("There was a problem: ", err);
    return;
  }
  console.log(`Server listening on http://localhost:${port}`);
})