// Mortéz World - Main 3D Scene
let scene, camera, renderer, composer;
let mansion, leftTower, rightTower;
let particles = [];
let lights = {};
let clock = new THREE.Clock();

// Scene configuration
const SCENE_CONFIG = {
    fogColor: 0x0a0e27,
    fogNear: 10,
    fogFar: 150,
    ambientLightColor: 0x1a1f3a,
    ambientLightIntensity: 0.3,
    moonLightColor: 0x4a5f8f,
    moonLightIntensity: 0.5
};

function initScene() {
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(SCENE_CONFIG.fogColor, SCENE_CONFIG.fogNear, SCENE_CONFIG.fogFar);
    scene.background = new THREE.Color(0x0a0e27);

    // Camera setup - cinematic starting position
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 15, 80);
    camera.lookAt(0, 10, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('canvas3d'),
        antialias: true,
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;

    // Lighting setup
    setupLighting();

    // Build the mansion and environment
    buildMansion();
    buildTowers();
    buildEnvironment();
    createMistParticles();
    createGround();

    // Window resize handler
    window.addEventListener('resize', onWindowResize, false);
}

function setupLighting() {
    // Ambient light - dark and moody
    const ambientLight = new THREE.AmbientLight(
        SCENE_CONFIG.ambientLightColor,
        SCENE_CONFIG.ambientLightIntensity
    );
    scene.add(ambientLight);

    // Moonlight - main directional light
    const moonLight = new THREE.DirectionalLight(
        SCENE_CONFIG.moonLightColor,
        SCENE_CONFIG.moonLightIntensity
    );
    moonLight.position.set(-30, 50, 30);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;
    moonLight.shadow.camera.near = 0.5;
    moonLight.shadow.camera.far = 200;
    moonLight.shadow.camera.left = -50;
    moonLight.shadow.camera.right = 50;
    moonLight.shadow.camera.top = 50;
    moonLight.shadow.camera.bottom = -50;
    scene.add(moonLight);
    lights.moon = moonLight;

    // Window lights - amber glow
    createWindowLights();
}

function createWindowLights() {
    const windowPositions = [
        { x: -12, y: 8, z: -2 },
        { x: -8, y: 8, z: -2 },
        { x: 8, y: 8, z: -2 },
        { x: 12, y: 8, z: -2 },
        { x: -15, y: 15, z: -2 },
        { x: 15, y: 15, z: -2 }
    ];

    lights.windows = [];
    windowPositions.forEach((pos, index) => {
        const light = new THREE.PointLight(0xff9500, 0.8, 15);
        light.position.set(pos.x, pos.y, pos.z);
        light.castShadow = false;
        scene.add(light);
        lights.windows.push({
            light: light,
            baseIntensity: 0.8,
            flickerSpeed: 0.5 + Math.random() * 0.5
        });

        // Add glowing sphere for window
        const glowGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff9500,
            transparent: true,
            opacity: 0.9
        });
        const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
        glowSphere.position.copy(light.position);
        scene.add(glowSphere);
    });
}

function buildMansion() {
    const mansionGroup = new THREE.Group();

    // Main mansion body - gothic architecture
    const bodyGeometry = new THREE.BoxGeometry(30, 20, 15);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.9,
        metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 10;
    body.castShadow = true;
    body.receiveShadow = true;
    mansionGroup.add(body);

    // Roof - steep gothic style
    const roofGeometry = new THREE.ConeGeometry(18, 8, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        roughness: 0.8,
        metalness: 0.2
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 24;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    mansionGroup.add(roof);

    // Windows - dark with subtle glow
    const windowGeometry = new THREE.BoxGeometry(2, 3, 0.5);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xff9500,
        emissive: 0xff9500,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7
    });

    const windowPositions = [
        { x: -12, y: 8 }, { x: -8, y: 8 }, { x: 8, y: 8 }, { x: 12, y: 8 },
        { x: -12, y: 14 }, { x: -8, y: 14 }, { x: 8, y: 14 }, { x: 12, y: 14 }
    ];

    windowPositions.forEach(pos => {
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(pos.x, pos.y, 7.6);
        mansionGroup.add(window);
    });

    // Door - large gothic entrance
    const doorGeometry = new THREE.BoxGeometry(4, 8, 0.5);
    const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a1810,
        roughness: 0.9,
        metalness: 0.1
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 4, 7.6);
    door.userData = { interactive: true, type: 'door' };
    mansionGroup.add(door);

    // Door frame accent
    const frameGeometry = new THREE.BoxGeometry(5, 9, 0.3);
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.6,
        metalness: 0.4
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 4.5, 7.7);
    mansionGroup.add(frame);

    mansion = mansionGroup;
    scene.add(mansion);
}

function buildTowers() {
    // Left tower - larger
    const leftTowerGroup = new THREE.Group();
    
    const leftBodyGeometry = new THREE.CylinderGeometry(4, 5, 35, 8);
    const towerMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.9,
        metalness: 0.1
    });
    const leftBody = new THREE.Mesh(leftBodyGeometry, towerMaterial);
    leftBody.position.y = 17.5;
    leftBody.castShadow = true;
    leftBody.receiveShadow = true;
    leftTowerGroup.add(leftBody);

    // Left tower roof
    const leftRoofGeometry = new THREE.ConeGeometry(5, 8, 8);
    const leftRoof = new THREE.Mesh(leftRoofGeometry, towerMaterial);
    leftRoof.position.y = 39;
    leftRoof.castShadow = true;
    leftTowerGroup.add(leftRoof);

    // Tower windows
    for (let i = 0; i < 3; i++) {
        const windowGeometry = new THREE.BoxGeometry(1.5, 2, 0.3);
        const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0xff4444,
            emissive: 0xff4444,
            emissiveIntensity: 0.3
        });
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(4.5, 10 + i * 8, 0);
        leftTowerGroup.add(window);

        // Add point light for window
        const light = new THREE.PointLight(0xff4444, 0.5, 10);
        light.position.set(5, 10 + i * 8, 0);
        leftTowerGroup.add(light);
    }

    leftTowerGroup.position.set(-20, 0, -5);
    leftTowerGroup.userData = { interactive: true, type: 'leftTower' };
    leftTower = leftTowerGroup;
    scene.add(leftTower);

    // Right tower - smaller
    const rightTowerGroup = new THREE.Group();
    
    const rightBodyGeometry = new THREE.CylinderGeometry(3, 4, 25, 8);
    const rightBody = new THREE.Mesh(rightBodyGeometry, towerMaterial);
    rightBody.position.y = 12.5;
    rightBody.castShadow = true;
    rightBody.receiveShadow = true;
    rightTowerGroup.add(rightBody);

    // Right tower roof
    const rightRoofGeometry = new THREE.ConeGeometry(4, 6, 8);
    const rightRoof = new THREE.Mesh(rightRoofGeometry, towerMaterial);
    rightRoof.position.y = 28;
    rightRoof.castShadow = true;
    rightTowerGroup.add(rightRoof);

    // Tower windows
    for (let i = 0; i < 2; i++) {
        const windowGeometry = new THREE.BoxGeometry(1.2, 1.8, 0.3);
        const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0xff9500,
            emissive: 0xff9500,
            emissiveIntensity: 0.3
        });
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(3.5, 8 + i * 8, 0);
        rightTowerGroup.add(window);

        // Add point light for window
        const light = new THREE.PointLight(0xff9500, 0.4, 8);
        light.position.set(4, 8 + i * 8, 0);
        rightTowerGroup.add(light);
    }

    rightTowerGroup.position.set(20, 0, -3);
    rightTowerGroup.userData = { interactive: true, type: 'rightTower' };
    rightTower = rightTowerGroup;
    scene.add(rightTower);
}

function buildEnvironment() {
    // Dead trees
    for (let i = 0; i < 8; i++) {
        const tree = createDeadTree();
        const angle = (i / 8) * Math.PI * 2;
        const radius = 40 + Math.random() * 20;
        tree.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
        );
        scene.add(tree);
    }

    // Rocks and debris
    for (let i = 0; i < 15; i++) {
        const rock = createRock();
        rock.position.set(
            (Math.random() - 0.5) * 100,
            0,
            (Math.random() - 0.5) * 100
        );
        scene.add(rock);
    }
}

function createDeadTree() {
    const treeGroup = new THREE.Group();
    
    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 8, 6);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2520,
        roughness: 1
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 4;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Twisted branches
    for (let i = 0; i < 3; i++) {
        const branchGeometry = new THREE.CylinderGeometry(0.1, 0.2, 4, 4);
        const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
        branch.position.set(
            (Math.random() - 0.5) * 2,
            6 + Math.random() * 2,
            (Math.random() - 0.5) * 2
        );
        branch.rotation.z = (Math.random() - 0.5) * Math.PI / 2;
        branch.castShadow = true;
        treeGroup.add(branch);
    }

    return treeGroup;
}

function createRock() {
    const geometry = new THREE.DodecahedronGeometry(1 + Math.random() * 2, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        roughness: 0.9,
        metalness: 0.1
    });
    const rock = new THREE.Mesh(geometry, material);
    rock.castShadow = true;
    rock.receiveShadow = true;
    rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    return rock;
}

function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1f1a,
        roughness: 0.95,
        metalness: 0.05
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    
    // Add some terrain variation
    const positions = groundGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const y = Math.random() * 0.5;
        positions.setY(i, y);
    }
    positions.needsUpdate = true;
    groundGeometry.computeVertexNormals();
    
    scene.add(ground);
}

function createMistParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 150;
        positions[i * 3 + 1] = Math.random() * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 150;

        velocities[i * 3] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 1] = Math.random() * 0.05;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
        color: 0x6a7a9a,
        size: 0.8,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.userData.velocities = velocities;
    scene.add(particleSystem);
    particles.push(particleSystem);
}

function updateParticles() {
    particles.forEach(system => {
        const positions = system.geometry.attributes.position.array;
        const velocities = system.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Reset particles that drift too far
            if (positions[i + 1] > 30) positions[i + 1] = 0;
            if (Math.abs(positions[i]) > 75) positions[i] = (Math.random() - 0.5) * 150;
            if (Math.abs(positions[i + 2]) > 75) positions[i + 2] = (Math.random() - 0.5) * 150;
        }

        system.geometry.attributes.position.needsUpdate = true;
    });
}

function updateLighting() {
    const time = clock.getElapsedTime();

    // Flicker window lights
    if (lights.windows) {
        lights.windows.forEach((windowLight, index) => {
            const flicker = Math.sin(time * windowLight.flickerSpeed + index) * 0.2 + 0.8;
            windowLight.light.intensity = windowLight.baseIntensity * flicker;
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    updateParticles();
    updateLighting();
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Export for use in other modules
window.sceneAPI = {
    init: initScene,
    animate: animate,
    getCamera: () => camera,
    getScene: () => scene,
    getMansion: () => mansion,
    getLeftTower: () => leftTower,
    getRightTower: () => rightTower
};
