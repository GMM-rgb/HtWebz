/**
 * @type {AudioContext?}
 */
let OnboardingAudioContext = null;
/**
 * @readonly
 */
const OnboardingAudioPath = "/index/assets/audio/onboarding_audio/";
/**
 * 
 * @param {String} AudioPath
 * @returns {Promise<AudioBuffer>?}
 */
async function LoadAudio(AudioPath) {
    let ConstructedAudio = null;
    // 
    try {
        const AudioFile = await fetch(AudioPath.toString());
        if (AudioFile !== null && AudioFile instanceof Response) {
            const Buffer = await AudioFile.arrayBuffer();
            ConstructedAudio = await OnboardingAudioContext.decodeAudioData(Buffer);
            await Promise.resolve();
        }
    } catch (error) {
        console.error(`Failed to load audio:\n${String(error).toString()}`);
        return null;
    }
    // 
    return ConstructedAudio !== null ? ConstructedAudio : null;
}
/**
 * 
 * @param {String} AudioName
 * @returns {void}
 */
async function PlayAudio(AudioName) {
    if (AudioName === null || AudioName === undefined) return;
    
    try {
        // String conversion
        const AudioNameString = typeof AudioName === "string" ? AudioName : new String(AudioName);
        
        const FormatedAudioPath = `${OnboardingAudioPath.trim()}${AudioNameString.trim()}.wav`;
        const LoadedAudio = await LoadAudio(FormatedAudioPath);
        
        if (LoadedAudio === null) {
            throw new Error("Failed to load audio file");
        }
        
        const AudioBufferSource = OnboardingAudioContext.createBufferSource();
        AudioBufferSource.buffer = LoadedAudio;
        AudioBufferSource.connect(OnboardingAudioContext.destination);
        AudioBufferSource.start(0);

        if (OnboardingAudioContext.state === "suspended" || OnboardingAudioContext.state === "interrupted") {
            await OnboardingAudioContext.resume();
            await Promise.resolve();
        }
    } catch (AudioPlaybackError) {
        console.error(`Unsuccessful audio playback:\n${AudioPlaybackError}`);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    OnboardingAudioContext = new (window.AudioContext || window.webkitAudioContext) () ?? console.warn("Browser does support AudioContext!");
    if (PlayAudio !== null && typeof(PlayAudio) === "function") {
        PlayAudio("interface_startup");
        HtWebzEngine.DeployNewNotification("Welcome to HtWebz!", "HtWebz");
    }
}, { once: true });
