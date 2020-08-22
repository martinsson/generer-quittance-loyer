const {exportQuittance} = require("../src/generate_quittance")
const {describe, it} = require("mocha")
const fs = require("fs")
const os = require("os")
const path = require('path')
const moment = require('moment')

const {expect} = require("chai")
const {google, drive_v3, docs_v1} = require('googleapis')

describe("generate_quittance", () => {
    let createdDocId

    afterEach(async function () {
        await google.drive({version: "v3"}).files.delete({docId: createdDocId, fileId:createdDocId})

    })
    it("generateQuittance", async () => {
        let destPath = path.join(os.tmpdir(), 'quittance.pdf')
        const doc = await exportQuittance(destPath, '1SWHs4EXwLNy50tv3pTeL4eOqoJjM5gagmG5qvugNGwI',  {
            "NOM": "Doe",
            "PRENOM": "John",
            "ADDRESS": "12 rue de la fleur\n38000 Grenoble",
            "MONTANT": 150
        }, moment())
        createdDocId = doc.data.id
        fs.existsSync(destPath)
        expect(fs.existsSync(destPath)).true
    }).timeout(10000)
})
