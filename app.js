const express = require('express')
const axios = require('axios')
const Table = require('cli-table')
const figlet = require('figlet')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

// API CALL STUFF:
const getLineStatus = async (lineType) => {
    try {
        return await axios.get(`https://api.tfl.gov.uk/line/mode/${lineType}/status`)
    } catch (error) {
        console.log(error)
        return 'SOMETHING BROKE 🤯 SORRY!'
    }
}

// COLORING:
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

// BUILDERS:
const buildHeader = (format) => {
    const time = new Date().toLocaleTimeString()
    const date = new Date().toDateString()
    const header = `\x1b[1mLine status @ ${time} on ${date} \x1b[0m \n`

    const bigHeader = figlet.textSync('TUBESTAT.US', {font: 'Larry 3D 2'})

    if (format === 'browser') {
        return `TUBESTAT.US @ ${time} on ${date}`
    }

    return `\x1b[1m${bigHeader}\n${header}`
}

const buildStatusTable = (statusData) => {
    const table = new Table({ head: [`\x1b[0mLine`, `\x1b[0mStatus`]})

    statusData.forEach(line => {
        const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
        const statusSeverity = line.lineStatuses[0].statusSeverity

        let color = '\x1b[0m'

        if (statusSeverity < 9) {
            color = '\x1b[31m'
        } else if (statusSeverity === 9) {
            color = '\x1b[33m'
        } else if (statusSeverity === 10 ) {
            color = '\x1b[32m'
        }

        // let lineName = `${blue}${line.name}:${resetColor}`
        let statusMessage = `${color}${statusDescriptionMessage}${resetColor}`

        const tableRow = {[colorLineName(line.name)]: [statusMessage]}
        table.push(tableRow)
    })

    return table.toString()
}

const buildGhettoHTMLVersion = (statusData) => {
    let list = statusData.map(line => {
        const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
        return `<li>${line.name}: ${statusDescriptionMessage}</li>`
    })

    return `
    <style>* {font-family: sans-serif;}</style>
    <h1>${buildHeader('browser')}</h1>
    <ul>${list.join('')}</ul>
    <p>NOTE: This is much better if you use "curl tubestat.us" from a terminal</p>`
}

//ROUTES:
app.get('/home', (req, res) => res.send('Nothing to see here 👀\n'))
app.get('/health', (req, res) => res.send('APP IS WORKING!\n'))

app.get('/', async (req, res) => {
    

    let tubeDataResponse = await getLineStatus('tube,dlr,overground')
    console.log('user agent', req.headers["user-agent"])
    console.log('cache control:', req.headers["cache-control"])
    console.log('GET TUBE DATA, STATUS: ', tubeDataResponse.status)

    const statusTable = buildStatusTable(tubeDataResponse.data)
    const htmlResponse = buildGhettoHTMLVersion(tubeDataResponse.data)

    if (req.headers["user-agent"].includes('curl')) {
        res.send(buildHeader() + statusTable + `\n\x1b[2mCreated by: Gabriel Hochstatter\x1b[0m\n`)
    } else {
        res.send(htmlResponse)
    }
})

app.listen(port, () => console.log(`tubestat.us is up on port ${port}!`))