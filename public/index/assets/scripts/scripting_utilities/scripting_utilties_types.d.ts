declare interface ValueCheckingFetch {

}

declare type QueryValuesTemplateKeys = 
    "DisplayName" | 
    "ChecksValue" |
    "RealValue";

declare type QueryTemplateKeyTypes = {
    ChecksValue?: boolean;
    DisplayName?: string;
    RealValue: any;
};

declare type LiteralTypeKeys = QueryTemplateKeyTypes;
declare type QueriedValuesTemplate = LiteralTypeKeys[];

export {
    QueriedValuesTemplate,
    ValueCheckingFetch,
};
