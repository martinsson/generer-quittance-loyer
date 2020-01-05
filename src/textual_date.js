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


module.exports = {createQuittanceData}
