# Lecture 1: Structuring a Project
In this Lecture we create all folder and two files to that is require in begning.
- app
- config
- controller
- middlewares
- model
- routes
- utils

here we add two files one 
```bash
app.js
```
in app folder and 
```bash
server.js 
```
in root folder

# Lecture 2: Creating Server
First we run command below
```bash
npm init --yes
```

for creating file 
```bash
package.json
```
Now we install packages using below commond
```bash
npm i express mongoose
```
we also install dev dependency using command
```bash
npm i nodemon morgan -D
```
Here nodemon is used to run our server and restart every time our page if made any change in a file.
now we add script in package.json scripts section file for running server.
```bash
"server": "nodemon server.js"
```
Now we add content in server.js file and run the server.
```bash
const express = require('express');
const morgon = require('morgan');

const app = express();

# If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;


#Middlewares
#Morgon is used to display end point in console
app.use(morgon('dev'))

#Server Created
app.listen(PORT, console.log(`Server running on port ${PORT}`));
```
run server using below command
```bash
npm run erver
```

# Lecture 3: Advance Server
In the lecture we use expressjs and node core http module for creating server.
now we change server.js and add code in app.js code is below. All these changes are done because we know server.js duty is only create server and app.js is use to intract with app using middleware or other stuff. So we seprate duty of app and server.js files

```bash
# app.js
const express = require('express');
const morgon = require('morgan');

const app = express();

module.exports = app;
```
```bash
# server.js
const http = require('http');
const app = require('./app/app');

# If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;

#Server Created
const serevr = http.createServer(app);
serevr.listen(PORT, console.log(`Server running on port ${PORT}`));
```