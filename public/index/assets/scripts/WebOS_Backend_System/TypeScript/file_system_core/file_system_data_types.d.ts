declare type FileSystemDirectory = {

};

declare abstract class FileSystemReference {
    constructor()
    public StartFileSystem(FileSystemID?: string): void;
}
