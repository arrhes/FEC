/**
 * FEC (Fichier des Ecritures Comptables) type definitions.
 *
 * Conforme a l'article A47 A-1 du Livre des procedures fiscales.
 * Defines the structure, column layout and validation result types
 * for both flat-file (TSV/pipe) and XML FEC formats.
 */

// ---------------------------------------------------------------------------
// Validation types
// ---------------------------------------------------------------------------

export type FecCheckSeverity = "error" | "warning"

export type FecCheckResult = {
    /** Unique check identifier, e.g. "FILE_NAME", "HEADER_PRESENCE". */
    id: string
    severity: FecCheckSeverity
    /** French description of the issue. */
    message: string
    /** 1-based line number where the issue was found. */
    line?: number
    /** Column name, when the issue is tied to a specific field. */
    field?: string
}

export type FecValidationSummary = {
    errors: number
    warnings: number
    /** Total number of checks that were run. */
    total: number
    /** Total data lines (rows) parsed from the file. */
    lines: number
}

export type FecValidationResult = {
    fileName: string
    fileType: "flat" | "xml"
    checks: FecCheckResult[]
    summary: FecValidationSummary
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------

export type FecColumnDefinition = {
    /** Technical column name, e.g. "JournalCode". */
    name: string
    /** French description of the column. */
    description: string
    /** Maximum character length if specified, otherwise undefined. */
    maxLength: number | undefined
    /** Whether the column is mandatory in a valid FEC. */
    mandatory: boolean
    type: "text" | "date" | "numeric"
}

/**
 * The 18 columns required for the BIC (Benefices Industriels et Commerciaux)
 * regime, in the exact order defined by the specification.
 *
 * Debit and Credit are marked mandatory because the Debit/Credit pair is the
 * default representation for BIC files (the alternative Montant/Sens pair is
 * not part of this column set).
 */
export const BIC_COLUMNS: readonly FecColumnDefinition[] = [
    {
        name: "JournalCode",
        description: "Code journal de l'ecriture comptable",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "JournalLib",
        description: "Libelle journal de l'ecriture comptable",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "EcritureNum",
        description: "Numero sur une sequence continue de l'ecriture comptable",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "EcritureDate",
        description: "Date de comptabilisation de l'ecriture comptable",
        maxLength: undefined,
        mandatory: true,
        type: "date",
    },
    {
        name: "CompteNum",
        description: "Numero de compte (les 3 premiers caracteres doivent correspondre a des chiffres)",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "CompteLib",
        description: "Libelle de compte",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "CompAuxNum",
        description: "Numero de compte auxiliaire",
        maxLength: undefined,
        mandatory: false,
        type: "text",
    },
    {
        name: "CompAuxLib",
        description: "Libelle de compte auxiliaire",
        maxLength: undefined,
        mandatory: false,
        type: "text",
    },
    {
        name: "PieceRef",
        description: "Reference de la piece justificative",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "PieceDate",
        description: "Date de la piece justificative",
        maxLength: undefined,
        mandatory: true,
        type: "date",
    },
    {
        name: "EcritureLib",
        description: "Libelle de l'ecriture comptable",
        maxLength: undefined,
        mandatory: true,
        type: "text",
    },
    {
        name: "Debit",
        description: "Montant au debit",
        maxLength: undefined,
        mandatory: true,
        type: "numeric",
    },
    {
        name: "Credit",
        description: "Montant au credit",
        maxLength: undefined,
        mandatory: true,
        type: "numeric",
    },
    {
        name: "EcritureLet",
        description: "Lettrage de l'ecriture comptable",
        maxLength: undefined,
        mandatory: false,
        type: "text",
    },
    {
        name: "DateLet",
        description: "Date de lettrage",
        maxLength: undefined,
        mandatory: false,
        type: "date",
    },
    {
        name: "ValidDate",
        description: "Date de validation de l'ecriture comptable",
        maxLength: undefined,
        mandatory: true,
        type: "date",
    },
    {
        name: "Montantdevise",
        description: "Montant en devise (le cas echeant)",
        maxLength: undefined,
        mandatory: false,
        type: "numeric",
    },
    {
        name: "Idevise",
        description: "Identifiant de la devise (le cas echeant)",
        maxLength: undefined,
        mandatory: false,
        type: "text",
    },
] as const

/** Ordered list of BIC column names derived from BIC_COLUMNS. */
export const BIC_COLUMN_NAMES: string[] = BIC_COLUMNS.map((col) => col.name)

// ---------------------------------------------------------------------------
// Parsed data types
// ---------------------------------------------------------------------------

/** A single parsed FEC row represented as column-name / value pairs. */
export type FecEntry = Record<string, string>

/** A line that was skipped or had issues during parsing. */
export type FecParsedLineIssue = {
    /** 1-based line number in the source file. */
    line: number
    /** The kind of issue found. */
    kind: "empty" | "field_count_mismatch"
    /** Expected field count (for field_count_mismatch). */
    expectedFields?: number
    /** Actual field count (for field_count_mismatch). */
    actualFields?: number
}

export type FecParsedFile = {
    fileType: "flat" | "xml"
    headers: string[]
    entries: FecEntry[]
    /** Field separator for flat files (e.g. "\t", "|"). */
    separator?: string
    /** Detected or declared file encoding (e.g. "UTF-8", "ISO-8859-1"). */
    encoding?: string
    /** Lines that had structural issues during parsing. */
    lineIssues?: FecParsedLineIssue[]
}
