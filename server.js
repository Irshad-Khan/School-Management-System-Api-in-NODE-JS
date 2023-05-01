const http = require('http');
const app = require('./app/app');

// If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;

//Server Created
const serevr = http.createServer(app);
serevr.listen(PORT, console.log(`Server running on port ${PORT}`));