const assert = require('assert')
const fs = require('fs')

const Modul = require('../Moses/Modul')

const modules_html = fs.readFileSync("./test/modules.html").toString()
const module_html = fs.readFileSync("./test/module.html").toString()

const modules = Modul.getModules(modules_html)
describe('Modul', function () {
    describe('#getModules(html)', function () {
        it(`[0].number should be 50830`, function () {
            assert.strictEqual(modules[0].number, '50830')
        })
        it(`[0].version should be 2`, function () {
            assert.strictEqual(modules[0].version, '2')
        })
        it(`[0].titel should be 3D Druck in der Mechanik`, function () {
            assert.strictEqual(modules[0].titel, "3D Druck in der Mechanik")
        })
        it(`[1].number should be 50830`, function () {
            assert.strictEqual(modules[1].number, '61080')
        })
        it(`[1].version should be 2`, function () {
            assert.strictEqual(modules[1].version, '2')
        })
        it(`[1].titel should be 3D-Modellierung und Visualisierung`, function () {
            assert.strictEqual(modules[1].titel, "3D-Modellierung und Visualisierung")
        })
    })
    describe('#getTitel(html)', function () {
        it(`should be Einführung in die Programmierung`, function () {
            assert.strictEqual(Modul.getTitel(module_html), "Einführung in die Programmierung")
        })
    })
    describe('#getLernergebnisse(html)', function () {
        it(`should be Einführung in die Programmierung`, function () {
            assert.strictEqual(Modul.getLernergebnisse(module_html), 'Die Studierenden haben Grundkenntnisse der (imperativen) Programmierung sowie Kenntnisse der grundlegenden Datenstrukturen und Algorithmen.\r\n' +
                'Spezifischer:\r\n' +
                '* Studierende sind mit grundlegenden Konzepten von Programmiersprachen vertraut.\r\n' +
                '* Studierende können den Ablauf von Programmen nachvollziehen und selbst kleinere Programme entwickeln\r\n' +
                '* Studierende können die Komplexität (insbesondere die Laufzeit) von Algorithmen exakt (für einfache Beispiele) und asymptotisch (O-Notation) abschätzen.\r\n' +
                '* Studierende können Beweise zur Korrektheit von Programmen nachvollziehen und einfachere Beweise selbst führen.\r\n' +
                '* Studierende sind mit den Stärken und Schwächen von einfacheren und fortgeschritteneren Sortieralgorithmen vertraut und können mit diesem Wissen die Wahl eines geeigneten Sortieralgorithmus begründen.</span>')
        })
    })
    describe('#getLehrinhalte(html)', function () {
        it(`should be Einführung in die Programmierung`, function () {
            assert.strictEqual(Modul.getLehrinhalte(module_html), 'In diesem Modul werden grundlegende Programmierkonzepte der imperativen Programmierung vermittelt:\r\n' +
                '* Grundlegende Konzepte von Programmiersprachen\r\n' +
                '* Verständnis des Ablaufs von Programmen\r\n' +
                '* Entwicklung kleinerer Programme\r\n' +
                '* Aufwandsabschätzungen (O-Notation)\r\n' +
                '* Korrektheit\r\n' +
                '* Suchen und Sortieren\r\n' +
                '\r\n' +
                'Innerhalb der ersten beiden Wochen des Semesters findet ein C-Kurs, bestehend aus Vorlesung, Tutorien und Rechnerübungen, statt. Im Rahmen dieses C-Kurses wird anhand praktischer Beispiele in die Programmierung mit C eingeführt.</span>')
        })
    })
    describe('#getFakultaet(html)', function () {
        it(`should be Fakultät IV`, function () {
            assert.strictEqual(Modul.getFakultaet(module_html), "Fakultät IV")
        })
    })
    describe('#getSekretariat(html)', function () {
        it(`should be HFT 3`, function () {
            assert.strictEqual(Modul.getSekretariat(module_html), "HFT 3")
        })
    })
    describe('#getInstitut(html)', function () {
        it(`should be Institut für Telekommunikationssysteme`, function () {
            assert.strictEqual(Modul.getInstitut(module_html), "Institut für Telekommunikationssysteme")
        })
    })
    describe('#getFachgebiet(html)', function () {
        it(`should be 34332300 FG Open Distributed Systems`, function () {
            assert.strictEqual(Modul.getFachgebiet(module_html), "34332300 FG Open Distributed Systems")
        })
    })
    describe('#getVerantwortlich(html)', function () {
        it(`should be Hauswirth, Manfred`, function () {
            assert.strictEqual(Modul.getVerantwortlich(module_html), "Hauswirth, Manfred")
        })
    })
    describe('#getAnsprechpartner(html)', function () {
        it(`should be Foucard, Damien Jean Marie Daniel`, function () {
            assert.strictEqual(Modul.getAnsprechpartner(module_html), "Foucard, Damien Jean Marie Daniel")
        })
    })
    describe('#getEmail(html)', function () {
        it(`should be lehre@ods.tu-berlin.de`, function () {
            assert.strictEqual(Modul.getEmail(module_html), "lehre@ods.tu-berlin.de")
        })
    })
})