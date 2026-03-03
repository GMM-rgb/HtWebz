const fs = require("fs");
const path = require("path");
const colors = require("picocolors");

const TimeUtilitys = require("../time_utilitys");

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
     * Checks that the function argument is available, and has more than one parameter; else it returns false.
     * @param {Array<any>} InputArgumentsArray 
     * @returns {boolean}
     */
    static HasArgumentArray(InputArgumentsArray) {
        if (InputArgumentsArray === null || InputArgumentsArray === undefined || !(InputArgumentsArray instanceof Array)) return false;
        if (InputArgumentsArray && InputArgumentsArray.length <= 0) return false; else return true;
    }
    /**
     * Writes a new `.txt` (text) file to the corresponding folder in reports; with report error info, etc.
     * @param {string} QueriedSaveData
     * @param {"client"|"server"} DeviceType
     * @returns {Promise<void>}
     * @callback then<ok>
     */
    static async CreateNewReportFile(QueriedSaveData, DeviceType) {
        if (!fs || QueriedSaveData === null || !(QueriedSaveData instanceof String) || (DeviceType !== "client" && DeviceType !== "server")) return null;
        if (QueriedSaveData instanceof String) console.log(`Writing ${DeviceType.toUpperCase().toString()} Error report to Storage...\n${FormatedResponse}`);
        fs.writeFileSync(path.join(ErrorReportValidation.ClientReportsDirectory, DeviceType, `${TimeUtilitys.TimeBasic.GetCurrentTime().replaceAll(":", "")}`), QueriedSaveData.toString());
    }
    /**
     * Logs an `Error`; that's supposed to be from client machine, to server storage client directory reports.
     * @param {string} ReportedErrorMsg
     * @param {boolean} WasFeedbackReport
     * @param {...any} opts
     * @returns {void}
     */
    static LogClientError(ReportedErrorMsg, WasFeedbackReport, ...opts) {
        if (!ReportedErrorMsg || !(ReportedErrorMsg instanceof String)) return;
        if (WasFeedbackReport === null) WasFeedbackReport = false;
        if (fs === null || fs === undefined) {
            console.error("The [fs] package dependency failed to load, or is not installed.");
            return;
        }
        /**
         * The finalized data response to be saved.
         * @type {string?}
        */
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
                 */
                let Formated = null;
                try {
                    if (ErrorReportHelper.HasArgumentArray(opts)) {
                        /**
                         * Variable for tracking the opts arguments index; when each one has been added.
                         * @type {number}
                         */
                        let IndexValue = 0;
                        opts.forEach((arg) => {
                            if ((Math.floor(opts.length) > 0)) {
                                IndexValue += 1;
                                if (IndexValue < opts.length) {
                                    Formated += `${arg}\n`;
                                } else {
                                    Formated += `${arg}`;
                                }
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
            // Update variable to the formated Error Response from the following function attatched
            FormatedResponse = await formatErrorResponse(ReportedErrorMsg);
            // Finalize the error report file
            await this.CreateNewReportFile(FormatedResponse, "client").then(() => {
                console.log(colors.greenBright(`SUCCESS: Successfully saved the error report file `));
            }).catch((err) => console.error(err));
        })();
    }
    /**
     * Logs an `Error`, and stores the server error; in server storage reports.
     * @param {string} ServerError
     * @param {...any} opts
     * @returns
     */
    static LogServerError(ServerError, ...opts) {
        if (ServerError === null || !(ServerError instanceof String)) return;
        (async () => {
            
        })();
    }
}

module.exports = {
    ErrorReportValidation,
    ErrorReportHelper
};
