let soundFolder = '../audio/';
let soundFiles = [
    'button_click.mp3',
    'button_hover.mp3',
];
/**
 * Logs a file loading `Error` message to browser console output.
 * @param {string} ErrMsg 
 * @param {string?} FileType
 * @returns {Error}
 */
function PostLoadingError(ErrMsg, FileType) {
    throw new Error("There was an error loading a file:\n" + error + `\nFile Type:\t${FileType}`);
}

soundFiles.forEach(async soundFile => {
    let FetchedSoundFile = await fetch(`${soundFolder}${soundFile}`).then(ev => {
        console.log(ev.ok);
    }).catch(error => PostLoadingError(error, "Audio"));
});
