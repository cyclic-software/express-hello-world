// Mortéz World - Interaction System
let raycaster, mouse, camera, scene;
let hoveredObject = null;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let cameraRotation = { x: 0, y: 0 };
let interactiveObjects = [];

const INTERACTION_CONFIG = {
    rotationSpeed: 0.003,
    zoomSpeed: 0.05,
    minDistance: 20,
    maxDistance: 120,
    hoverColor: 0xffb347,
    normalEmissiveIntensity: 0.5,
    hoverEmissiveIntensity: 1.2
};

function initInteractions(sceneAPI) {
    camera = sceneAPI.getCamera();
    scene = sceneAPI.getScene();
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Collect all interactive objects
    collectInteractiveObjects();

    // Event listeners
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('wheel', onMouseWheel, false);
    window.addEventListener('click', onClick, false);
    window.addEventListener('dblclick', onDoubleClick, false);

    // Touch support for mobile
    window.addEventListener('touchstart', onTouchStart, false);
    window.addEventListener('touchmove', onTouchMove, false);
    window.addEventListener('touchend', onTouchEnd, false);
}

function collectInteractiveObjects() {
    scene.traverse((object) => {
        if (object.userData.interactive) {
            interactiveObjects.push(object);
        }
    });
}

function onMouseMove(event) {
    // Update mouse position for raycasting
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Camera rotation when dragging
    if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        cameraRotation.y += deltaX * INTERACTION_CONFIG.rotationSpeed;
        cameraRotation.x += deltaY * INTERACTION_CONFIG.rotationSpeed;

        // Clamp vertical rotation
        cameraRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraRotation.x));

        updateCameraPosition();

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    // Check for hover interactions
    checkHover();

    // Parallax effect on non-interactive elements
    updateParallax(mouse.x, mouse.y);
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    document.body.style.cursor = 'grabbing';
}

function onMouseUp(event) {
    isDragging = false;
    document.body.style.cursor = 'default';
}

function onMouseWheel(event) {
    event.preventDefault();
    
    const delta = event.deltaY * INTERACTION_CONFIG.zoomSpeed;
    const distance = camera.position.length();
    const newDistance = Math.max(
        INTERACTION_CONFIG.minDistance,
        Math.min(INTERACTION_CONFIG.maxDistance, distance + delta)
    );

    const ratio = newDistance / distance;
    camera.position.multiplyScalar(ratio);
}

function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        handleObjectClick(object);
    }
}

function onDoubleClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        handleObjectDoubleClick(object);
    }
}

function handleObjectClick(object) {
    // Find the parent with userData
    let target = object;
    while (target && !target.userData.type) {
        target = target.parent;
    }

    if (!target || !target.userData.type) return;

    const type = target.userData.type;

    switch (type) {
        case 'door':
            triggerDoorAnimation(target);
            showMessage("Welcome to Mortéz World...");
            break;
        case 'leftTower':
            focusOnObject(target, 30);
            showMessage("The Tower of Shadows");
            break;
        case 'rightTower':
            focusOnObject(target, 25);
            showMessage("The Tower of Whispers");
            break;
    }

    // Play click sound if audio is available
    if (window.audioAPI) {
        window.audioAPI.playSound('click');
    }
}

function handleObjectDoubleClick(object) {
    let target = object;
    while (target && !target.userData.type) {
        target = target.parent;
    }

    if (!target || !target.userData.type) return;

    const type = target.userData.type;

    if (type === 'leftTower' || type === 'rightTower') {
        rotateTower(target);
    }
}

function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, true);

    // Reset previous hover
    if (hoveredObject && (intersects.length === 0 || intersects[0].object !== hoveredObject)) {
        resetObjectHover(hoveredObject);
        hoveredObject = null;
        document.body.style.cursor = isDragging ? 'grabbing' : 'default';
    }

    // Set new hover
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object !== hoveredObject) {
            hoveredObject = object;
            highlightObject(object);
            document.body.style.cursor = 'pointer';

            // Play hover sound
            if (window.audioAPI) {
                window.audioAPI.playSound('hover');
            }
        }
    }
}

function highlightObject(object) {
    if (object.material) {
        if (object.material.emissive) {
            object.userData.originalEmissive = object.material.emissive.getHex();
            object.userData.originalEmissiveIntensity = object.material.emissiveIntensity;
            object.material.emissive.setHex(INTERACTION_CONFIG.hoverColor);
            object.material.emissiveIntensity = INTERACTION_CONFIG.hoverEmissiveIntensity;
        }
    }

    // Add glow effect
    createGlowEffect(object);
}

function resetObjectHover(object) {
    if (object.material && object.userData.originalEmissive !== undefined) {
        object.material.emissive.setHex(object.userData.originalEmissive);
        object.material.emissiveIntensity = object.userData.originalEmissiveIntensity;
    }

    // Remove glow effect
    removeGlowEffect(object);
}

function createGlowEffect(object) {
    if (object.userData.glowLight) return;

    const glowLight = new THREE.PointLight(INTERACTION_CONFIG.hoverColor, 1, 10);
    glowLight.position.copy(object.position);
    object.parent.add(glowLight);
    object.userData.glowLight = glowLight;
}

function removeGlowEffect(object) {
    if (object.userData.glowLight) {
        object.parent.remove(object.userData.glowLight);
        delete object.userData.glowLight;
    }
}

function updateCameraPosition() {
    const distance = camera.position.length();
    const phi = cameraRotation.x;
    const theta = cameraRotation.y;

    camera.position.x = distance * Math.sin(theta) * Math.cos(phi);
    camera.position.y = distance * Math.sin(phi) + 15;
    camera.position.z = distance * Math.cos(theta) * Math.cos(phi);

    camera.lookAt(0, 10, 0);
}

function updateParallax(mouseX, mouseY) {
    // Subtle camera movement based on mouse position
    if (!isDragging && window.animationAPI && !window.animationAPI.isIntroPlaying()) {
        const targetX = mouseX * 2;
        const targetY = mouseY * 2;
        
        camera.position.x += (targetX - camera.position.x) * 0.01;
        camera.position.y += (targetY - camera.position.y) * 0.01;
        
        camera.lookAt(0, 10, 0);
    }
}

function focusOnObject(object, distance = 30) {
    if (!window.animationAPI) return;

    const targetPosition = object.position.clone();
    const cameraTarget = new THREE.Vector3(
        targetPosition.x,
        targetPosition.y + 10,
        targetPosition.z + distance
    );

    window.animationAPI.animateCameraTo(cameraTarget, targetPosition, 2000);
}

function rotateTower(tower) {
    const duration = 2000;
    const startRotation = tower.rotation.y;
    const endRotation = startRotation + Math.PI * 2;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        tower.rotation.y = startRotation + (endRotation - startRotation) * eased;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();

    if (window.audioAPI) {
        window.audioAPI.playSound('rotate');
    }
}

function triggerDoorAnimation(door) {
    const duration = 1500;
    const startZ = door.position.z;
    const endZ = startZ - 3;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        door.position.z = startZ + (endZ - startZ) * eased;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Door opened, trigger next scene or action
            setTimeout(() => {
                showMessage("Enter Mortéz World — where darkness drips in luxury.");
            }, 500);
        }
    }

    animate();

    if (window.audioAPI) {
        window.audioAPI.playSound('door');
    }
}

function showMessage(text) {
    const messageEl = document.getElementById('interaction-message');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.classList.add('visible');

        setTimeout(() => {
            messageEl.classList.remove('visible');
        }, 3000);
    }
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Touch support
let touchStartPos = { x: 0, y: 0 };

function onTouchStart(event) {
    if (event.touches.length === 1) {
        touchStartPos = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
        previousMousePosition = touchStartPos;
        isDragging = true;
    }
}

function onTouchMove(event) {
    if (event.touches.length === 1 && isDragging) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - previousMousePosition.x;
        const deltaY = touch.clientY - previousMousePosition.y;

        cameraRotation.y += deltaX * INTERACTION_CONFIG.rotationSpeed;
        cameraRotation.x += deltaY * INTERACTION_CONFIG.rotationSpeed;

        cameraRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraRotation.x));

        updateCameraPosition();

        previousMousePosition = {
            x: touch.clientX,
            y: touch.clientY
        };
    }
}

function onTouchEnd(event) {
    isDragging = false;
}

// Export API
window.interactionAPI = {
    init: initInteractions,
    showMessage: showMessage
};
