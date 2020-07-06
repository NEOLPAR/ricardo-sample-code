const http = require('http');
const url = require("url");
const path = require("path");
const fs = require('fs');

const destinationFolder = "./files/tmp/";

module.exports.getFile = (fileURL) => new Promise(function(resolve, reject) {
    http.get(fileURL, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!(/^application\/x-bzip2/.test(contentType) || /^application\/zip/.test(contentType))) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/zip || application/x-bzip2 but received ${contentType}`);
        }
        if (error) {
            res.resume();

            reject({ status: 'error', data: `Download 1: ${error.message}` });
        }

        let fileLen = parseInt(res.headers['content-length'], 10);
        let currentLen = 0;
        let total = fileLen / 1048576;

        res.on('data', (chunk) => {
            currentLen += chunk.length;
            console.log("Downloading " + (100.0 * currentLen / fileLen).toFixed(2) + "% " +
                (currentLen / 1048576).toFixed(2) + " mb." +
                " Total size: " + total.toFixed(2) + " mb")
        });

        const parsed = url.parse(fileURL);
        let filePath = destinationFolder + path.basename(parsed.pathname);
        let file = fs.createWriteStream(filePath);
        file
            .on('finish', () => {
                file.close( resolve({ status: 'success', data: filePath }) );
            })
            .on('error', (err) => reject({ status: 'error', data: `Download 2: ${err}` }) );

        res.pipe(file);
    }).on('error', (e) => {
        reject({ status: 'error', data: `Download 3: ${e.message}` });
    });
})