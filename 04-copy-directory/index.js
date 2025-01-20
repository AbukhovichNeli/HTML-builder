const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const filesPath = path.join(__dirname, '/files');
const copyPath = path.join(__dirname, '/files-copy');

fs.stat('/Users/nelli/HTML-builder/04-copy-directory/files-copy', function (err) {
    if (!err) {
    } else if (err.code === 'ENOENT') {
        fs.mkdir('files-copy', (err) => {
            if (err) throw err;
        });
    }
});

(async () => {
    try {
        const files = await readdir(filesPath);
        for (const file of files) {
            const filePath = path.join(filesPath, file);
            const fileCopyPath = path.join(copyPath, file);
            fs.copyFile(filePath, fileCopyPath, (err) => {
                if (err) {
                    console.log("Error Found:", err);
                }
            })
        }
        await checkFilesInside();
    } catch (err) {
        console.error(err);
    }
})();

async function checkFilesInside() {
    try {
        const files = await readdir(copyPath);
        const originalFiles = await readdir(filesPath);
        for (const file of files) {
            if (!originalFiles.includes(file)) {
                const filePathInDest = path.join(copyPath, file);
                await fs.promises.rm(filePathInDest);
            }
        }
    } catch (err) {
        console.error(err);
    }
}