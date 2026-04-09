/// <reference path="../../file_system_data_types.d.ts" />
// file system memmory concurrent varaible data
let FileSystemData: FileSystemOverviewDataType = {
    SystemFolderCount: 0 as number,
    SystemFileCount: 0 as number,
    DirectoryMapping: {
        "folders": [],
        "files": [],
    },
};
// ...
let _DirectoryMappingConversion = {
    "FILE": "files",
    "DIRECTORY": "folders",
} as const;
// ...
class FileSystemObjectBoilerplate implements FileSystemBoilerplateReferenceType {
    static FileSystemDataObjectBuilder(DataParameters: DataObjectBoilerplateParameters): FileTypes[0] | FileTypes[1] | null {
        let InstancedDataObject: FileTypes[0] | FileTypes[1] | null = null;

        function ReceivedDataHas(): boolean {
            let RequestedCheckValid = false;

            return RequestedCheckValid ?? false;
        }

        if (DataParameters !== undefined && (typeof (DataParameters)) === "object") {

        }

        return InstancedDataObject;
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
        const SelectedMappingArray = FileSystemData.DirectoryMapping[_DirectoryMappingConversion[ReferenceType]];
        let FetchedFileSystemData = null as FileTypes[0] | FileTypes[1] | null;
        let FetchFrameID: number = 0;

        function ValidDataCategoryLength(): number {
            let ValidLength: number = parseFloat("0");

            return ValidLength ?? Number(0).valueOf();
        }

        function ExecuteFileSystemDataFetch(): void {
            try {
                for (let FileSystemIndex: number = 0; FileSystemIndex; FileSystemIndex++) {

                }
            } catch (FileSystemDataFetchFailure) {
                if (FileSystemDataFetchFailure !== undefined) { console.error(String(FileSystemDataFetchFailure ?? null).trim()); }
                FetchFrameID !== null ? cancelAnimationFrame(FetchFrameID) : void null;
            }
        }

        if (ReferenceType.toString() as ValidDataTypes[0] === "FILE" || ReferenceType.toString() as ValidDataTypes[1] === "DIRECTORY") {
            FetchFrameID = requestAnimationFrame(() => ExecuteFileSystemDataFetch());
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
