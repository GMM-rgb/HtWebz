// NodeJS Modules
const fs = require("fs");
const path = require("path");
const { Socket, RemoteSocket } = require("socket.io");
// Modules
const SearchProcesser = require("./search_system_modules/search_processer");
const { attachSocketHandlers } = require("../user_managment");
/**
 * @type {RemoteSocket?}
 */
let io = null;
/**
 * 
 * @param {RemoteSocket} ioSocket 
 */
async function AttatchSearchEngineSocket(ioSocket) {
    if (ioSocket !== null) {
        io = ioSocket;
    }
}
/**
 * 
 * @param {string} SearchQuery
 * @returns {Array<any>?}
 * 
 */
function RequestSearch(SearchQuery) {
    if (SearchQuery !== null && (SearchQuery instanceof String)) {
        var Results = [];



        return Results;
    } else {
        console.warn(`Search Query Input was NULL for Server proccessing; or it was invalid.\nFalling back to fail page...`);
        io.emit("ServerSendSearchResults", "SERVER SEARCH ERROR");
    }
    return null;
}
// 
if (io !== null) {
    io.on("ClientSearchRequest", (ClientEngineQuery) => {
        if (ClientEngineQuery !== null && typeof(ClientEngineQuery) === "string") {
            var SearchResultData = RequestSearch(ClientEngineQuery);
            io.emit("ServerSendSearchResults", SearchResultData);
        }
    });
}

module.exports = {
    attachSocketHandlers,
};
