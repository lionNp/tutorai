class Modul {
    static getModules(html) {
        const regex = /<a href=".*?nummer=(\d*).*?version=(\d*)" title="Modulbeschreibung anzeigen">(.*?)<\/a>/g
        let results = []
        let result = regex.exec(html)
        while (result) {
            results.push({ number: result[1], version: result[2], titel: result[3] })
            result = regex.exec(html)
        }
        return results
    }

    static getTitel(html) {
        const regex = /<h1>([\s\S]*?)<\/h1>/
        return getFirstGroupOfRegex(regex, html)
    }

    static getLernergebnisse(html) {
        const regex = /Lernergebnisse<\/h3>\s*<\/div>\s*<div class="col-xs-12">\s*<span class="preformatedTextarea">([\s\S]*?)<\/div>/
        return getFirstGroupOfRegex(regex, html)
    }

    static getLehrinhalte(html) {
        const regex = /Lehrinhalte<\/h3>\s*<\/div>\s*<div class="col-xs-12">\s*<span class="preformatedTextarea">([\s\S]*?)<\/div>/
        return getFirstGroupOfRegex(regex, html)
    }

    static getFakultaet(html) {
        const regex = /Fakultät:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getSekretariat(html) {
        const regex = /Sekretariat:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getInstitut(html) {
        const regex = /Institut:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getFachgebiet(html) {
        const regex = /Fachgebiet:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getVerantwortlich(html) {
        const regex = /Verantwortliche Person:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getAnsprechpartner(html) {
        const regex = /Ansprechpartner:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getEmail(html) {
        const regex = /E-Mail-Adresse:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }
}

function getFirstGroupOfRegex(regex, data) {
    const result = regex.exec(data)
    if (result && result.length > 1)
        return result[1].trim()
    return ""
}

module.exports = Modul