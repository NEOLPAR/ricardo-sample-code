const fs = require('fs');
const xml2js = require('xml2js');
const formatItem = require('./format-item');

module.exports = (files) => new Promise((resolve, reject) => {
    files.forEach( (filePath) => {
        var rdfData;
        try {
            rdfData = fs.readFileSync(filePath);
        } catch (err) {
            reject({ status: "error", data: `Decompress: ${err.message}`});
        }

        let newItem;
        let parser = new xml2js.Parser();
        parser.parseString(rdfData, function (err, fileContent) {
            if ( err ) reject({ status: "error", data: `Decompress: ${err.message}`});

            newItem = formatItem(fileContent);

        });

        console.log(newItem)
        //Saving to DB one item at a time to avoid loading too many files in memory, probably I would have to perform this part.
    })

    resolve(files)
});