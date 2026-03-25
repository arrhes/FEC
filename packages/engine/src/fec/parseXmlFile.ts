import type { FecEntry, FecParsedFile } from "./types.js"

const HEADERS: readonly string[] = [
    "JournalCode",
    "JournalLib",
    "EcritureNum",
    "EcritureDate",
    "CompteNum",
    "CompteLib",
    "CompAuxNum",
    "CompAuxLib",
    "PieceRef",
    "PieceDate",
    "EcritureLib",
    "Debit",
    "Credit",
    "EcritureLet",
    "DateLet",
    "ValidDate",
    "Montantdevise",
    "Idevise",
]

function getChildText(parent: Element, tagName: string): string {
    const el = parent.querySelector(tagName)
    return el?.textContent?.trim() ?? ""
}

export function parseXmlFile(content: string, fileName: string): FecParsedFile {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "application/xml")

    const entries: FecEntry[] = []

    const journals = doc.querySelectorAll("journal")

    for (const journal of journals) {
        const journalCode = getChildText(journal, "JournalCode")
        const journalLib = getChildText(journal, "JournalLib")

        const ecritures = journal.querySelectorAll("ecriture")

        for (const ecriture of ecritures) {
            const ecritureNum = getChildText(ecriture, "EcritureNum")
            const ecritureDate = getChildText(ecriture, "EcritureDate")
            const ecritureLet = getChildText(ecriture, "EcritureLet")
            const dateLet = getChildText(ecriture, "DateLet")
            const validDate = getChildText(ecriture, "ValidDate")

            const lignes = ecriture.querySelectorAll("ligne")

            for (const ligne of lignes) {
                const compAuxNum =
                    getChildText(ligne, "CompAuxNum") ||
                    getChildText(ligne, "CompteAuxNum")
                const compAuxLib =
                    getChildText(ligne, "CompAuxLib") ||
                    getChildText(ligne, "CompteAuxLib")

                const entry: FecEntry = {
                    JournalCode: journalCode,
                    JournalLib: journalLib,
                    EcritureNum: ecritureNum,
                    EcritureDate: ecritureDate,
                    CompteNum: getChildText(ligne, "CompteNum"),
                    CompteLib: getChildText(ligne, "CompteLib"),
                    CompAuxNum: compAuxNum,
                    CompAuxLib: compAuxLib,
                    PieceRef: getChildText(ligne, "PieceRef"),
                    PieceDate: getChildText(ligne, "PieceDate"),
                    EcritureLib: getChildText(ligne, "EcritureLib"),
                    Debit: getChildText(ligne, "Debit"),
                    Credit: getChildText(ligne, "Credit"),
                    EcritureLet: ecritureLet,
                    DateLet: dateLet,
                    ValidDate: validDate,
                    Montantdevise: getChildText(ligne, "Montantdevise"),
                    Idevise: getChildText(ligne, "Idevise"),
                }

                entries.push(entry)
            }
        }
    }

    return {
        fileType: "xml",
        headers: [...HEADERS],
        entries,
    }
}
