const { stat } = require('fs/promises');
const { readdir } = require('fs/promises');
const path = require('path');

const FilePath = path.join(__dirname, '/secret-folder'); 

(async () => {
  try {
    const files = await readdir(FilePath);
    for (const file of files) {
      const fullPath = path.join(FilePath, file);
      const fileStat = await stat(fullPath);
      if (file !== '.DS_Store' && fileStat.isFile()) {
        const ext = path.extname(file);
        console.log(` ${path.basename(file, ext)} - ${ext.slice(1)} - ${(fileStat.size / 1024).toFixed(2)}kb `); 
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
