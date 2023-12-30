export namespace Tag {
    /** Refers to the imprinted name, like "A" */
    export type name = 'A' | 'B' | 'C' | 'D' | 'F';
    /** Refers to the n-th of the tags, like 1 */
    export type code = number;
    /** Refers to the actual RFID itself, shouldnt be published */
    export type id = number;
}
