const express = require('express')
const mongoose = require('mongoose')

const config = require('./config')
const https = require('./https')
const Modul = require('./Moses/Modul')
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
https(config.resources.moses.getLinkToAllModules(), (data) => { modules = Modul.getModules(data) })

app.get('/moses', (req, res) => {
    res.send({ modules: modules })
})

app.get('/moses/:id', (req, res) => {
    const moduleNummer = req.params.id
    if (!moduleNummer) {
        res.send({ err: "Wrong module not found" });
        return
    } else if (!moduleInfo){
        res.send({ err: "Module Info not found" });
        return
    }
    findModuleWithModuleNumber(moduleNummer, res);
})

function findModuleWithModuleNumber(modulNummer, res) {
    MosesModule.findOne({'nummer': modulNummer}, function (err, doc) {
        if (err || !doc) {
            console.log("no db entry found. crawling, saving in db and sending...")
            const modulInfo = modules.find(e => e.number === modulNummer)
            https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version), (data) => {
                const newModule = createModule(modulNummer, data);
                res.send(newModule)
            })
        } else {
            console.log("sending data from db...")
            res.send(doc)
        }
    })
}

function createModule(modulNummer, data) {
    const newModule = new MosesModule()
    newModule.nummer = modulNummer
    newModule.titel = Modul.getTitel(data)
    newModule.lernergebnisse = Modul.getLernergebnisse(data)
    newModule.lehrinhalte = Modul.getLehrinhalte(data)
    newModule.fakultaet = Modul.getFakultaet(data)
    newModule.sekretariat = Modul.getSekretariat(data)
    newModule.institut = Modul.getInstitut(data)
    newModule.fachgebiet = Modul.getFachgebiet(data)
    newModule.verantwortlich = Modul.getVerantwortlich(data)
    newModule.ansprechpartner = Modul.getAnsprechpartner(data)
    newModule.email = Modul.getEmail(data)
    newModule.save()
    return newModule;
}

app.listen(config.network.port, () => { console.log(`Backend listening at http://localhost:${config.network.port}`) })