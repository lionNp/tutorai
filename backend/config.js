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
        mongoURI: "CHANGE ME"
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