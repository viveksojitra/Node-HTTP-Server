const http = require('http');
const fs = require('fs');
const PORT = 3001;
let reqCount = 0;
const server = http.createServer((req, res) => {

    fs.readFile("index.html", "utf-8", (error, data) => {
        const file = data;
        if (!error) {
            console.log(`File read successfully: ${req.url}`);
            console.log('Server is ok');
            if (req.url == '/') {
                const logHome = `Line ${reqCount++} Request Fetched: ${req.url}\n`;

                fs.appendFile('log.txt', logHome, (error, data) => {
                    if (!error) {
                        res.statusCode = 200;
                        res.setHeader("content-type", 'text/html');
                        res.end(file);
                        console.log('Nevigate to Home');
                    } else {
                        console.log('Error Nevigating to Home');
                    }
                })
            } else if (req.url == '/about') {
                const logAbout = `Line ${reqCount++} Request Fetched: ${req.url}\n`;

                fs.appendFile('log.txt', logAbout, (error, data) => {
                    if (!error) {
                        res.statusCode = 200;
                        res.setHeader("content-type", 'text/html');
                        res.end("<h3>About</h3>");
                        console.log('nevigate to About');
                    } else {
                        console.log('Error Nevigating to About');
                    }
                })
            } else {
                const logNotFound = `Line ${reqCount++} Request Fetched: ${req.url}\n`;

                fs.appendFile('log.txt', logNotFound, (error, data) => {
                    if (!error) {
                        res.statusCode = 400;
                        res.setHeader("content-type", 'text/plain');
                        res.end("Bad Request: Page Not Found");
                        console.log('Nevigate to Bad Request');
                    } else {
                        console.log('Error Nevigating to Bad Request');
                    }
                })
            }
        } else {
            console.log('Error reading file: ${req.url}');
        }
    })
})

server.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on ${PORT}`);
    } else {
        console.log(error);
    }
})