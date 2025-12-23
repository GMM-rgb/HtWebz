class SchedulerUtilitys {
    /**
     * 
     * 
     * @returns {void}
     */
    static WaitForCondition() {
        let AllowContinue = false;
        try {

        } catch (ConditionWaitError) {
            console.error(`The function %cWaitForCondition%c, encountered an error: ${ConditionWaitError}`, "color: yellow;", "color: normal;");
            return false;
        } finally {
            return AllowContinue !== null ? AllowContinue : false;
        }
    }
}

export { SchedulerUtilitys };
