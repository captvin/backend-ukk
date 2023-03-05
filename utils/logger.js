const { createWriteStream } = require('fs')
const { configure, getLogger } = require('log4js')
const path = require('path')

const strDate = new Date().toLocaleDateString('id-ID').replace('/', '-')
const logFilePath = path.join(__dirname, '..', 'logs', strDate + '.log')

function bootstrapLogger() {
    configure({
        appenders: {
            out: { type: 'stdout' },
            app: { type: 'file', filename: logFilePath }
        },
        categories: {
            default: { appenders: ['out', 'app'], level: 'debug' }
        }
    })

    const logger = getLogger()
    logger.level = 'debug'
}

const morganStream = createWriteStream(logFilePath, { flags: 'a', autoClose: true }) // flags option 'a' for append.
const logFormat = '[:date[iso]] :method :url :status | :res[content-length] bytes - :response-time ms'

module.exports = { bootstrapLogger, getLogger, morganStream, logFormat }