const fs = require('fs')
const {createQuittanceData} = require("./textual_date")
const {google} = require('googleapis')
const {writtenFrenchNumber} = require("./textual_date")

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

async function downloadFile(fileId, destPath) {
    const driveV3 = google.drive({version: "v3"})
    let response = await driveV3.files.export({
        fileId,
        mimeType: 'application/pdf'
    }, {responseType: 'stream'})
    const dest = fs.createWriteStream(destPath)
    response.data.pipe(dest)
}

async function replaceText(fileId) {


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


    const docs = google.docs({version: "v1"})
    await docs.documents.batchUpdate({
        documentId: fileId,
        resource: {
            requests,
        },
    })
}

async function createEmptyDocument(title, ownerEmailAddress) {
    connectToGoogleService()
    const docs = google.docs({version: "v1"})
    const result = await docs.documents.create({requestBody: {title}})
    const drive = google.drive({version: "v3"})
    let requestBody = {type:'user', emailAddress: ownerEmailAddress, role: 'writer', allowDiscovery: true}
    drive.permissions.create({fileId: result.data.documentId, requestBody})
    return result.data.documentId
}

async function copyFile(templateId) {
    const drive = google.drive({version: "v3"})
    return await drive.files.copy({fileId: templateId})
}

async function exportQuittance(destPath, templateId) {
    connectToGoogleService()
    const newQuittance = await copyFile(templateId)


    await replaceText(newQuittance.data.id)
    await downloadFile(newQuittance.data.id, destPath)
    return newQuittance
}

module.exports = {exportQuittance, createEmptyDocument}
