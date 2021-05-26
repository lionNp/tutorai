const internal = {
    resources: {
        moses: {
            linkPrefix: 'https://moseskonto.tu-berlin.de/moses/modultransfersystem/bolognamodule/',
            allModules: 'suchen.html?semester=66'
        }
    }
}
const config = {
    network: {
        port: 3000,
        mongoURI: "mongodb+srv://tutorai:I7AzVJYC1uBFVaJJ@cluster0.crt0y.mongodb.net/tutorai?retryWrites=true&w=majority"
    },
    resources: {
        moses: {
            getLinkToAllModules() {
                return internal.resources.moses.linkPrefix + internal.resources.moses.allModules
            },
            getFullLinkTo(number, version, language) {
                return internal.resources.moses.linkPrefix + `beschreibung/anzeigen.html?nummer=${number}&version=${version}&sprache=${language}`
            }
        }
    }   
}

module.exports = config