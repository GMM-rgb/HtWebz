const SocketConnection = io();
class SchedulerUtilitys {
    
    static e = 0;
    /**
     * 
     * @param {...any} args
     * @returns {void}
     */
    static WaitForCondition(...args) {
        let CanContinue = false;
        (async () => {
            try {

            } catch (ConditionWaitError) {
                console.error(`The function %cWaitForCondition%c, encountered an error: ${ConditionWaitError}`, "color: yellow;", "color: normal;");
                return false;
            } finally {
                return (CanContinue !== null && CanContinue === true) ? CanContinue : false;
            }
        });
    }
}

class DevelopmentUtilitys {
    /**
     * 
     * @param {string} ERROR_Message 
     * @param {boolean} isFeedback
     */
    static ReportClientError(ERROR_Message, isFeedback) {
        if (!ERROR_Message || !(typeof ERROR_Message === "string")) return;
        SocketConnection.emit("ClientErrorReport", `${ERROR_Message}`, isFeedback !== null ? isFeedback : false);
    }
}

export { SchedulerUtilitys, DevelopmentUtilitys };
