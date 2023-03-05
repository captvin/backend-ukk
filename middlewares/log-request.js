const { getLogger } = require('@utils/logger')

class LogRequest {
    constructor(category) {
        this.logger = getLogger(category)
    }

    LoggerMiddleware = (req, _res, next) => {
        this.logger.info(`[${req.method}] ${req.originalUrl} Incoming request ...`)
        next()
    }
}

module.exports = LogRequest