declare type ExtensionKeys = [
    "txt",
];

type PersistentDataKeyStrings = ["name", "parent"];
declare type FileSystemDataKeys = {
    FILE: [
        PersistentDataKeyStrings["0"],
        PersistentDataKeyStrings["1"],
        "ContentData",
        "ExtensionType",
    ];
    DIRECTORY: [
        PersistentDataKeyStrings["0"],
        PersistentDataKeyStrings["1"],
    ];
};

declare type _FileSystemControlDirectory = {
    name: String;
    parent?: _FileSystemControlDirectory;
};

declare type _FileSystemControlFile = {
    name: String;
    parent?: _FileSystemControlDirectory;
    ContentData?: StringIterator<string>;
    ExtensionType?: ExtensionKeys;
};

declare type FileSystemOverviewDataType = {
    SystemFolderCount?: number;
    SystemFileCount?: number;
    DirectoryMapping: {
        "folders": _FileSystemControlDirectory[];
        "files": _FileSystemControlFile[];
    };
};

declare type DataObjectBoilerplateParameters = {
    FileDataType: ValidDataTypes[0] | ValidDataTypes[1];
};

type ValidDataTypes = ["FILE", "DIRECTORY"];
type FileTypes = [_FileSystemControlDirectory, _FileSystemControlFile];

declare abstract class FileSystemBoilerplateReferenceType {
    static FileSystemDataObjectBuilder(DataParameters: DataObjectBoilerplateParameters): FileTypes[0] | FileTypes[1];
}

declare abstract class FileSystemReference {
    // `FetchData` overload types info definitions
    static FetchData(ReferenceType: ValidDataTypes[1]): _FileSystemControlDirectory;
    static FetchData(ReferenceType: ValidDataTypes[0]): _FileSystemControlFile;
    /**
     * 
     * @param ReferenceType 
     */
    static FetchData(ReferenceType: ValidDataTypes[0] | ValidDataTypes[1]): FileTypes[0] | FileTypes[1] | undefined;
    /**
     * 
     * @param FileSystemDataObject 
     */
    public NewDataCommit(FileSystemDataObject: _FileSystemControlDirectory | _FileSystemControlFile): void;
    public StartFileSystem(FileSystemID?: string): void;
}
