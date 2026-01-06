const fs = require("fs");
const path = require("path");
const { stdout, allowedNodeEnvironmentFlags, nextTick } = require("process");

class ErrorReportValidation {
    static ClientReportsDirectory = path.join(__dirname, 'reports');
    /**
     * Validates that the client & server; directorys for error reports exist.
     * @returns {Promise<boolean>}
     */
    static async ValidateReports() {
        if (fs === null || fs === undefined) return false;
        // Verifies that the root reports folder (directory) exists + valid
        if (!fs.existsSync(this.ClientReportsDirectory)) {
            console.log(`"[reports] folder does not exist; creating directory..."`);
            (async () => {
                try {
                    console.log("Please wait... this shouldn't take long.");
                    fs.mkdirSync(path.join(this.ClientReportsDirectory, ''));
                } catch (ReportsInternalError) {
                    console.error(ReportsInternalError);
                } finally {
                    console.log("SUCCESS: [reports]s' directory has been created.\nContinuing validation check...");
                }
            })();
        }
        // Checks if the client directory exists
        if (!fs.existsSync(path.join(this.ClientReportsDirectory, 'client'))) {
            (async () => {
                fs.mkdirSync(path.join(this.ClientReportsDirectory, 'client'));
            })();
            return false;
        }
        return true;
    }
}

class ErrorReportHelper {
    /**
     * 
     * @param {string} ReportedErrorMsg 
     * @param {boolean} WasFeedbackReport
     * @param {...any} opts
     * @returns {void}
     */
    static LogClientError(ReportedErrorMsg, WasFeedbackReport, CurrentRegionTimestamp, ...opts) {
        if (!ReportedErrorMsg || (typeof ReportedErrorMsg !== "object")) return;
        if (WasFeedbackReport === null) WasFeedbackReport = false;
        if (fs === null || fs === undefined) return;

        (async () => {
            var FormatedResponse = null;

            /**
             * 
             * @param {*} Error_DataToFormat
             * @returns {string}
             */
            function formatErrorResponse(Error_DataToFormat) {
                if (!Error_DataToFormat) return;
            }

            if (CurrentRegionTimestamp !== null) {
                fs.writeFileSync(CurrentRegionTimestamp + ".txt", formatErrorResponse());
            }
        })();
    }
    /**
     * 
     * @param {} 
     * @returns
     */
    static LogServerError(...opts) {

    }
}

module.exports = {
    ErrorReportValidation,
    ErrorReportHelper
};
