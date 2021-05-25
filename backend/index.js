const express = require('express')
const mongoose = require('mongoose')

const config = require('./config')
const https = require('./https')
const Module = require('./Moses/Module')
const app = express()

mongoose.connect(config.network.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const MosesModule = mongoose.model('MosesModule', new mongoose.Schema({
    nummer: { type: Number },
    titel: { type: String },
    lernergebnisse: { type: String },
    lehrinhalte: { type: String },
    fakultaet: { type: String },
    sekretariat: { type: String },
    institut: { type: String },
    fachgebiet: { type: String },
    verantwortlich: { type: String },
    ansprechpartner: { type: String },
    email: { type: String }
}))

let modules
https(config.resources.moses.getLinkToAllModules(), (data) => { modules = Module.getModules(data) })

app.get('/moses', (req, res) => {
    res.send({ modules: modules })
})

app.get('/moses/:id', (req, res) => {
    const moduleNumber = req.params.id
    if (!moduleNumber) {
        res.send({ err: "Wrong module not found" })
        return
    }
    findModuleWithModuleNumber(moduleNumber, res)
})

function findModuleWithModuleNumber(moduleNumber, res) {
    MosesModule.findOne({ 'nummer': moduleNumber }, function (err, doc) {
        if (err || !doc) {
            const modulInfo = modules.find(e => e.number === moduleNumber)
            if (modulInfo) {
                console.log("no db entry found. crawling, saving in db and sending...")
                https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version), (data) => {
                    const newModule = createModule(moduleNumber, data)
                    res.send(newModule)
                })
            } else {
                res.send({ err: "Wrong module not found" })
            }
        } else {
            console.log("sending data from db...")
            res.send(doc)
        }
    })
}

function createModule(modulNummer, data) {
    const newModule = new MosesModule()
    newModule.nummer = modulNummer
    newModule.titel = Module.getTitel(data)
    newModule.lernergebnisse = Module.getLernergebnisse(data)
    newModule.lehrinhalte = Module.getLehrinhalte(data)
    newModule.fakultaet = Module.getFakultaet(data)
    newModule.sekretariat = Module.getSekretariat(data)
    newModule.institut = Module.getInstitut(data)
    newModule.fachgebiet = Module.getFachgebiet(data)
    newModule.verantwortlich = Module.getVerantwortlich(data)
    newModule.ansprechpartner = Module.getAnsprechpartner(data)
    newModule.email = Module.getEmail(data)
    newModule.save()
    return newModule
}

app.listen(config.network.port, () => { console.log(`Backend listening at http://localhost:${config.network.port}`) })