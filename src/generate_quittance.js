const fs = require('fs')
const path = require('path')
const os = require('os')
const readline = require('readline')
const {google, drive_v3} = require('googleapis')

async function getQuittance() {
    const credentials = require('../credentials.json')
    let auth = new google.auth.OAuth2(
        credentials.client_id, credentials.client_secret)
    // auth.request = function(e) { console.log(e)}
    auth.setCredentials(require('../token'))
    const drive = google.drive({version: 'v3', auth})
    let templateId = '19jBWIFhpVAdhatQxYDX-CNRZCPPcVmuhoZdjzJedBpg'
    const destPath = path.join(os.tmpdir(), 'quittance.pdf');
    const dest = fs.createWriteStream(destPath);
    const newQuittance = await drive.files.copy({fileId: templateId})
    let response = await drive.files.export({fileId: newQuittance.data.id, mimeType: 'application/pdf'}, {responseType: 'stream'})
    response.data.pipe(dest)
    // fs.writeFileSync(destPath, pdfFile.data)
    console.log(destPath)
}


getQuittance().catch(e => {
    console.error(e)
})


/*

copy template
replace text
export
delete copy

 */
