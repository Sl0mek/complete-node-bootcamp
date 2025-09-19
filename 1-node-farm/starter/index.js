const fs =  require('fs');

const hello = "Hello world";
console.log(hello);

const textIn = fs.readFileSync('./txt/input.txt', 'utf8');
console.log(textIn);

const textOut = `This is what we know about avocado:\n${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log("Text written!!!");