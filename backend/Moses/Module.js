class Module {
    static getModules(html) {
        const regex = /<a href=".*?nummer=(\d*).*?version=(\d*)" title="Modulbeschreibung anzeigen">(.*?)<\/a>/g
        let results = []
        let result = regex.exec(html)
        while (result) {
            results.push({ number: parseInt(result[1]), version: parseInt(result[2]), title: result[3] })
            result = regex.exec(html)
        }

        results.sort((a, b) => {
            const numberDiff = a.number - b.number;
            if (numberDiff == 0)
                return a.version - a.version;
            return numberDiff
        })

        results = results.filter(module => {
            for (const otherModule of results) {
                if (otherModule.number == module.number && otherModule.version > module.version)
                    return false
            }
            return true
        })

        return results
    }

    static getTitel(html) {
        const regex = /<h1>([\s\S]*?)<\/h1>/
        return getFirstGroupOfRegex(regex, html)

    }

    static getLearningOutcomes(html, language) {
        const regex = language == 1 ?
            /Lernergebnisse<\/h3>\s*<\/div>\s*<div class="col-xs-12">\s*<span class="preformatedTextarea">([\s\S]*?)<\/span>/ :
            /Learning Outcomes<\/h3>\s*<\/div>\s*<div class="col-xs-12">\s*<span class="preformatedTextarea">([\s\S]*?)<\/span>/
        return getFirstGroupOfRegex(regex, html)
    }

    static getContent(html, language) {
        const regex = language == 1 ?
            /Lehrinhalte<\/h3>\s*<\/div>\s*<div class="col-xs-12">\s*<span class="preformatedTextarea">([\s\S]*?)<\/span>/ :
            /Content<\/h3>\s*<\/div>\s*<div class="col-xs-12">\s*<span class="preformatedTextarea">([\s\S]*?)<\/span>/
        return getFirstGroupOfRegex(regex, html)
    }

    static getFaculty(html) {
        const regex = /Fakultät:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getOffice(html) {
        const regex = /Sekretariat:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getInstitute(html) {
        const regex = /Institut:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getAreaOfExpertise(html) {
        const regex = /Fachgebiet:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getResponsiblePerson(html) {
        const regex = /Verantwortliche Person:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getContactPerson(html) {
        const regex = /Ansprechpartner:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getEmail(html) {
        const regex = /E-Mail-Adresse:<\/label>[\s\S]*?\/>(.*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getCredits(html) {
        const regex = /Leistungspunkte:<\/label>[\s\S]*?<span[\s\S]*?>(\d*)/
        return getFirstGroupOfRegex(regex, html)
    }

    static getTypeOfExam(html) {
        const regex = /Type of exam<\/h4>([\s\S]*?)</
        return getFirstGroupOfRegex(regex, html)
    }

    static getWebsite(html) {
        const regex = /Webseite:<\/label>[\s\S]*?<a href="([\s\S]*?)"/
        return getFirstGroupOfRegex(regex, html)
    }
}

function getFirstGroupOfRegex(regex, data) {
    const result = regex.exec(data)
    if (result && result.length > 1)
        return result[1].trim()
    return ""
}

module.exports = Module