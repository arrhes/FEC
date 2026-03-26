import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { parseFlatFile } from "../../packages/engine/src/fec/parseFlatFile.js"

const SAMPLES_DIR = path.resolve(__dirname, "../../samples/txt")

function readSample(fileName: string): string {
    return readFileSync(path.join(SAMPLES_DIR, fileName), "utf-8")
}

// Available flat sample files
const FLAT_SAMPLES = [
    "0000000001FEC20220831.txt",
    "000000000FEC20231231.txt",
    "111111111FEC20221231.TXT",
    "123456789FEC20500930.txt",
]

describe("parseFlatFile", () => {
    describe("basic parsing for all sample files", () => {
        for (const fileName of FLAT_SAMPLES) {
            describe(fileName, () => {
                it("should return a FecParsedFile with fileType 'flat'", () => {
                    const content = readSample(fileName)
                    const result = parseFlatFile(content, fileName)

                    expect(result.fileType).toBe("flat")
                })

                it("should detect a valid separator (tab or pipe)", () => {
                    const content = readSample(fileName)
                    const result = parseFlatFile(content, fileName)

                    expect(["\t", "|"]).toContain(result.separator)
                })

                it("should parse headers as a non-empty array", () => {
                    const content = readSample(fileName)
                    const result = parseFlatFile(content, fileName)

                    expect(result.headers).toBeInstanceOf(Array)
                    expect(result.headers.length).toBeGreaterThanOrEqual(1)
                })

                it("should have at least 18 columns in the header", () => {
                    const content = readSample(fileName)
                    const result = parseFlatFile(content, fileName)

                    expect(result.headers.length).toBeGreaterThanOrEqual(18)
                })

                it("should parse at least one data entry", () => {
                    const content = readSample(fileName)
                    const result = parseFlatFile(content, fileName)

                    expect(result.entries.length).toBeGreaterThanOrEqual(1)
                })

                it("should have entries with keys matching headers", () => {
                    const content = readSample(fileName)
                    const result = parseFlatFile(content, fileName)

                    if (result.entries.length > 0) {
                        const firstEntry = result.entries[0]!
                        for (const header of result.headers) {
                            expect(firstEntry).toHaveProperty(header)
                        }
                    }
                })
            })
        }
    })

    describe("standard BIC column names", () => {
        const EXPECTED_COLUMNS = [
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

        for (const fileName of FLAT_SAMPLES) {
            it(`${fileName} should contain the 18 BIC columns in order`, () => {
                const content = readSample(fileName)
                const result = parseFlatFile(content, fileName)

                for (let i = 0; i < EXPECTED_COLUMNS.length; i++) {
                    expect(result.headers[i]?.toLowerCase()).toBe(EXPECTED_COLUMNS[i]!.toLowerCase())
                }
            })
        }
    })

    describe("edge cases", () => {
        it("should return an empty result for an empty string", () => {
            const result = parseFlatFile("", "empty.txt")

            expect(result.fileType).toBe("flat")
            expect(result.headers).toEqual([])
            expect(result.entries).toEqual([])
        })

        it("should return headers but no entries for a header-only file", () => {
            const headerLine = "JournalCode\tJournalLib\tEcritureNum\tEcritureDate\tCompteNum"
            const result = parseFlatFile(headerLine, "headeronly.txt")

            expect(result.headers.length).toBe(5)
            expect(result.entries).toEqual([])
        })

        it("should handle trailing empty lines", () => {
            const content = "A\tB\tC\tD\tE\n1\t2\t3\t4\t5\n\n\n"
            const result = parseFlatFile(content, "trailing.txt")

            expect(result.entries.length).toBe(1)
        })

        it("should handle pipe-separated files", () => {
            const content = "A|B|C|D|E\n1|2|3|4|5"
            const result = parseFlatFile(content, "pipe.txt")

            expect(result.separator).toBe("|")
            expect(result.headers).toEqual(["A", "B", "C", "D", "E"])
            expect(result.entries.length).toBe(1)
        })

        it("should trim header and value whitespace", () => {
            const content = " A \t B \t C \t D \t E \n 1 \t 2 \t 3 \t 4 \t 5 "
            const result = parseFlatFile(content, "whitespace.txt")

            expect(result.headers[0]).toBe("A")
            expect(result.entries[0]!["A"]).toBe("1")
        })
    })
})
