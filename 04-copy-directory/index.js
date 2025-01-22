const fs = require('fs/promises');
const path = require('path');
const { readdir, stat } = require('fs/promises');
const { error } = require('console');

const filesPath = path.join(__dirname, '/files');
const copyPath = path.join(filesPath, '/files-copy');

(async () => {
  try {
    await fs.mkdir(copyPath, { recursive: true });
    const existingFiles = await fs.readdir(copyPath);
    for (const file of existingFiles) {
      await fs.rm(path.join(copyPath, file), { force: true });
    }
    const files = await readdir(filesPath);
    for (const file of files) {
      const pathToFile = path.join(filesPath, file);
      const fileCopyPath = path.join(copyPath, file);
      const stats = await fs.stat(pathToFile);
      if (stats.isFile()) {
        await fs.copyFile(pathToFile, fileCopyPath);
      }
    };
  } catch (err) {
    console.error(err);
  }
})();

