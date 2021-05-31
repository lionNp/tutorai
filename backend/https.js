const https = require('https')

function https_get(link, func_cb) {
    https.get(link, (res) => {
        let html = ''
        res.on('data', (data) => { html += data })
        res.on('end', () => { func_cb(html) })
    }).on('error', (e) => {
        console.error(e)
    })
}

module.exports = https_get