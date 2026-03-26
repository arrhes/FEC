export type {
    FecCheckSeverity,
    FecCheckResult,
    FecValidationSummary,
    FecValidationResult,
    FecColumnDefinition,
    FecEntry,
    FecParsedFile,
    FecParsedLineIssue,
} from "./types.js"

export { BIC_COLUMNS, BIC_COLUMN_NAMES } from "./types.js"

export { parseFlatFile } from "./parseFlatFile.js"
export { parseXmlFile } from "./parseXmlFile.js"
export { validateFecFile } from "./validate.js"

export {
    checkFileName,
    checkHeaderPresence,
    checkColumnOrder,
    checkColumnCount,
    checkSeparator,
    checkDateFormat,
    checkNumericFormat,
    checkCompteNum,
    checkMandatoryFields,
    checkDebitCredit,
    checkSensValues,
    checkChronologicalOrder,
    checkEcritureNumSequence,
    checkOpeningEntries,
    checkDebitCreditBalance,
    checkEncoding,
    checkEmptyFile,
    checkDateValidity,
    checkPieceDateCoherence,
    checkFieldCountMismatch,
    checkEmptyLines,
    checkDebitCreditExclusive,
    checkNumericDotSeparator,
    checkNumericThousandsSeparator,
    checkDateYearRange,
} from "./checks.js"
