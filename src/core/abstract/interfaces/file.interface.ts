export interface IFile {
    fieldname?: string;
    encoding?: string;
    originalName: string;
    mimetype: string;
    size: number;
    buffer?: Buffer;
    arrayBuffer?: ArrayBuffer;
}
