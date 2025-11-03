/**
 * @type {Object?}
 */
let JSON_wiki_data = null;

/**
 * @returns {JSON | Object ?}
 */
function LoadJSON() {

}

JSON_wiki_data = LoadJSON?.() ?? console.error("LoadJSON function unknown.");

export { JSON_wiki_data, LoadJSON };
