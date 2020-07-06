const downloadFunction = require('./download');
const unzipFunction = require('./unzip');
const getFilePaths = require('./get-file-paths');
const saveDB = require('./save-db');

let fileFrom = ( fileUrl ) => new Promise((resolve, reject) => {
    console.log("********** downloading " + fileUrl + " **********");

    downloadFunction
        .getFile(fileUrl)
        .then(
            (res) => {
                unzipFile( res.data )
                    .then(
                        (res) => resolve(res),
                        (err) => reject(err)
                    )
            },
            (err) => reject(err)
        );
});

let unzipFile = ( fileName ) => new Promise( (resolve, reject) => {
    console.log("********** unzipping " + fileName + " **********");
    unzipFunction(fileName)
        .then(
            (res) => {
                getFiles()
                    .then(
                        (res) => resolve(res),
                        (err) => reject(err)
                    )
            },
            (err) => reject(err)
        );
});

let getFiles = () => new Promise( (resolve, reject) => {
    console.log("********** getting file paths **********");
    getFilePaths()
        .then(
            (res) => {
                saveItems(res.data)
                    .then(
                        (res) => resolve(res),
                        (err) => reject(err)
                    )
            },
            (err) => reject(err)
        );
});

let saveItems = (files) => new Promise((resolve, reject) => {
    console.log("********** saving items **********");
    saveDB(files)
        .then(
            (res) => {
                resolve(res)
                /*
                saveItems(res.data)
                    .then(
                        (res) => resolve(res),
                        (err) => reject(err)
                    )

                 */
            },
            (err) => reject(err)
        );
});

module.exports = {
    fileFrom: fileFrom,
    unzipFile: unzipFile,
    getFiles: getFiles,
    saveItems: saveItems
}