declare abstract class WindowDockPrimative {
    public RemoveWindowDock(): Promise<void>;
    /**
     * Computes the current **WindowDock** minimization state into requested bool value. 
     * @param NewMinimizedStatus 
     */
    public SetMinimized(NewMinimizedStatus: boolean): void;
    public RefactorDockWindowSizeConstraints(ConstraintData: WindowDockSizeConstraints.ComputationParameterObject): WindowDockSizeConstraints.WindowDockSizeConstraintsChange | null;
    // private computeNewSizeConstraints(): WindowDockSizeConstraints.WindowDockSizeConstraintAbstract | undefined;
}
