declare type FileSystemDirectory = {
    name: String;
    DirectoryParent?: FileSystemDirectory;
};

declare type FileSystemStandardFile = {
    namme: String;
};

declare abstract class FileSystemReference {
    constructor()
    public StartFileSystem(FileSystemID?: string): void;
}
