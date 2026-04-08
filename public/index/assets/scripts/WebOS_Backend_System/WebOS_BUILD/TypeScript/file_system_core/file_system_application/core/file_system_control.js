"use strict";
let FileSystemData = {
    DirectoryMapping: new Object({}).valueOf(),
    SystemFolderCount: 0,
    SystemFileCount: 0,
};
class FileSystemWebOS {
    RequestedLocalFileSystemID;
    constructor(RequestedLocalFileSystemID) {
        this.RequestedLocalFileSystemID = RequestedLocalFileSystemID;
    }
    static FetchData(ReferenceType) {
        let FetchedFileSystemData = null;
        if (ReferenceType.toString() === "FILE" || ReferenceType.toString() === "DIRECTORY") {
            try {
            }
            catch (FileSystemDataFetchFailure) {
                console.error(String(FileSystemDataFetchFailure ?? null).trim());
            }
        }
        else {
            console.warn();
        }
        return FetchedFileSystemData ?? undefined;
    }
    NewDataCommit(FileSystemDataObject) {
    }
    StartFileSystem(FileSystemID = this.RequestedLocalFileSystemID.valueOf()) {
        if (FileSystemID !== undefined && typeof (FileSystemID) === "string") {
        }
    }
}
//# sourceMappingURL=file_system_control.js.map