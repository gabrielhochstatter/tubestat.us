const resetColor = '\x1b[0m'
const vicBlue = '\x1b[38;5;45m'
const mint = '\x1b[38;5;49m'
const lightBlue = '\x1b[38;5;27m'
const red = '\x1b[38;5;9m'
const brown = '\x1b[38;5;94m'
const yellow = '\x1b[38;5;11m'
const green = '\x1b[38;5;2m'
const dlrTeal = '\x1b[38;5;6m'
const pink = '\x1b[38;5;218m'
const grey = '\x1b[38;5;250m'
const orange = '\x1b[38;5;202m'
const burgundy = '\x1b[38;5;124m'
const northern = '\x1b[38;5;243m'

const colorLineName = (lineName) => {
    switch (lineName) {
        case 'Bakerloo':
            return `${brown}${lineName}${resetColor}`
        case 'Central':
            return `${red}${lineName}${resetColor}`
        case 'Circle':
            return `${yellow}${lineName}${resetColor}`
        case 'District':
            return `${green}${lineName}${resetColor}`
        case 'DLR':
            return `${dlrTeal}${lineName}${resetColor}`
        case 'Hammersmith & City':
            return `${pink}${lineName}${resetColor}`
        case 'Jubilee':
            return `${grey}${lineName}${resetColor}`
        case 'London Overground':
            return `${orange}${lineName}${resetColor}`
        case 'Metropolitan':
            return `${burgundy}${lineName}${resetColor}`
        case 'Northern':
            return `${northern}${lineName}${resetColor}`
        case 'Piccadilly':
            return `${lightBlue}${lineName}${resetColor}`
        case 'Victoria':
            return `${vicBlue}${lineName}${resetColor}`
        case 'Waterloo & City':
            return `${mint}${lineName}${resetColor}`
        default:
            return `${resetColor}${lineName}`
    }

}

module.exports = colorLineName