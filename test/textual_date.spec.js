const {exportQuittance} = require("../src/generate_quittance")
const {describe, it} = require("mocha")
const fs = require("fs")
const os = require("os")
const path = require('path')

const {expect} = require("chai")

function createQuittanceData(date) {
    const months = ["JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"]
    const monthIndex = date.getMonth()
    let startOfPeriod = new Date(date.getFullYear(), date.getMonth(), 1)
    let endOfPeriod = new Date(startOfPeriod)
    endOfPeriod.setDate(startOfPeriod.getDate()+31)
    return {
        "DEBUT": `1/${startOfPeriod.getMonth()+1}/${(date.getFullYear())}`,
        "FIN": `1/${endOfPeriod.getMonth()+1}/${endOfPeriod.getFullYear()}`,
        "MOIS": months[monthIndex],
        "ANNEE": date.getFullYear(),
    }
}

describe("textual_date", () => {

    it("creates textual representation of dats", async () => {
        expect(createQuittanceData(new Date(2020, 0, 15))).eql({
            "DEBUT": "1/1/2020",
            "FIN": "1/2/2020",
            "MOIS": "JANVIER",
            "ANNEE": 2020,
        })

        expect(createQuittanceData(new Date(2021, 10, 30))).eql({
            "DEBUT": "1/11/2021",
            "FIN": "1/12/2021",
            "MOIS": "NOVEMBRE",
            "ANNEE": 2021,
        })
    })
    it("handles the end of the year", async () => {
        expect(createQuittanceData(new Date(2019, 11, 31))).eql({
            "DEBUT": "1/12/2019",
            "FIN": "1/1/2020",
            "MOIS": "DECEMBRE",
            "ANNEE": 2019,
        })

    });



})
