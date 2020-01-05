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

async function createFile() {
    const credentials = require('../credentials.json')
    let auth = new google.auth.OAuth2(
        credentials.client_id, credentials.client_secret)
    // auth.request = function(e) { console.log(e)}
    let credentials1 = require('../token')
    console.log(credentials1)
    auth.setCredentials(credentials1)

    const docs = google.docs({version: 'v1', auth});
    docs.documents.get({
        documentId: '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(`The title of the document is: ${res.data.title}`);
    });

    const drive = google.drive({
        version: 'v3',
        auth: auth
    })
    const res = await drive.files.create({
        requestBody: {
            name: 'Test',
            mimeType: 'text/plain'
        },
        media: {
            mimeType: 'text/plain',
            body: 'Hello World'
        }
    })
}

getQuittance().catch(e => {
    console.error(e)
})

const compute = google.compute('v1')

async function main() {
    // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
    // environment variables.
    const auth = new google.auth.GoogleAuth({
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: [
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/documents']
    })
    const authClient = await auth.getClient()

    // obtain the current project Id
    const project = await auth.getProjectId()

    // Fetch the list of GCE zones within a project.
    const drive = google.drive({version: 'v3', auth})

    // let templateId = '19jBWIFhpVAdhatQxYDX-CNRZCPPcVmuhoZdjzJedBpg'
    let templateId = '1xTFjmQok9lThFm-bvma9b636EETDF_qX5ScIRsjhvr4'

    const list = await drive.files.list();
    list.data.files.forEach(f => console.log())
    console.log(list.data.files)
    // await drive.files.export({fileId: templateId, mimeType: 'application/pdf'})


    // const res = await compute.zones.list({ project, auth: authClient });
    // console.log(res.data);
}

// main().catch(console.error)
/*

copy template
replace text
export
delete copy

 */
