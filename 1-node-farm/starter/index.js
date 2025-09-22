const fs =  require('fs');
const http = require("http");
const url = require("url");

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


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === "/" || pathName === "/overview"){
        res.end("This is OVERVIEW");
    }else if(pathName === "/product"){
        res.end("This is PRODUCT");
    }else if(pathName === "/api"){
        console.log(dataObj)
        res.writeHead(200, {
        "content-type": 'application/json'
        });
        res.end(data);
    }else{
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end("<h1>Page not found!!!</h1>");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Server listening on port 8000");
});

