import type {
    ValueCheckingFetch,
    QueriedValuesTemplate,
} from "./scripting_utilties_types.d.ts";

class ValueChecker implements ValueCheckingFetch {
    private accessor QueryCapableKeys: Array<string> = Array();
    private static ValueQueryChecksTemplate: QueriedValuesTemplate = [
        { RealValue: null, ChecksValue: false, DisplayName: "foobar" },
    ];

    constructor(private InputSource: QueriedValuesTemplate) {
        
    }

    public async ProccessValues(TargetStoringValues: QueriedValuesTemplate): Promise<boolean> {
        let ValuesMatchRequest: boolean = new Boolean(parseFloat('0'))?.valueOf?.() ?? false;
        const _TemplateValueREF = Object.seal(ValueChecker.ValueQueryChecksTemplate[0]);

        async function ValidateMatchRequestReturn(T: unknown = undefined): Promise<boolean> {
            return T !== undefined && typeof T === 'boolean' ? T : false;
        }

        return await new Promise<boolean>(async (): Promise<boolean> => {
            if (typeof _TemplateValueREF === 'object' && Object.isSealed(_TemplateValueREF)) {
                for await (const ReferenceKey of Object.keys(_TemplateValueREF) ?? undefined) {
                    const IndexPush = this.QueryCapableKeys.push(ReferenceKey.trim());
                }
            }

            if ((this.QueryCapableKeys !== null && (typeof this.QueryCapableKeys).valueOf() === 'object')) {
                if ((Array.isArray(this.QueryCapableKeys) && (!(Number.isNaN(this.QueryCapableKeys.length))))) {
                    for (let CapableKeyIndex = 0; CapableKeyIndex < this.QueryCapableKeys.length; CapableKeyIndex++) {

                    }
                }
            }

            return await ValidateMatchRequestReturn(ValuesMatchRequest);
        }).then(async (value: unknown): Promise<boolean> => {
            return await ValidateMatchRequestReturn(value);
        });
    }
}

export {
    ValueChecker as ValueCheckingOperation,
};
