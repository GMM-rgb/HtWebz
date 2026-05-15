import { WindowDockSizeConstraints } from "../window_dock_constructor";

export abstract class WindowDockPrimative {
    static WindowContentsConstructionDataTemplate: Readonly<Array<string>>;
    /**
     * 
     */
    public ConstructWindowContents(): Promise<void>;
    /**
     * Destroys the dock window from the rendering memmory.
     */
    public RemoveWindowDock(): Promise<void>;
    /**
     * Computes the current **WindowDock** minimization state into requested bool value. 
     * @param NewMinimizedStatus 
     */
    public SetMinimized(NewMinimizedStatus: boolean): void;
    /**
     * 
     * @param ConstraintData 
     */
    public RefactorDockWindowSizeConstraints(
        ConstraintData: WindowDockSizeConstraints.ComputationParameterObject
    ): WindowDockSizeConstraints.WindowDockSizeConstraintsChange | null;
}
