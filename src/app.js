const importToDB = require('./import-to-db');

importToDB.fileFrom( 'http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2' )
    .then(
        (data)=>console.log("000: ", data),
        (err)=>console.error("000: ", err)
    );

importToDB.fileFrom( 'http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip' )
    .then(
        (data)=>console.log("000: ", data),
        (err)=>console.error("000: ", err)
    );