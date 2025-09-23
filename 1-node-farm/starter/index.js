const fs =  require('fs');
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/raplaceTemplate")

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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    //Overview page 
    if(pathname === "/" || pathname === "/overview"){
        res.writeHead(200, {
        "content-type": 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    
    //Product page
    }else if(pathname === "/product"){
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    
    //API
    }else if(pathname === "/api"){
        console.log(dataObj)
        res.writeHead(200, {
        "content-type": 'application/json'
        });
        res.end(data);
    
    //Not found
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

