const config = require('../config')
const https = require('../https')
const fs = require('fs')

https(config.resources.moses.getLinkToAllModules(), (data) => {
    fs.writeFile("./test/modules.html", data, (err) => {
        if (err) throw err
    })
})

https('https://moseskonto.tu-berlin.de/moses/modultransfersystem/bolognamodule/beschreibung/anzeigen.html?nummer=40017&version=8&sprache=1', (data) => {
    fs.writeFile("./test/module.html", data, (err) => {
        if (err) throw err
    })
})