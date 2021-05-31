const assert = require('assert')
const fs = require('fs')

const Modul = require('../Moses/Module')

const modules_html = fs.readFileSync("./test/modules.html").toString()
const module_html = fs.readFileSync("./test/module.html").toString()

const modules = Modul.getModules(modules_html)

describe('Modul', function () {
    describe('#getModules(html)', function () {
        it(`[0].number should be 10002`, function () {
            assert.strictEqual(modules[0].number, 10002)
        })

        it(`[0].version should be 6`, function () {
            assert.strictEqual(modules[0].version, 6)
        })

        it(`[0].title should be Digitale Signalverarbeitung (MSc-AKT 1-1) / (MA-SK 17) / (MA-DC WP3-16)`, function () {
            assert.strictEqual(modules[0].title, "Digitale Signalverarbeitung (MSc-AKT 1-1) / (MA-SK 17) / (MA-DC WP3-16)")
        })

        it(`[1].number should be 10003`, function () {
            assert.strictEqual(modules[1].number, 10003)
        })

        it(`[1].version should be 3`, function () {
            assert.strictEqual(modules[1].version, 3)
        })

        it(`[1].titel should be Deutsch als Zweitsprache (DaZ) - Grundlagenmodul`, function () {
            assert.strictEqual(modules[1].title, "Deutsch als Zweitsprache (DaZ) - Grundlagenmodul")
        })
    })

    describe('#getTitel(html)', function () {
        it(`should be Einführung in die Programmierung`, function () {
            assert.strictEqual(Modul.getTitle(module_html, 1), "Einführung in die Programmierung")
        })
    })

    describe('#getLernergebnisse(html)', function () {
        it(`should be Einführung in die Programmierung`, function () {
            assert.strictEqual(Modul.getLearningOutcomes(module_html, 1), 'Die Studierenden haben Grundkenntnisse der (imperativen) Programmierung sowie Kenntnisse der grundlegenden Datenstrukturen und Algorithmen.\r\n' +
                'Spezifischer:\r\n' +
                '* Studierende sind mit grundlegenden Konzepten von Programmiersprachen vertraut.\r\n' +
                '* Studierende können den Ablauf von Programmen nachvollziehen und selbst kleinere Programme entwickeln\r\n' +
                '* Studierende können die Komplexität (insbesondere die Laufzeit) von Algorithmen exakt (für einfache Beispiele) und asymptotisch (O-Notation) abschätzen.\r\n' +
                '* Studierende können Beweise zur Korrektheit von Programmen nachvollziehen und einfachere Beweise selbst führen.\r\n' +
                '* Studierende sind mit den Stärken und Schwächen von einfacheren und fortgeschritteneren Sortieralgorithmen vertraut und können mit diesem Wissen die Wahl eines geeigneten Sortieralgorithmus begründen.')
        })
    })

    describe('#getLehrinhalte(html)', function () {
        it(`should be Einführung in die Programmierung`, function () {
            assert.strictEqual(Modul.getContent(module_html, 1), 'In diesem Modul werden grundlegende Programmierkonzepte der imperativen Programmierung vermittelt:\r\n' +
                '* Grundlegende Konzepte von Programmiersprachen\r\n' +
                '* Verständnis des Ablaufs von Programmen\r\n' +
                '* Entwicklung kleinerer Programme\r\n' +
                '* Aufwandsabschätzungen (O-Notation)\r\n' +
                '* Korrektheit\r\n' +
                '* Suchen und Sortieren\r\n' +
                '\r\n' +
                'Innerhalb der ersten beiden Wochen des Semesters findet ein C-Kurs, bestehend aus Vorlesung, Tutorien und Rechnerübungen, statt. Im Rahmen dieses C-Kurses wird anhand praktischer Beispiele in die Programmierung mit C eingeführt.')
        })
    })

    describe('#getFaculty(html)', function () {
        it(`should be Fakultät IV`, function () {
            assert.strictEqual(Modul.getFaculty(module_html), "Fakultät IV")
        })
    })

    describe('#getOffice(html)', function () {
        it(`should be HFT 3`, function () {
            assert.strictEqual(Modul.getOffice(module_html), "HFT 3")
        })
    })

    describe('#getInstitute(html)', function () {
        it(`should be Institut für Telekommunikationssysteme`, function () {
            assert.strictEqual(Modul.getInstitute(module_html), "Institut für Telekommunikationssysteme")
        })
    })

    describe('#getAreaOfExpertise(html)', function () {
        it(`should be 34332300 FG Open Distributed Systems`, function () {
            assert.strictEqual(Modul.getAreaOfExpertise(module_html), "34332300 FG Open Distributed Systems")
        })
    })

    describe('#getResponsiblePerson(html)', function () {
        it(`should be Hauswirth, Manfred`, function () {
            assert.strictEqual(Modul.getResponsiblePerson(module_html), "Hauswirth, Manfred")
        })
    })

    describe('#getContactPerson(html)', function () {
        it(`should be Foucard, Damien Jean Marie Daniel`, function () {
            assert.strictEqual(Modul.getContactPerson(module_html), "Foucard, Damien Jean Marie Daniel")
        })
    })

    describe('#getEmail(html)', function () {
        it(`should be lehre@ods.tu-berlin.de`, function () {
            assert.strictEqual(Modul.getEmail(module_html), "lehre@ods.tu-berlin.de")
        })
    })
})