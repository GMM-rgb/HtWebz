declare abstract class WindowDockPrimative {
    /**
     * Computes the current **WindowDock** minimization state into requested bool value. 
     * @param NewMinimizedStatus 
     */
    public setMinimized(NewMinimizedStatus: boolean): void;
    public removeWindowDock(): Promise<void>;
}
