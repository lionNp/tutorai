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
            https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 1), (germanData) => {
                https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 2), (englishData) => {
                    let newModule = new MosesModule()
                    newModule = createModule(newModule, modulInfo, englishData, germanData)
                    res.send(newModule)
                })
            })
        } else if (modulInfo.version != doc.version) {
            console.log("db entry outdated. crawling, saving in db and sending...")
            https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 1), (germanData) => {
                https(config.resources.moses.getFullLinkTo(modulInfo.number, modulInfo.version, 2), (englishData) => {
                    let newModule = createModule(doc, modulInfo, englishData, germanData)
                    res.send(newModule)
                })
            })
        } else {
            console.log("sending data from db...")
            res.send(doc)
        }
    })
}

function createModule(newModule, modulInfo, englishData, germanData) {
    newModule.number = modulInfo.number
    newModule.version = modulInfo.version
    newModule.german.title = Module.getTitle(germanData, 1)
    newModule.german.learningOutcomes = Module.getLearningOutcomes(germanData, 1)
    newModule.german.content = Module.getContent(germanData, 1)
    newModule.english.title = Module.getTitle(englishData, 2)
    newModule.english.learningOutcomes = Module.getLearningOutcomes(englishData, 2)
    newModule.english.content = Module.getContent(englishData, 2)
    newModule.faculty = Module.getFaculty(germanData)
    newModule.office = Module.getOffice(germanData)
    newModule.institute = Module.getInstitute(germanData)
    newModule.areaOfExpertise = Module.getAreaOfExpertise(germanData)
    newModule.responsiblePerson = Module.getResponsiblePerson(germanData)
    newModule.contactPerson = Module.getContactPerson(germanData)
    newModule.email = Module.getEmail(germanData)
    newModule.credits = Module.getCredits(germanData)
    newModule.typeOfExam = Module.getTypeOfExam(englishData)
    newModule.website = Module.getWebsite(germanData)
    newModule.save()
    return newModule
}

app.listen(config.network.port, () => { console.log(`Backend listening at http://localhost:${config.network.port}`) })