const {exportQuittance} = require("../src/generate_quittance")
const {describe, it} = require("mocha")
const fs = require("fs")
const os = require("os")
const path = require('path')
const {writtenFrenchNumber} = require("../src/textual_date")
const {quittanceDate} = require("../src/textual_date")

const {expect} = require("chai")


describe("textual_date", () => {

    it("creates textual representation of dats", async () => {
        expect(quittanceDate(new Date(2020, 0, 15))).eql({
            "DEBUT": "1/1/2020",
            "FIN": "1/2/2020",
            "MOIS": "JANVIER",
            "ANNEE": 2020,
        })

        expect(quittanceDate(new Date(2021, 10, 30))).eql({
            "DEBUT": "1/11/2021",
            "FIN": "1/12/2021",
            "MOIS": "NOVEMBRE",
            "ANNEE": 2021,
        })
    })
    it("handles the end of the year", async () => {
        expect(quittanceDate(new Date(2019, 11, 31))).eql({
            "DEBUT": "1/12/2019",
            "FIN": "1/1/2020",
            "MOIS": "DECEMBRE",
            "ANNEE": 2019,
        })

    });

    it("written numbers", async () => {
        const result = writtenFrenchNumber(455)
        expect(result).equal("Quatre cent cinquante-cinq")
    });




})
