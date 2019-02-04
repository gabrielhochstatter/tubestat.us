const express = require('express')
const axios = require('axios')
const Table = require('cli-table')
const figlet = require('figlet')
const expressReact = require('express-react-views')

const colorLineName = require('./helpers/colorLineName')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReact.createEngine());

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

// BUILDERS:
const buildHeader = (format) => {
    const time = new Date().toLocaleTimeString()
    const date = new Date().toDateString()
    const header = `\x1b[1mLine status @ ${time} on ${date} \x1b[0m \n`

    const bigHeader = figlet.textSync('TUBESTAT.US', {font: 'DOS Rebel'})

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

        let statusMessage = `${color}${statusDescriptionMessage}${resetColor}`

        const tableRow = {[colorLineName(line.name)]: [statusMessage]}
        table.push(tableRow)
    })

    return table.toString()
}

//ROUTES:
app.get('/home', (req, res) => {
    res.render('index', { header: buildHeader('browser') })
})

app.get('/health', (req, res) => res.send('APP IS WORKING!\n'))

app.get('/', async (req, res) => {
    
    let tubeDataResponse = await getLineStatus('tube,dlr,overground')
    console.log('user agent', req.headers["user-agent"])
    console.log('cache control:', req.headers["cache-control"])
    console.log('GET TUBE DATA, STATUS: ', tubeDataResponse.status)

    const statusTable = buildStatusTable(tubeDataResponse.data)

    const userAgentIncludesBrowserTypes = req.headers['user-agent'].includes('Mozilla') || req.headers['user-agent'].includes('Chrome')

    const isRequestFromBrowser = typeof req.headers['user-agent'] === 'string' && userAgentIncludesBrowserTypes

    if (isRequestFromBrowser) {
        const bigHeader = figlet.textSync('TUBESTAT.US', {font: 'DOS Rebel'})
        res.render('index', { header: buildHeader('browser'), list: tubeDataResponse.data, bigHeader: bigHeader })
    } else {
        res.send(buildHeader() + statusTable + `\n\x1b[2mCreated by: Gabriel Hochstatter\x1b[0m\n`)
    }
})

app.listen(port, () => console.log(`tubestat.us is up on port ${port}!`))