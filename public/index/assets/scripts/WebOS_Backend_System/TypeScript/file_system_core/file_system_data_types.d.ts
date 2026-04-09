declare type _FileSystemControl_Directory = {
    name: String;
    ParentDirectory?: _FileSystemControl_Directory;
};

declare type _FileSystemControl_File = {
    name: String;
    InnerContentData: StringIterator<string>
    ParentDirectory: _FileSystemControl_Directory;
};

declare type FileSystemOverviewDataType = {
    SystemFolderCount?: number;
    SystemFileCount?: number;
    DirectoryMapping: {
        "folders": _FileSystemControl_Directory[];
        "files": _FileSystemControl_File[];
    };
};

declare type DataObjectBoilerplateParameters = {
    FileDataType: ValidDataTypes[0] | ValidDataTypes[1];
};

type ValidDataTypes = ["FILE", "DIRECTORY"];
type FileTypes = [_FileSystemControl_Directory, _FileSystemControl_File];

declare abstract class FileSystemBoilerplateReferenceType {
    static FileSystemDataObjectBuilder(DataParameters: DataObjectBoilerplateParameters): FileTypes[0] | FileTypes[1];
}

declare abstract class FileSystemReference {
    // `FetchData` overload types info definitions
    static FetchData(ReferenceType: ValidDataTypes[1]): _FileSystemControl_Directory;
    static FetchData(ReferenceType: ValidDataTypes[0]): _FileSystemControl_File;
    /**
     * 
     * @param ReferenceType 
     */
    static FetchData(ReferenceType: ValidDataTypes[0] | ValidDataTypes[1]): FileTypes[0] | FileTypes[1] | undefined;
    /**
     * 
     * @param FileSystemDataObject 
     */
    public NewDataCommit(FileSystemDataObject: _FileSystemControl_Directory | _FileSystemControl_File): void;
    public StartFileSystem(FileSystemID?: string): void;
}
