const path = require('path')
const os = require('os')
const moment = require('moment')

const {exportQuittance} = require("./generate_quittance")
if (!process.env["GOOGLE_APPLICATION_CREDENTIALS"]) {
    console.error('please specify the environment variable   GOOGLE_APPLICATION_CREDENTIALS as mentioned in the Readme')
    process.exit(1)
}
if (process.argv.length < 3) {
    console.error("perhaps you forgot to specify the configuration file")
    console.error("Usage: run_quittance.js configuration.json [number of months back]")
    console.error("ex for last month: run_quittance.js configuration.json 2")
    console.error("ex for current month: run_quittance.js configuration.json")
    process.exit(1)
}
let configuration = require("../" + process.argv[2])

console.log("using configuration:")
console.log(configuration)

let numberOfMonthsAgo = process.argv.length > 3 ? process.argv[3] : 0
let date = moment().subtract(numberOfMonthsAgo, "months")
console.log("using date: " + date.format("MMMM YYYY"))

let destPath = path.join(os.tmpdir(), 'quittance.pdf')
exportQuittance(destPath, configuration.templateId, configuration.location, date).catch(e => {
    console.error(e)
})
