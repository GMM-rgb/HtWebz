const fs = require("fs");
const path = require("path");

class ErrorReportValidation {
    static ClientReportsDirectory = path.join(__dirname, 'reports');
    /**
     * Validates that the client & server; directorys for error reports exist.
     * @returns {Promise<boolean>}
     */
    static ValidateReports() {
        if (fs === null || fs === undefined) return false;
        // Verifies that the root reports folder (directory) exists + valid
        if (!fs.existsSync(this.ClientReportsDirectory)) {
            console.log(`[reports] folder does not exist; creating directory...`);
            (async () => {
                try {
                    console.log("Please wait... this shouldn't take long.");
                    fs.mkdirSync(path.join(this.ClientReportsDirectory, ''));
                } catch (ReportsInternalError) {
                    console.error(ReportsInternalError);
                } finally {
                    console.log("SUCCESS: [reports] directory has been created.\nContinuing validation check...");
                }
            })();
        }
        // Checks if the client directory exists
        if (!fs.existsSync(path.join(this.ClientReportsDirectory, 'client'))) {
            (async () => {
                fs.mkdirSync(path.join(this.ClientReportsDirectory, 'client'));
            })();
        }
        // Checks if the server directory exists
        if (!fs.existsSync(path.join(this.ClientReportsDirectory, 'server'))) {
            (async () => {
                fs.mkdirSync(path.join(this.ClientReportsDirectory, 'server'));
            })();
            return true;
        }
        return false;
    }
}

class ErrorReportHelper {
    /**
     * Writes a new `.txt` (text) file with the report error info, etc.
     * @returns {void}
     */
    static CreateNewReportFile() {

    }
    /**
     * Logs an `Error`; that's supposed to be from client machine, to server storage client directory reports.
     * @param {string} ReportedErrorMsg 
     * @param {boolean} WasFeedbackReport
     * @param {...*} opts
     * @returns {void}
     */
    static LogClientError(ReportedErrorMsg, WasFeedbackReport, CurrentRegionTimestamp, ...opts) {
        if (!ReportedErrorMsg || !(ReportedErrorMsg instanceof String)) return;
        if (WasFeedbackReport === null) WasFeedbackReport = false;
        if (fs === null || fs === undefined) return;
        // The finalized data response to be saved
        let FormatedResponse = null;

        (async () => {
            /**
             * Formats the `Error` data to readable type before saving to log file.
             * @param {string} Error_DataToFormat
             * @returns {Promise<string>}
             */
            async function formatErrorResponse(Error_DataToFormat) {
                if (!Error_DataToFormat || !(Error_DataToFormat instanceof String)) return "ERROR Formating.";
                /**
                 * @type {string?}
                 */ let Formated = null;
                try {
                    Formated = JSON.parse(Error_DataToFormat);
                    if (opts !== null && (opts instanceof Array) && opts.length >= 1) {
                        /**
                         * Variable for tracking the opts arguments index; when each one has been added.
                         * @type {number}
                         */
                        let IndexValue = 0;
                        Formated += "\n";
                        opts.forEach((arg) => {
                            if ((Math.floor(Formated.length) > 0)) {
                                Formated += `${arg}\n`;
                            }
                        });
                    }
                } catch (FormatError) {
                    console.error(`[ERROR Formating Report Data]:\n${FormatError}`);
                } finally {
                    if (Formated !== null && Formated !== undefined) {
                        return Formated;
                    } else {
                        return "ERROR Formating.";
                    }
                }
            }
            //
            FormatedResponse = await formatErrorResponse(ReportedErrorMsg);
            //
            if (CurrentRegionTimestamp !== null) {
                fs.writeFileSync(CurrentRegionTimestamp + "_" + ErrorType + ".txt", formatErrorResponse());
            }
        })();
    }
    /**
     * Logs an `Error`, and stores the server error; in server storage reports.
     * @param {...*} opts
     * @returns
     */
    static LogServerError(...opts) {

    }
}

module.exports = {
    ErrorReportValidation,
    ErrorReportHelper
};
