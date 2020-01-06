const path = require('path')
const os = require('os')

const {exportQuittance} = require("./generate_quittance")
let destPath = path.join(os.tmpdir(), 'quittance.pdf')
exportQuittance(destPath, '1SWHs4EXwLNy50tv3pTeL4eOqoJjM5gagmG5qvugNGwI').catch(e => {
    console.error(e)
})
