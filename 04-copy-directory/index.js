const fs = require('fs');
const path = require('path');
const { readdir, stat } = require('fs/promises');
const { error } = require('console');

const filesPath = path.join(__dirname, '/files');
const copyPath = path.join(filesPath, '/files-copy');

(async () => {
    try {
        fs.mkdir(copyPath, { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
        });
    } catch (error) {
        console.error(error);
    }
})();

(async () => {
  const files = await readdir(filesPath);
  for (const file of files) {
    const pathToFile = path.join(filesPath, file);
    const fileCopyPath = path.join(copyPath, file);
    fs.stat(pathToFile, (error, stats) => {
      if (stats.isFile()) {
        fs.copyFile(pathToFile, fileCopyPath, (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        });
      }
    });
  }
})();
