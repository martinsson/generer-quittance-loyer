const {exportQuittance} = require("../src/generate_quittance")
const {describe, it} = require("mocha")
const fs = require("fs")
const os = require("os")
const path = require('path')

const {expect} = require("chai")
const {google, drive_v3, docs_v1} = require('googleapis')

describe("generate_quittance", () => {
    let docId

    afterEach(async function () {
        await google.drive({version: "v3"}).files.delete({docId: docId, fileId:docId})

    })
    it("generateQuittance", async () => {
        let destPath = path.join(os.tmpdir(), 'quittance.pdf')
        const doc = await exportQuittance(destPath)
        docId = doc.data.id
        fs.existsSync(destPath)
        expect(fs.existsSync(destPath)).true
    }).timeout(10000)
})
