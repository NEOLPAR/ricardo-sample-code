const path = require('path');
const { readdir } = require('fs').promises;

async function* streamAsyncIterator(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* streamAsyncIterator(res);
        } else {
            yield res;
        }
    }
}

async function getFilePaths() {
    let tmpDirectory = './files/tmp/unzipped';
    let filePaths = [];

    for await (const f of streamAsyncIterator(tmpDirectory)) {
        filePaths.push(f)
    }

    return filePaths;
}

module.exports = () => new Promise((resolve, reject) => {
    getFilePaths()
        .catch((err) => reject({status: "error", data: err}))
        .then((res) => resolve({status: "success", data: res}))
})
