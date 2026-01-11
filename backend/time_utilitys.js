
class TimeBasic {
    /**
     * Gets the current time from the running system.
     * @returns {string}
     */
    static GetCurrentTime() {
        let CurrentTime = new Date().toLocaleTimeString();
        if (CurrentTime !== null && typeof CurrentTime === "string") return CurrentTime;
    }
}

module.exports = {
    TimeBasic
};
