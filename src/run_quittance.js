const path = require('path')
const os = require('os')

const {exportQuittance} = require("./generate_quittance")
if (! process.env["GOOGLE_APPLICATION_CREDENTIALS"]) {
    console.error('please specify the environment variable   GOOGLE_APPLICATION_CREDENTIALS as mentioned in the Readme')
    process.exit(1)
}
if (process.argv.length < 3) {
    console.error("perhaps you forgot to specify the configuration file")
    process.exit(1)
}
let configuration = require("../" + process.argv[2])

console.log("using configuration:")
console.log(configuration)

let destPath = path.join(os.tmpdir(), 'quittance.pdf')
exportQuittance(destPath, configuration.templateId,  configuration.location).catch(e => {
    console.error(e)
})
