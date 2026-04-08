declare type FileSystemDirectory = {
    name: String;
    DirectoryParent?: FileSystemDirectory;
};

declare type FileSystemStandardFile = {
    namme: String;
};

declare type FileSystemOverviewDataType = {
    FolderCount: number;
    
};

declare abstract class FileSystemReference {
    constructor()
    public StartFileSystem(FileSystemID?: string): void;
}
