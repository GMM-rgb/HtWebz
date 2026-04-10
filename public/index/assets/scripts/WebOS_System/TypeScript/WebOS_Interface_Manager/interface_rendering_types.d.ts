declare type FullscreenTypes = "fullscreen" | "windowed";
declare type InterfaceWindowData = {
    logical?: {
        TitleName: string;
    };
    sizing?: {
        height: typeof DOMRect.prototype.x;
        width: typeof DOMRect.prototype.y;
    };
    toolbar?: {
        TOOLBAR_ENABLED?: boolean;
        _enabled_elements?: {
            title?: boolean;
            controls?: boolean;
        };
    };
    visual?: {
        FullscreenKind?: FullscreenTypes;
        MinimizedWindow?: boolean;
        ClosingWindow?: boolean;
    };
};

declare type WindowConstructorObject = {

}

declare abstract class OS_RenderingSystemControler {
    /**
     * ---
     * Displays an interactive window, within the rendering event DOM controler. 
     * 
     * ---
     * @param WindowInterfaceConstructionData 
     */
    GenerateWindowDisplay(WindowInterfaceConstructionData: InterfaceWindowData): void;
}

declare abstract class _WebOS_UI_KitReference {
    static WindowConstructor<RenderingDataConstructor>(): InterfaceWindowData;
}
