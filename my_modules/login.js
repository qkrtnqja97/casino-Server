const { raw } = require('body-parser');
const fs = require('fs');  // import fs library
const userData = './data/playerData.json'; // path to the users.json
var currentUserName;

async function getCurrentUser() {
    const fileData = fs.readFileSync(userData);
    const users =JSON.parse(fileData);
    currentUser = users[currentUserName]
    return { currentUserName, currentUser};
}

async function updateUserTicket(username,ticket) {
    const fileData = fs.readFileSync(userData);
    const users =JSON.parse(fileData);
    users[username].ticket = parseInt(ticket);
    fs.writeFileSync(userData, JSON.stringify(users, null, 2));
}

async function authenticateUser(request) {
    // get the value for the 'username' and 'password'
    // keys from the request query string
    const username = request.username;
    const password = request.password;

    return new Promise((resolve, reject) => {
        fs.readFile(userData, 'utf-8', (err, fileData) => {
            if (err) {
                reject(err);
                return;
            }

            const users = JSON.parse(fileData);
            if (users[username] && users[username].password === password) {
                currentUserName = username;
                resolve(true);
            } else {
                currentUserName = '';
                resolve(false);
            }
        });
    });
}

async function addUser(filePath, username, password) {
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync(filePath);
        let users;

        try {
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (!users[username]) {
            users[username] = {
                password: password,
                balance: 10,
                ticket: 3,
            };

            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            console.log(`User ${username} was added to users.json`);
        } else {
            console.log(`Users ${username} already exists!`);
        }

        resolve();

    });
}

module.exports = {
    authenticateUser,
    getCurrentUser,
    updateUserTicket,
    addUser
};