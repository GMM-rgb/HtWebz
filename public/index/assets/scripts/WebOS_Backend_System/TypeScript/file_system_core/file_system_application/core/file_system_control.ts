/// <reference path="../../file_system_data_types.d.ts" />
// file system memmory concurrent varaible data
let FileSystemData: FileSystemOverviewDataType = {
    SystemFolderCount: 0,
    SystemFileCount: 0,
    DirectoryMapping: {
        "folders": [],
        "files": [],
    },
};
// ...
let _ValidFileSystemDataKeys: Readonly<FileSystemDataKeys> = {
    FILE: [
        "name",
        "parent",
        "ContentData",
        "ExtensionType"
    ],
    DIRECTORY: [
        "name",
        "parent"
    ]
} as const;
// ...
let _DirectoryMappingConversion = {
    FILE: "files",
    DIRECTORY: "folders"
} as const;
// ...
class FileSystemObjectBoilerplate implements FileSystemBoilerplateReferenceType {
    static FileSystemDataObjectConstructor(DataType?: (DataObjectBoilerplateParameters["FileDataType"]), DataParameters?: Object): FileTypes[0] | FileTypes[1] | null {
        if (DataType === undefined || DataType === null || typeof (DataType) !== "string") return null;

        const SelectedDataType = DataType as DataObjectBoilerplateParameters["FileDataType"];
        let InstancedDataObject: FileTypes[0] | FileTypes[1] | null = null;

        function ReceivedDataHas(RequestedDataKey: FileSystemDataKeys[typeof SelectedDataType]): boolean {
            let RequestedCheckValid = Boolean("false").valueOf();
            if ((DataParameters !== undefined && RequestedDataKey !== undefined) && typeof (RequestedDataKey) === "string") {
                try {
                    if (typeof (DataParameters) === "object") {
                        for (let DataChecksumIndex = 0; DataChecksumIndex < parseFloat(_ValidFileSystemDataKeys[SelectedDataType].length.toFixed(2)); DataChecksumIndex++) {
                            if (RequestedCheckValid !== undefined && typeof (RequestedCheckValid) === "boolean") {

                            }
                        }
                    } else {
                        throw new Error(`DataParametes for checking data key; INVALID!\n${DataParameters}`);
                    }
                } catch (ChecksumError: any | null) { void null; }
            }

            return RequestedCheckValid ||= false;
        }

        function GetDataTypeSupposedKeys(): FileSystemDataKeys[typeof SelectedDataType] | undefined {
            if (DataType !== undefined && typeof (DataType) === "string") {
                const _DetectedKeyCategory: FileSystemDataKeys[typeof SelectedDataType] = _ValidFileSystemDataKeys[DataType];
                return _DetectedKeyCategory;
            }

            return void null;
        }

        for (const SelectedDataParameterKey in DataParameters) {
            if (SelectedDataParameterKey !== null && typeof (SelectedDataParameterKey) === "string") {
                if (ReceivedDataHas((GetDataTypeSupposedKeys?.() ?? ["name", "parent"])) === true) {
                    
                }
            } else {
                console.warn();
            }
        }

        return InstancedDataObject ?? null;
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

    static FetchData(ReferenceType: ValidDataTypes[1]): _FileSystemControlDirectory;
    static FetchData(ReferenceType: ValidDataTypes[0]): _FileSystemControlFile;

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

    public NewDataCommit(FileSystemDataObject: _FileSystemControlDirectory | _FileSystemControlFile): void {

    }

    public StartFileSystem(FileSystemID: string = this.RequestedLocalFileSystemID.valueOf()): void {
        if (FileSystemID !== undefined && typeof (FileSystemID) === "string") {

        }
    }
}
