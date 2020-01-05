const fs = require('fs')
const {google, drive_v3, docs_v1} = require('googleapis')

function connectToDrive() {
    const credentials = require('../credentials.json')
    let token = require('../token')
    let auth = new google.auth.OAuth2(
        credentials.client_id, credentials.client_secret)
    // auth.request = function(e) { console.log(e)}
    auth.setCredentials(token)
    return auth

}

async function downloadFile(driveV3, fileId, destPath) {
    const dest = fs.createWriteStream(destPath)
    let response = await driveV3.files.export({
        fileId,
        mimeType: 'application/pdf'
    }, {responseType: 'stream'})
    response.data.pipe(dest)
}

async function replaceText(docs, fileId) {
    let requests = [
        {
            replaceAllText: {
                containsText: {
                    text: '##MONTANT##',
                    matchCase: true,
                },
                replaceText: "455",
            },
        }
    ];

    await docs.documents.batchUpdate({
        documentId: fileId,
        resource: {
            requests,
        },
    })


}

async function exportQuittance(destPath)  {
    const auth = connectToDrive()
    let templateId = '19jBWIFhpVAdhatQxYDX-CNRZCPPcVmuhoZdjzJedBpg'
    const drive = new drive_v3.Drive({auth})

    const newQuittance = await drive.files.copy({fileId: templateId})

    const docs = new docs_v1.Docs({auth})

    await replaceText(docs, newQuittance.data.id)
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
