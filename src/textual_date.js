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


function writtenFrenchNumber(number) {
    var writtenNumber = require('written-number')
    writtenNumber.defaults.lang = 'fr'
    let textual_number = writtenNumber(number)
    const result = textual_number.charAt(0).toUpperCase() + textual_number.slice(1)
    return result
}


module.exports = {createQuittanceData, writtenFrenchNumber}
