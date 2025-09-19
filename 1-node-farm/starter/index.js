const fs =  require('fs');

const hello = "Hello world";
console.log(hello);

const textIn = fs.readFileSync('./txt/input.txt', 'utf8');
console.log(textIn);