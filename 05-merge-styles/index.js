const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const styleDirPath = path.join(__dirname, 'styles');
const bundleStylePath = path.join(__dirname, 'project-dist', 'bundle.css'); 
const pathProject = path.join(__dirname, 'project-dist');


(async () => {
  try {
    await fs.promises.mkdir(pathProject, { recursive: true });
  } catch (err) {
    console.error(err);
  }
})();

const steamCss = fs.createWriteStream(bundleStylePath, { flags: 'w' });

(async () => {
  try {
    const styleDir = await readdir(styleDirPath);
    for (const styleFile of styleDir) {
      const styleFilePath = path.join(styleDirPath, styleFile);

      if (path.extname(styleFile).toLowerCase() === '.css') {
        const fileContent = await fs.promises.readFile(styleFilePath, 'utf8');

        steamCss.write(fileContent + '\n');
      }
    }

    steamCss.end();

  } catch (err) {
    console.error(err);
  }
})();
