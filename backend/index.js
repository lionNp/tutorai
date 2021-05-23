const express = require('express')
const mongoose = require('mongoose')

const config = require('./config')
const https = require('./https')
const Modul = require('./Moses/Modul')
const app = express()
const conn = mongoose.connect(config.network.mongoURI, {
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
}));

let modules;
https(config.resources.moses.getLinkToAllModules(), (data) => { modules = Modul.getModules(data) })

app.get('/moses', function (req, res) {
    res.send(modules)
})

app.get('/moses/:id', function (req, res) {
    const modulNummer = req.params.id
    if (modulNummer) {
        MosesModule.findOne({ 'nummer': modulNummer }, function (err, doc) {
            if (err || !doc) {
                console.log("no db entry found. crawling, saving in db and sending...")
                const modulInfo = modules.find(e => e.number == modulNummer)
                if (modulInfo) {
                    https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version), (data) => {
                        const mod = new MosesModule()
                        mod.nummer = modulNummer
                        mod.titel = Modul.getTitel(data)
                        mod.lernergebnisse = Modul.getLernergebnisse(data)
                        mod.lehrinhalte = Modul.getLehrinhalte(data)
                        mod.fakultaet = Modul.getFakultaet(data)
                        mod.sekretariat = Modul.getSekretariat(data)
                        mod.institut = Modul.getInstitut(data)
                        mod.fachgebiet = Modul.getFachgebiet(data)
                        mod.verantwortlich = Modul.getVerantwortlich(data)
                        mod.ansprechpartner = Modul.getAnsprechpartner(data)
                        mod.email = Modul.getEmail(data)
                        mod.save()
                        res.send(mod)
                    })
                }
                else {
                    res.send({ err: "Wrong module number" })
                }
            }
            else {
                console.log("sending data from db")
                res.send(doc)
            }
        })
    }
    else {
        res.send({ err: "Wrong module number" })
    }
})

app.listen(config.network.port, () => { console.log(`Backend listening at http://localhost:${config.network.port}`) })