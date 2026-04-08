/// <reference path="../../file_system_data_types.d.ts" />
// file system memmory concurrent varaible data
let FileSystemData: FileSystemOverviewDataType = {
    SystemFolderCount: 0 as number,
    SystemFileCount: 0 as number,
    DirectoryMapping: {
        "Folders": [],
        "Files": [],
    },
};
// ...
class FileSystemObjectBoilerplate implements FileSystemBoilerplateReferenceType {
    static FileSystemDataObjectBuilder(DataParameters: DataObjectBoilerplateParameters): FileTypes[0] | FileTypes[1] {
        
        return;
    }
}
/**
 * ---
 * Template file system Object core component for the virtual WebOS.
 */
class FileSystemWebOS extends FileSystemObjectBoilerplate implements FileSystemReference {
    /**
     * ---
     * File system Object core component for the virtual WebOS.
     * @param RequestedLocalFileSystemID 
     */
    constructor(private RequestedLocalFileSystemID: String) { super(); }

    static FetchData(ReferenceType: ValidDataTypes[1]): _FileSystemControl_Directory;
    static FetchData(ReferenceType: ValidDataTypes[0]): _FileSystemControl_File;

    public static FetchData(ReferenceType: ValidDataTypes[0] | ValidDataTypes[1]): FileTypes[0] | FileTypes[1] | undefined {
        let FetchedFileSystemData = null as FileTypes[0] | FileTypes[1] | null;

        if (ReferenceType.toString() as ValidDataTypes[0] === "FILE" || ReferenceType.toString() as ValidDataTypes[1] === "DIRECTORY") {
            try {
                for (let FileSystemObjectIndex = 0; FileSystemObjectIndex; FileSystemObjectIndex++) {

                }
            } catch (FileSystemDataFetchFailure) {
                console.error(String(FileSystemDataFetchFailure ?? null).trim());
            }
        } else {
            console.warn();
        }

        return FetchedFileSystemData ?? undefined;
    }

    public NewDataCommit(FileSystemDataObject: _FileSystemControl_Directory | _FileSystemControl_File): void {

    }

    public StartFileSystem(FileSystemID: string = this.RequestedLocalFileSystemID.valueOf()): void {
        if (FileSystemID !== undefined && typeof (FileSystemID) === "string") {

        }
    }
}

// FileSystemWebOS.FetchData("FILE");
