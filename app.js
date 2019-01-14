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

app.get('/home', (req, res) => res.send('Nothing to see here 👀\n'))

app.get('/health', (req, res) => res.send('APP IS WORKING!\n'))

app.get('/', async (req, res) => {
    let tubeDataResponse = await getTubeStatus()
    console.log('GET TUBE DATA, STATUS: ', tubeDataResponse.status)

    const listOfLineNames = tubeDataResponse.data.map(line => {
        return `${line.name}: ${line.lineStatuses[0].statusSeverityDescription}`
    })

    res.send(listOfLineNames.join('\n') + `\nCreated by: Gabriel Hochstatter\n`)
})

app.listen(port, () => console.log(`tubestat.us is up on port ${port}!`))