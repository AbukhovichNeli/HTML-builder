const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const read = fs.createReadStream(filePath);

read.on('data', function (chunk) {
  console.log(chunk.toString());
});
