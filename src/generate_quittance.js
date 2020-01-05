const fs = require('fs')
const {google, drive_v3} = require('googleapis')

function connectToDrive() {
    const credentials = require('../credentials.json')
    let token = require('../token')
    let auth = new google.auth.OAuth2(
        credentials.client_id, credentials.client_secret)
    // auth.request = function(e) { console.log(e)}
    auth.setCredentials(token)
    return new drive_v3.Drive({auth})
}

async function downloadFile(driveV3, fileId, destPath) {
    const dest = fs.createWriteStream(destPath)
    let response = await driveV3.files.export({
        fileId,
        mimeType: 'application/pdf'
    }, {responseType: 'stream'})
    response.data.pipe(dest)
}

async function exportQuittance(destPath)  {
    const drive = connectToDrive()

    let templateId = '19jBWIFhpVAdhatQxYDX-CNRZCPPcVmuhoZdjzJedBpg'
    const newQuittance = await drive.files.copy({fileId: templateId})

    await downloadFile(drive, newQuittance.data.id, destPath)
    return newQuittance
}

module.exports = {exportQuittance}


/*

copy template
replace text
export
delete copy

 */
