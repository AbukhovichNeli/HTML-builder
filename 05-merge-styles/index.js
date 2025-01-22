const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const styleDirPath = path.join(__dirname, 'styles');
let stylesArr = [];
let fullCss = '';
const projectPath = path.join(__dirname, '/project-dist');

(async () => {
  const stylesDir = await readdir(styleDirPath);
  for (const styleFile of stylesDir) {
    stylesArr = [];
    const pathCSS = path.join(styleDirPath, styleFile);
    fs.stat(pathCSS, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if (path.extname(styleFile).toString() === '.css' && stats.isFile()) {
        const steamRead = fs.createReadStream(pathCSS);
        const steamStyles = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'), { encoding: "utf-8", flags: "a" });
        steamRead.on('data', function (chunk) {
          stylesArr.push(chunk.toString());
        });
        steamRead.on('end', () => {
          fullCss = stylesArr.join('');
          steamStyles.write(fullCss);
        });
      }
    });
  }
})();
