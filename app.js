const express = require('express')
const axios = require('axios')
const Table = require('cli-table')

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

// BUILDERS:
const buildStatusMessage = (statusData) => {
    const table = new Table({ head: ['Line', 'Status']})

    statusData.forEach(line => {
        const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
        const statusSeverity = line.lineStatuses[0].statusSeverity
        const resetColor = '\x1b[0m'
        const blue = '\x1b[34m'

        let color = '\x1b[0m'

        if (statusSeverity < 9) {
            color = '\x1b[31m'
        } else if (statusSeverity === 9) {
            color = '\x1b[33m'
        } else if (statusSeverity === 10 ) {
            color = '\x1b[32m'
        }

        let lineName = `${blue}${line.name}:${resetColor}`
        let statusMessage = `${color}${statusDescriptionMessage}${resetColor}`

        const tableRow = {[lineName]: statusMessage}
        table.push(tableRow)
    })

    return table.toString()
}

const buildGhettoHTMLVersion = (statusData) => {
    let list = statusData.map(line => {
        const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
        return `<li>${line.name}: ${statusDescriptionMessage}</li>`
    })

    return `<h1>TUBE STATUS:</h1><ul>${list.join('')}</ul><p>NOTE: This is much better if you use "curl tubestat.us" from a terminal</p>`
}

//ROUTES:
app.get('/home', (req, res) => res.send('Nothing to see here 👀\n'))

app.get('/health', (req, res) => res.send('APP IS WORKING!\n'))

app.get('/', async (req, res) => {
    let tubeDataResponse = await getLineStatus('tube')
    console.log(req.headers["user-agent"])
    console.log('GET TUBE DATA, STATUS: ', tubeDataResponse.status)

    const statusMessage = buildStatusMessage(tubeDataResponse.data)
    const htmlResponse = buildGhettoHTMLVersion(tubeDataResponse.data)

    if (req.headers["user-agent"].includes('curl')) {
        res.send(statusMessage + `\n\x1b[2mCreated by: Gabriel Hochstatter\x1b[0m\n`)
    } else {
        res.send(htmlResponse)
    }
})

app.get('/bus', async (req, res) => {
    let busDataResponse = await getLineStatus('bus')
    console.log(req.headers["user-agent"])
    console.log('GET TUBE DATA, STATUS: ', busDataResponse.status)

    const statusMessage = buildStatusMessage(busDataResponse.data)
    const htmlResponse = buildGhettoHTMLVersion(busDataResponse.data)

    if (req.headers["user-agent"].includes('curl')) {
        res.send(statusMessage + `\n\x1b[2mCreated by: Gabriel Hochstatter\x1b[0m\n`)
    } else {
        res.send(htmlResponse)
    }
})

app.listen(port, () => console.log(`tubestat.us is up on port ${port}!`))