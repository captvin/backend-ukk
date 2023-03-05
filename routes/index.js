const Router = require('express').Router()

const glob = require('glob')
const path = require('path')

const config = {
    ext: '.route.js',
    folderDir: './routes/'
}

glob(`${config.folderDir}*${config.ext}`, function (err, files) {
    if (err) {
        throw new Error(err.name)
    } else {
        for (const item of files) {
            var basename = path.basename(item, config.ext)
            var file = require('./' + basename + config.ext)

            if (!file.Router) continue

            Router.use(file.route, file.Router)
        }
    }
})

module.exports = Router