const {exportQuittance} = require("../src/generate_quittance")
const {describe, it} = require("mocha")
const fs = require("fs")
const os = require("os")
const path = require('path')

const {expect} = require("chai")
const {google, drive_v3, docs_v1} = require('googleapis')

describe("generate_quittance", () => {
    it("generateQuittance", async () => {
        let destPath = path.join(os.tmpdir(), 'quittance.pdf')
        await exportQuittance(destPath)
        fs.existsSync(destPath)
        expect(fs.existsSync(destPath)).true
    }).timeout(10000)
})
