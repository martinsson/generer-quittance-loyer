const fs = require('fs')
const {createQuittanceData} = require("./textual_date")
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

    const dateData = createQuittanceData(new Date())
    const replacementValues = {
        "MONTANT": 455,
        "NOM": "Thomas",
        "PRENOM": "Joannes",
        ...dateData,
        "MONTANT LETTRES": "Quatre cent cinquiante-cinq",
    }
    let createUpdateRequest = ([key, value]) => ({
        replaceAllText: {
            containsText: {
                text: '##' + key + '##',
                matchCase: true,
            },
            replaceText: value.toString(),
        }
    })
    let requests = Object.entries(replacementValues).map(createUpdateRequest)


    await docs.documents.batchUpdate({
        documentId: fileId,
        resource: {
            requests,
        },
    })


}

async function exportQuittance(destPath) {
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
