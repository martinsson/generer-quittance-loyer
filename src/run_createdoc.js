const {createEmptyDocument} = require("./generate_quittance")

createEmptyDocument("quittance", "martinsson.johan@gmail.com").then(documentId => {
    console.log("created document " + documentId)
}).catch(e => {
    console.error(e)
    process.exit(1)
})

