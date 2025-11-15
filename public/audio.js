// Mortéz World - Audio System
let audioContext;
let sounds = {};
let ambienceLoop;
let isAudioInitialized = false;

const AUDIO_CONFIG = {
    masterVolume: 0.7,
    ambienceVolume: 0.3,
    sfxVolume: 0.5,
    spatialRolloff: 2
};

function initAudio() {
    // Create audio context on user interaction
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Create procedural sounds
    createProceduralSounds();
    
    isAudioInitialized = true;
}

function createProceduralSounds() {
    // Thunder sound
    sounds.thunder = createThunderSound();
    
    // Hover sound
    sounds.hover = createHoverSound();
    
    // Click sound
    sounds.click = createClickSound();
    
    // Door creak sound
    sounds.door = createDoorSound();
    
    // Enter/transition sound
    sounds.enter = createEnterSound();
    
    // Rotate sound
    sounds.rotate = createRotateSound();
}

function createThunderSound() {
    return () => {
        if (!audioContext) return;

        const duration = 2;
        const now = audioContext.currentTime;

        // Create noise for thunder rumble
        const bufferSize = audioContext.sampleRate * duration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate brown noise for deep rumble
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5;
        }

        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;

        // Filter for low frequencies
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        filter.Q.value = 1;

        // Envelope
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(AUDIO_CONFIG.sfxVolume * 0.8, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        noise.start(now);
        noise.stop(now + duration);
    };
}

function createHoverSound() {
    return () => {
        if (!audioContext) return;

        const now = audioContext.currentTime;
        const duration = 0.1;

        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + duration);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(AUDIO_CONFIG.sfxVolume * 0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + duration);
    };
}

function createClickSound() {
    return () => {
        if (!audioContext) return;

        const now = audioContext.currentTime;
        const duration = 0.15;

        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + duration);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(AUDIO_CONFIG.sfxVolume * 0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + duration);
    };
}

function createDoorSound() {
    return () => {
        if (!audioContext) return;

        const now = audioContext.currentTime;
        const duration = 1.5;

        // Create creaking sound with multiple oscillators
        const frequencies = [120, 180, 240];
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(freq, now);
            oscillator.frequency.linearRampToValueAtTime(freq * 0.9, now + duration);

            const gainNode = audioContext.createGain();
            const volume = AUDIO_CONFIG.sfxVolume * 0.15 * (1 - index * 0.2);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
            gainNode.gain.linearRampToValueAtTime(volume * 0.7, now + duration * 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

            const filter = audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(now + index * 0.1);
            oscillator.stop(now + duration);
        });
    };
}

function createEnterSound() {
    return () => {
        if (!audioContext) return;

        const now = audioContext.currentTime;
        const duration = 2;

        // Deep resonant sound
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(80, now);
        oscillator.frequency.exponentialRampToValueAtTime(60, now + duration);

        const oscillator2 = audioContext.createOscillator();
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(120, now);
        oscillator2.frequency.exponentialRampToValueAtTime(90, now + duration);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(AUDIO_CONFIG.sfxVolume * 0.3, now + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(now);
        oscillator2.start(now);
        oscillator.stop(now + duration);
        oscillator2.stop(now + duration);
    };
}

function createRotateSound() {
    return () => {
        if (!audioContext) return;

        const now = audioContext.currentTime;
        const duration = 2;

        // Mechanical rotation sound
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, now);
        oscillator.frequency.linearRampToValueAtTime(150, now + duration * 0.5);
        oscillator.frequency.linearRampToValueAtTime(100, now + duration);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(AUDIO_CONFIG.sfxVolume * 0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 500;

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + duration);
    };
}

function startAmbience() {
    if (!audioContext || ambienceLoop) return;

    createAmbienceLoop();
}

function createAmbienceLoop() {
    const duration = 8;
    const now = audioContext.currentTime;

    // Wind sound - brown noise filtered
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 0.5;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.Q.value = 1;

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(AUDIO_CONFIG.ambienceVolume, now + 2);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    noise.start(now);
    ambienceLoop = { source: noise, gain: gainNode };

    // Add occasional whispers
    scheduleWhisper();
}

function scheduleWhisper() {
    if (!audioContext) return;

    const delay = 5000 + Math.random() * 10000;
    
    setTimeout(() => {
        playWhisper();
        scheduleWhisper();
    }, delay);
}

function playWhisper() {
    if (!audioContext) return;

    const now = audioContext.currentTime;
    const duration = 2;

    // Create eerie whisper-like sound
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200 + Math.random() * 100, now);
    oscillator.frequency.linearRampToValueAtTime(250 + Math.random() * 100, now + duration);

    const lfo = audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 5 + Math.random() * 3;

    const lfoGain = audioContext.createGain();
    lfoGain.gain.value = 50;

    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(AUDIO_CONFIG.ambienceVolume * 0.3, now + 0.5);
    gainNode.gain.linearRampToValueAtTime(AUDIO_CONFIG.ambienceVolume * 0.2, now + duration * 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 5;

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    lfo.start(now);
    oscillator.stop(now + duration);
    lfo.stop(now + duration);
}

function stopAmbience() {
    if (ambienceLoop) {
        const now = audioContext.currentTime;
        ambienceLoop.gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
        setTimeout(() => {
            if (ambienceLoop) {
                ambienceLoop.source.stop();
                ambienceLoop = null;
            }
        }, 1000);
    }
}

function playSound(soundName) {
    if (!isAudioInitialized) {
        initAudio();
    }

    if (sounds[soundName]) {
        sounds[soundName]();
    }
}

function setMasterVolume(volume) {
    AUDIO_CONFIG.masterVolume = Math.max(0, Math.min(1, volume));
}

function setAmbienceVolume(volume) {
    AUDIO_CONFIG.ambienceVolume = Math.max(0, Math.min(1, volume));
    if (ambienceLoop) {
        ambienceLoop.gain.gain.value = AUDIO_CONFIG.ambienceVolume;
    }
}

function setSFXVolume(volume) {
    AUDIO_CONFIG.sfxVolume = Math.max(0, Math.min(1, volume));
}

// Initialize on first user interaction
document.addEventListener('click', () => {
    if (!isAudioInitialized) {
        initAudio();
    }
}, { once: true });

// Export API
window.audioAPI = {
    init: initAudio,
    playSound: playSound,
    startAmbience: startAmbience,
    stopAmbience: stopAmbience,
    setMasterVolume: setMasterVolume,
    setAmbienceVolume: setAmbienceVolume,
    setSFXVolume: setSFXVolume
};
