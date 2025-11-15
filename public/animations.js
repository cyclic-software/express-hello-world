// Mortéz World - Cinematic Animations
let camera, scene;
let isIntroPlaying = true;
let introComplete = false;

const ANIMATION_CONFIG = {
    introDuration: 8000,
    titleFadeInStart: 2000,
    titleFadeInDuration: 2000,
    titleFadeOutStart: 6000,
    titleFadeOutDuration: 1500,
    buttonFadeInStart: 7000,
    buttonFadeInDuration: 1000
};

function initAnimations(sceneAPI) {
    camera = sceneAPI.getCamera();
    scene = sceneAPI.getScene();

    // Start intro sequence
    playIntroSequence();
}

function playIntroSequence() {
    const startTime = Date.now();
    const startPosition = new THREE.Vector3(0, 25, 120);
    const endPosition = new THREE.Vector3(0, 15, 60);
    const lookAtTarget = new THREE.Vector3(0, 10, 0);

    camera.position.copy(startPosition);
    camera.lookAt(lookAtTarget);

    // Show loading overlay
    const overlay = document.getElementById('intro-overlay');
    const title = document.getElementById('intro-title');
    const subtitle = document.getElementById('intro-subtitle');
    const enterButton = document.getElementById('enter-button');

    if (overlay) overlay.style.display = 'flex';

    function animateIntro() {
        if (!isIntroPlaying) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / ANIMATION_CONFIG.introDuration, 1);
        const eased = easeInOutQuad(progress);

        // Camera movement
        camera.position.lerpVectors(startPosition, endPosition, eased);
        camera.lookAt(lookAtTarget);

        // Title fade in
        if (elapsed >= ANIMATION_CONFIG.titleFadeInStart && elapsed < ANIMATION_CONFIG.titleFadeInStart + ANIMATION_CONFIG.titleFadeInDuration) {
            const titleProgress = (elapsed - ANIMATION_CONFIG.titleFadeInStart) / ANIMATION_CONFIG.titleFadeInDuration;
            const titleOpacity = easeInOutQuad(titleProgress);
            if (title) title.style.opacity = titleOpacity;
            if (subtitle) subtitle.style.opacity = titleOpacity * 0.8;
        }

        // Title fade out
        if (elapsed >= ANIMATION_CONFIG.titleFadeOutStart) {
            const fadeOutProgress = (elapsed - ANIMATION_CONFIG.titleFadeOutStart) / ANIMATION_CONFIG.titleFadeOutDuration;
            const fadeOutOpacity = 1 - easeInOutQuad(Math.min(fadeOutProgress, 1));
            if (title) title.style.opacity = fadeOutOpacity;
            if (subtitle) subtitle.style.opacity = fadeOutOpacity * 0.8;
        }

        // Button fade in
        if (elapsed >= ANIMATION_CONFIG.buttonFadeInStart) {
            const buttonProgress = (elapsed - ANIMATION_CONFIG.buttonFadeInStart) / ANIMATION_CONFIG.buttonFadeInDuration;
            const buttonOpacity = easeInOutQuad(Math.min(buttonProgress, 1));
            if (enterButton) {
                enterButton.style.opacity = buttonOpacity;
                enterButton.style.pointerEvents = buttonOpacity > 0.5 ? 'auto' : 'none';
            }
        }

        // Lightning flash effect
        if (elapsed > 3000 && elapsed < 3100) {
            triggerLightningFlash();
        }
        if (elapsed > 5500 && elapsed < 5600) {
            triggerLightningFlash();
        }

        if (progress < 1) {
            requestAnimationFrame(animateIntro);
        } else {
            // Intro complete, wait for user interaction
            introComplete = true;
        }
    }

    animateIntro();

    // Setup enter button
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            endIntroSequence();
        });

        // Add hover effects
        enterButton.addEventListener('mouseenter', () => {
            if (window.audioAPI) {
                window.audioAPI.playSound('hover');
            }
            triggerButtonHoverEffect(enterButton);
        });
    }

    // Allow skip with spacebar
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && isIntroPlaying) {
            endIntroSequence();
        }
    });
}

function endIntroSequence() {
    isIntroPlaying = false;
    
    const overlay = document.getElementById('intro-overlay');
    const uiContainer = document.getElementById('ui-container');

    // Fade out overlay
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    }

    // Fade in UI
    if (uiContainer) {
        setTimeout(() => {
            uiContainer.style.opacity = '1';
        }, 500);
    }

    // Play entrance sound
    if (window.audioAPI) {
        window.audioAPI.playSound('enter');
        window.audioAPI.startAmbience();
    }

    // Show welcome message
    if (window.interactionAPI) {
        setTimeout(() => {
            window.interactionAPI.showMessage("Explore the mansion. Click to interact.");
        }, 1500);
    }
}

function triggerLightningFlash() {
    const flash = document.getElementById('lightning-flash');
    if (flash) {
        flash.style.opacity = '0.3';
        setTimeout(() => {
            flash.style.opacity = '0';
        }, 100);
    }

    // Increase scene lighting briefly
    if (scene) {
        scene.traverse((object) => {
            if (object.isLight && object.type === 'DirectionalLight') {
                const originalIntensity = object.intensity;
                object.intensity = originalIntensity * 3;
                setTimeout(() => {
                    object.intensity = originalIntensity;
                }, 100);
            }
        });
    }

    // Play thunder sound
    if (window.audioAPI) {
        window.audioAPI.playSound('thunder');
    }
}

function triggerButtonHoverEffect(button) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'button-ripple';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Flicker lights in scene
    if (scene) {
        scene.traverse((object) => {
            if (object.isLight && object.type === 'PointLight') {
                const originalIntensity = object.intensity;
                object.intensity = originalIntensity * 1.5;
                setTimeout(() => {
                    object.intensity = originalIntensity;
                }, 200);
            }
        });
    }
}

function animateCameraTo(targetPosition, lookAtPosition, duration = 2000) {
    const startPosition = camera.position.clone();
    const startLookAt = new THREE.Vector3(0, 10, 0);
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        camera.position.lerpVectors(startPosition, targetPosition, eased);
        
        const currentLookAt = new THREE.Vector3();
        currentLookAt.lerpVectors(startLookAt, lookAtPosition, eased);
        camera.lookAt(currentLookAt);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function createFloatingAnimation(object, amplitude = 0.5, speed = 1) {
    const startY = object.position.y;
    const startTime = Date.now();

    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        object.position.y = startY + Math.sin(elapsed * speed) * amplitude;
        requestAnimationFrame(animate);
    }

    animate();
}

function createRotatingAnimation(object, speed = 0.5) {
    function animate() {
        object.rotation.y += speed * 0.01;
        requestAnimationFrame(animate);
    }

    animate();
}

function createPulsingLight(light, minIntensity, maxIntensity, speed = 1) {
    const startTime = Date.now();

    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        const intensity = minIntensity + (maxIntensity - minIntensity) * (Math.sin(elapsed * speed) * 0.5 + 0.5);
        light.intensity = intensity;
        requestAnimationFrame(animate);
    }

    animate();
}

function createScreenShake(intensity = 0.5, duration = 500) {
    const startPosition = camera.position.clone();
    const startTime = Date.now();

    function shake() {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
            const progress = elapsed / duration;
            const currentIntensity = intensity * (1 - progress);
            
            camera.position.x = startPosition.x + (Math.random() - 0.5) * currentIntensity;
            camera.position.y = startPosition.y + (Math.random() - 0.5) * currentIntensity;
            camera.position.z = startPosition.z + (Math.random() - 0.5) * currentIntensity;
            
            requestAnimationFrame(shake);
        } else {
            camera.position.copy(startPosition);
        }
    }

    shake();
}

// Easing functions
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

// Export API
window.animationAPI = {
    init: initAnimations,
    isIntroPlaying: () => isIntroPlaying,
    endIntro: endIntroSequence,
    animateCameraTo: animateCameraTo,
    createFloatingAnimation: createFloatingAnimation,
    createRotatingAnimation: createRotatingAnimation,
    createPulsingLight: createPulsingLight,
    createScreenShake: createScreenShake,
    triggerLightningFlash: triggerLightningFlash
};
