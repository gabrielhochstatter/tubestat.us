const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

const getTubeStatus = async () => {
    try {
        return await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
    } catch (error) {
        console.log(error)
        return 'SOMETHING BROKE 🤯 SORRY!'
    }
}

const buildStatusMessage = (statusData) => {
    let listOfLineNames = statusData.map(line => {
        const statusDescriptionMessage = line.lineStatuses[0].statusSeverityDescription
        const statusSeverity = line.lineStatuses[0].statusSeverity
        const resetColor = '\x1b[0m'

        let color = '\x1b[0m'

        if (statusSeverity < 9) {
            color = '\x1b[31m'
        } else if (statusSeverity === 9) {
            color = '\x1b[33m'
        } else if (statusSeverity === 10 ) {
            color = '\x1b[32m'
        }

        return `\x1b[34m${line.name}: ${color}${statusDescriptionMessage}${resetColor}`
    })

    return listOfLineNames.join(`\n`)
}

app.get('/home', (req, res) => res.send('Nothing to see here 👀\n'))

app.get('/health', (req, res) => res.send('APP IS WORKING!\n'))

app.get('/', async (req, res) => {
    let tubeDataResponse = await getTubeStatus()
    console.log('GET TUBE DATA, STATUS: ', tubeDataResponse.status)

    const statusMessage = buildStatusMessage(tubeDataResponse.data)

    // const listOfLineNames = tubeDataResponse.data.map(line => {
    //     let statusDescriptionMessage = '-'

    //     return `\x1b[34m${line.name}:\x1b[0m ${line.lineStatuses[0].statusSeverityDescription}`
    // })

    res.send(statusMessage + `\n\x1b[2mCreated by: Gabriel Hochstatter\x1b[0m\n`)
})

app.listen(port, () => console.log(`tubestat.us is up on port ${port}!`))