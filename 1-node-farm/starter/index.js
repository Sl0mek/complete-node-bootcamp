const fs =  require('fs');
const http = require("http");


// const hello = "Hello world";
// console.log(hello);

/////////////////////////////////////////////////////

// const textIn = fs.readFileSync('./txt/input.txt', 'utf8');
// console.log(textIn);

// const textOut = `This is what we know about avocado:\n${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("Text written!!!");

//non blocking async
// fs.readFile("./txt/start.txt", 'utf-8', (err, data) => {
//     console.log(data);
// })
// console.log('Will read file');

/////////////////////////////////////////////////////
//SERVER

const server = http.createServer((req, res) => {
    console.log(req);
    res.end("Hello from server");
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Server listening on port 8000");
});

