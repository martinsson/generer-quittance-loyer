const fs = require('fs')
const path = require('path')
const {quittanceDate} = require("./textual_date")

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

async function downloadFile(fileId, destDir, date, fileName) {
    const driveV3 = google.drive({version: "v3"})
    let response = await driveV3.files.export({
        fileId,
        mimeType: 'application/pdf'
    }, {responseType: 'stream'})
    let destPath = path.join(destDir, fileName)
    const dest = fs.createWriteStream(destPath)
    response.data.pipe(dest)
    console.log("saved file to " + destPath)
}

async function replaceText(fileId, date, {NOM, PRENOM, ADDRESS, MONTANT}) {


    const dateData = quittanceDate(date.toDate())
    const replacementValues = {
        NOM,
        PRENOM,
        ADDRESS,
        ...dateData,
        "MONTANT": MONTANT,
        "MONTANT LETTRES": writtenFrenchNumber(MONTANT),
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
    await drive.permissions.create({fileId: result.data.documentId, requestBody})
    return result.data.documentId
}

async function copyFile(templateId) {
    const drive = google.drive({version: "v3"})
    return await drive.files.copy({fileId: templateId})
}

async function exportQuittance(destDir, templateId, locationData, date) {
    connectToGoogleService()
    const newQuittance = await copyFile(templateId)


    await replaceText(newQuittance.data.id, date, locationData)
    let fileName = `quittance_${date.format("YYYY_MM")}_${locationData.NOM}.pdf`
    await downloadFile(newQuittance.data.id, destDir, date, fileName)

    return newQuittance
}

module.exports = {exportQuittance, createEmptyDocument}
