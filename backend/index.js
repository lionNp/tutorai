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
    number: { type: Number },
    version: { type: Number },
    faculty: { type: String },
    office: { type: String },
    institute: { type: String },
    areaOfExpertise: { type: String },
    responsiblePerson: { type: String },
    contactPerson: { type: String },
    email: { type: String },
    credits: { type: Number },
    typeOfExam: { type: String },
    website: { type: String },
    german: {
        learningOutcomes: { type: String },
        content: { type: String },
        title: { type: String },
    },
    english: {
        learningOutcomes: { type: String },
        content: { type: String },
        title: { type: String }
    }
}))


let modules
https(config.resources.moses.getLinkToAllModules(), (data) => { modules = Module.getModules(data) })

app.get('/moses', (req, res) => {
    res.send({ modules: modules })
})

app.get('/moses/:id', (req, res) => {
    const moduleNumber = parseInt(req.params.id)
    if (!moduleNumber) {
        res.send({ err: "Wrong module not found" })
        return
    }
    const modulInfo = modules.find(e => e.number === moduleNumber)
    if (!modulInfo) {
        res.send({ err: "Wrong module not found" })
        return
    }
    findModuleWithModuleNumber(moduleNumber, modulInfo, res)
})

function findModuleWithModuleNumber(moduleNumber, modulInfo, res) {
    MosesModule.findOne({ 'number': moduleNumber }, function (err, doc) {
        if (err || !doc) {
            console.log("no db entry found. crawling, saving in db and sending...")
            https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 1), (datager) => {
                https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 2), (dataeng) => {
                    let newModule = new MosesModule()
                    newModule = createModule(newModule, moduleNumber, modulInfo.version, dataeng, datager)
                    res.send(newModule)
                })
            })
        } else if (modulInfo.version != doc.version) {
            console.log("db entry outdated. crawling, saving in db and sending...")
            https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 1), (datager) => {
                https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 2), (dataeng) => {
                    let newModule = createModule(doc, moduleNumber, modulInfo.version, dataeng, datager)
                    res.send(newModule)
                })
            })
        } else {
            console.log("sending data from db...")
            res.send(doc)
        }
    })
}

function createModule(newModule, modulNummer, modulVersion, dataeng, datager) {
    newModule.number = modulNummer
    newModule.version = modulVersion
    newModule.german.title = Module.getTitle(datager, 1)
    newModule.german.learningOutcomes = Module.getLearningOutcomes(datager, 1)
    newModule.german.content = Module.getContent(datager, 1)
    newModule.english.title = Module.getTitle(dataeng, 2)
    newModule.english.learningOutcomes = Module.getLearningOutcomes(dataeng, 2)
    newModule.english.content = Module.getContent(dataeng, 2)
    newModule.faculty = Module.getFaculty(datager)
    newModule.office = Module.getOffice(datager)
    newModule.institute = Module.getInstitute(datager)
    newModule.areaOfExpertise = Module.getAreaOfExpertise(datager)
    newModule.responsiblePerson = Module.getResponsiblePerson(datager)
    newModule.contactPerson = Module.getContactPerson(datager)
    newModule.email = Module.getEmail(datager)
    newModule.credits = Module.getCredits(datager)
    newModule.typeOfExam = Module.getTypeOfExam(dataeng)
    newModule.website = Module.getWebsite(datager)
    newModule.save()
    return newModule
}

app.listen(config.network.port, () => { console.log(`Backend listening at http://localhost:${config.network.port}`) })