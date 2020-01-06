const {createEmptyDocument} = require("./generate_quittance")

if (! process.env["GOOGLE_APPLICATION_CREDENTIALS"]) {
    console.error('please specify the environment variable   GOOGLE_APPLICATION_CREDENTIALS as mentioned in the Readme')
    process.exit(1)
}

if (process.argv.length < 3) {
    console.error("please specify the email address as mentioned in the Readme")
    process.exit(1)
}
let ownerEmailAddress = process.argv[2]

createEmptyDocument("quittance", ownerEmailAddress).then(documentId => {
    console.log("created document " + documentId)
}).catch(e => {
    console.error(e)
    process.exit(1)
})

