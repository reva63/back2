export interface IFile {
    fieldname?: string;
    encoding?: string;
    originalname: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
