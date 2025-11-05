let soundFolder = '../audio/';
let soundFiles = [
    'button_click.mp3',
    'button_hover.mp3',
];

soundFiles.forEach(element => {
    let audio = new Audio(soundFolder + element);
    audio.preload = 'auto'; // Preload the audio for better performance
    audio.oncanplaythrough = () => {
        console.log(`Audio file loaded: ${element}`);
    };
    audio.onerror = () => {
        console.error(`Failed to load audio file: ${element}`);
    };
    window[element.replace('.mp3', '')] = audio; // Make it globally accessible
});
