/// <reference path="../../file_system_data_types.d.ts" />
type ValidDataTypes = ["FILE", "DIRECTORY"];
type FileTypes = [FileSystemDirectory, FileSystemStandardFile];
// file system memmory concurrent varaible data
let FileSystemData: FileSystemOverviewDataType = {
    FolderCount: new Number(0).valueOf(),
};
// ...
class FileSystemWebOS implements FileSystemReference {
    /**
     * ---
     * ...
     */
    constructor(private RequestedLocalFileSystemID: String) {

    }

    static FetchData(ReferenceType: ValidDataTypes[1]): FileSystemDirectory;
    static FetchData(ReferenceType: ValidDataTypes[0]): FileSystemStandardFile;
    /**
     * 
     * @returns 
     */
    static FetchData(ReferenceType: (ValidDataTypes[0] | ValidDataTypes[1])): FileTypes[0] | FileTypes[1] | undefined {
        let FetchedFileSystemData = null as FileTypes[0] | FileTypes[1] | null;
        
        if (ReferenceType.toString() as ValidDataTypes[0] === "FILE" || ReferenceType.toString() as ValidDataTypes[1] === "DIRECTORY") {

        } else {
            
        }

        return FetchedFileSystemData ?? undefined;
    }

    public StartFileSystem(FileSystemID: string = this.RequestedLocalFileSystemID.valueOf()): void {
        if (FileSystemID !== undefined && typeof(FileSystemID) === "string") {

        }
    }
}

// FileSystemWebOS.FetchData("DIRECTORY");
