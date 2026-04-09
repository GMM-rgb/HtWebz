declare type NavigationToolbarElements = {
    AccountProfileElement?: boolean,
    AppButtonElement?: boolean,
    SettingsButtonElement?: boolean,
    PageTitleElement?: boolean,
    ReturnHomepageElement?: boolean,
    SearchInterface?: boolean,
};

declare type ValidNavigationElements = (
    "AccountProfiler" |
    "AppButton" |
    "SettingsButton" |
    "PageTitle" |
    "ReturnHomepage" |
    "SearchInterface"
)[];

let CurrentLayoutControlerNames = [];
let ActiveLayoutControlers: LayoutControler[] = new Array(0);
let AvailableNavigationElements = new Array(0);
let ValidNavigationElements = [
    "AccountProfiler",
] as const;

class LayoutControler {
    constructor(private LayoutControlerAtributeName: string) { }
    /**
     * ---
     * ...
     */
    CommitNavigationToolbarElement(RequestedNavigationElements: NavigationToolbarElements | undefined = undefined): void {
        if (RequestedNavigationElements !== undefined && typeof (RequestedNavigationElements) === "object") {
            let RequestedElementAmount: number = 0;
            let CurrentElementIndex: number = parseFloat("0");
            let RequestedElementStrings: any[] = new Array(0);
            // ...
            for (const _RequestedElement in RequestedNavigationElements) {
                RequestedElementAmount = Math.ceil(Math.abs(RequestedElementAmount)) + 1;
                RequestedElementStrings.push(_RequestedElement.toString?.() ?? null);
                // console.debug(_RequestedElement);
            }

            for (let NavigiationElementIndex = new Number(0).valueOf(); NavigiationElementIndex; NavigiationElementIndex++) {

            }
        } else {
            console.error(`Failed to commit navigation toolbar elements; Request input was undefined, or incorrect type reference.\nReceived Value Type:${String(typeof (RequestedNavigationElements)).trim()}`);
        }
    }
}

new LayoutControler("test").CommitNavigationToolbarElement({ AppButtonElement: true });
