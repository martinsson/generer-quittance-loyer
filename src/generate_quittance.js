const fs = require('fs')
const {createQuittanceData} = require("./textual_date")
const {google, drive_v3, docs_v1} = require('googleapis')
const {writtenFrenchNumber} = require("./textual_date")

function connectToDrive() {
    const credentials = require('../credentials.json')
    let token = require('../token')
    let auth = new google.auth.OAuth2(
        credentials.client_id, credentials.client_secret)
    auth.setCredentials(token)
    google.options({auth})
}

function connectToGoogleService() {
    const auth = new google.auth.GoogleAuth({
        scopes: [
            'https://www.googleapis.com/auth/documents',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.readonly'
        ],
    });
    google.options({auth})

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
        "MONTANT LETTRES": writtenFrenchNumber(455),
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

async function createEmptyDocument(title) {
    connectToGoogleService()
    const docs = google.docs({version: "v1"})
    const result = await docs.documents.create({requestBody: {title}})
    const drive = google.drive({version: "v3"})
    let requestBody = {type:'user', emailAddress: "martinsson.johan@gmail.com", role: 'writer', allowDiscovery: true}
    drive.permissions.create({fileId: result.data.documentId, requestBody})
    return result.data.documentId
}

async function exportQuittance(destPath) {
    connectToDrive()
    let templateId = '19jBWIFhpVAdhatQxYDX-CNRZCPPcVmuhoZdjzJedBpg'
    const drive = google.drive({version: "v3"})

    const newQuittance = await drive.files.copy({fileId: templateId})

    const docs = google.docs({version: "v1"})

    await replaceText(docs, newQuittance.data.id)
    await downloadFile(drive, newQuittance.data.id, destPath)
    return newQuittance
}

module.exports = {exportQuittance, createEmptyDocument}


/*

copy template
replace text
export
delete copy

 */
