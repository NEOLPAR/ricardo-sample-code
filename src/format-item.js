function getPropertyByRegex(obj,propName) {
    let objString = JSON.stringify(obj);
    let pattern = new RegExp('"' + propName + '":.*?"(.*?)".*?,', "i");
    if ( propName === "dcterms:author") {
        console.log(objString)
        console.log(objString.match(pattern))
    }
    if( pattern.test(objString) )
        return objString.match(pattern)
    else
        return null;
}

module.exports = (obj) => {
    let id = getPropertyByRegex(obj, "rdf:about");
    let title = getPropertyByRegex(obj, "dcterms:title");


    return {
        id: id.length !== 0 ? id[1].split('/')[1] : null,
        title: title.length !== 0 ? title[1] : null,
        authors: null,
        publisher: "Gutenberg",
        publicationDate: ""
    };
};