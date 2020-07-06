const decompress = require('decompress');

module.exports = (fileName) => new Promise((resolve, reject) => {
   try {
       let tmpDirectory = './files/tmp/unzipped';
       decompress(fileName, tmpDirectory)
           .then((files) => resolve({status: "success", data: files}))
   } catch (e) {
       reject({ status: "error", data: `Decompress: ${e.message}`})
   }
});