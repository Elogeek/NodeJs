const http = require('http');
const express = require('express');

const expressApp = express();
const server = http.createServer(expressApp);

expressApp.use((req,res) => {
    res.send("hello");
})

expressApp('port', process.env.PORT || 3000);
server.listen(process.env.PORT || 3000, () => console.log("Server started"));