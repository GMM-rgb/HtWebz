const fs = require("fs");
const path = require("path");
const { stdout } = require("process");
class ErrorReportValidation {
    static ClientReportsDirectory = path.join(__dirname, 'reports', 'client');
    /**
     * 
     * @returns {Promise<boolean>}
     */
    static async ValidateClientReports() {
        if (fs === null || !fs) return false;
        //
        if (!fs.existsSync(this.ClientReportsDirectory)) {

        }
        return true;
    }
}

class ClientErrorReportHelper {
    /**
     * 
     * @param {string} ReportedErrorMsg 
     * @param {boolean} WasFeedbackReport
     * @returns {void}
     */
    static LogClientError(ReportedErrorMsg, WasFeedbackReport) {
        if (!ReportedErrorMsg || (typeof ReportedErrorMsg !== "string")) return;
        if (WasFeedbackReport === null) WasFeedbackReport = false; 

        (async () => {
            var FormatedResponse = null;

            

            stdout._write();
        });
    }
}

module.exports = {
    ErrorReportValidation,
    ClientErrorReportHelper,
};
