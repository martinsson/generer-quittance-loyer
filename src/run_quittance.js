const path = require('path')
const os = require('os')

const {exportQuittance} = require("./generate_quittance")
let destPath = path.join(os.tmpdir(), 'quittance.pdf')
exportQuittance(destPath).catch(e => {
    console.error(e)
})
