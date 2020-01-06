const {createEmptyDocument} = require("./generate_quittance")

createEmptyDocument("quittance").then(documentId => {
    console.log("created document " + documentId)
}).catch(e => {
    console.error(e)
    process.exit(1)
})

