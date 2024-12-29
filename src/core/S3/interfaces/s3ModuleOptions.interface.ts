export interface S3ModuleOptions {
    credentials: {
        accessKeyId: string | undefined;
        secretAccessKey: string | undefined;
    };
    endpoint: string | undefined;
    region: string | undefined;
}
