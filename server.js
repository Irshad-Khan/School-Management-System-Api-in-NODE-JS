require('dotenv').config();
const http = require('http');

require("./config/dbConnect")

const app = require('./app/app');
// If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;

//Server Created
const serevr = http.createServer(app);
const URL = 'http://127.0.0.1:' + PORT;

serevr.listen(PORT, console.log(`Server running on port ${PORT} and URL: ${URL}`));