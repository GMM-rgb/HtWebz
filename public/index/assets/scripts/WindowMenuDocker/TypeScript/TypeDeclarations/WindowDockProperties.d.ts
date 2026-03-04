type DockPositionX = typeof DOMRect.prototype.x;
type DockPositionY = typeof DOMRect.prototype.y;

interface DockWindowOverviewConstraintObject {
    PositionConstraints?: {
        PosX?: DockPositionX;
        PosY?: DockPositionY;
    };
    SizeConstraints?: {
        SizeX?: number;
        SizeY?: number;
    };
}

/**
 * 
 */
declare type DockWindowConstraints = DockWindowOverviewConstraintObject;
/**
 * ---
 * 
 * ***FloatingWindowDock*** customization properties _type_, for storing customization data or modifying on runtime
 * 
 */
declare type DockCustomizationPropeties = {
    DockToolbarActiveElements: {
        Buttons: {
            minimizeActive: boolean;
            maximizeActive: boolean;
            closeActive: boolean;
        };
        Organizational: {
            titleActive: boolean;
        };
    };
    VisualStyles: {
        
    };
};
