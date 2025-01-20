const fs = require('fs');
const path = require('path');
const { stdin } = process;

const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(filePath, { flags: 'a' });
const readStream = fs.createReadStream(filePath);

console.log('Welcome');
console.log('Add text or write "exit"');

stream.write('', (err) => {
  if (!err) {
    stdin.on('data', (data) => {
      const input = data.toString().trim();

      if (input === 'exit') {
        stream.end(() => {
          readStream.on('data', function (chunk) {
            console.log('Thank you, Bye!');
            process.exit(0);
          });
        });
      } else {
        stream.write(input + '\n', (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
});

process.on('SIGINT', () => {
  stream.end(() => {
    console.log('Thank you, Bye!');
    process.exit(0);
  });
});