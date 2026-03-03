/**
 * @type {Object?}
 */
let JSON_wiki_data = null;

/**
 * @returns {Object?}
 */
function LoadWikiDataJSON() {
    
}

JSON_wiki_data = LoadWikiDataJSON?.() ?? console.error("LoadJSON function unknown.");

export {
    JSON_wiki_data as WikiData,
    LoadWikiDataJSON,
};
