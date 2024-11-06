const rockets = {
    2024: [
        {
            name: "Rowan rocket 1",
            specs: [
                { name: "HEIGHT", value: "22.25 m", imperial: "73 ft" },
                { name: "DIAMETER", value: "1.68 m", imperial: "5.5 ft" },
                { name: "MASS", value: "30,000 kg", imperial: "66,000 lb" },
                { name: "PAYLOAD TO LEO", value: "670 kg", imperial: "1,480 lb" },
            ],
            description: "Rowan Rocketry's first orbital launch vehicle.",
            parts: [
                { name: "Nose Cone", description: "Aerodynamic tip of the rocket that reduces air resistance.", weight: "50 kg", height: "2 m", diameter: "0.5 m" },
                { name: "Payload Fairing", description: "Protects the payload during launch and ascent.", weight: "200 kg", height: "4 m", diameter: "1.68 m" },
                { name: "Propellant Tanks", description: "Store the rocket's fuel and oxidizer.", weight: "2000 kg", height: "10 m", diameter: "1.68 m" },
                { name: "Engines", description: "Provide thrust to propel the rocket.", weight: "1000 kg", height: "3 m", diameter: "1.5 m" },
                { name: "Fins", description: "Stabilize the rocket during flight.", weight: "100 kg", height: "1.5 m", diameter: "0.3 m" }
            ]
        }
    ],
    2025: [
        {
            name: "Rowan Rocket 2",
            specs: [
                { name: "HEIGHT", value: "30 m", imperial: "98.4 ft" },
                { name: "DIAMETER", value: "2.5 m", imperial: "8.2 ft" },
                { name: "MASS", value: "50,000 kg", imperial: "110,000 lb" },
                { name: "PAYLOAD TO LEO", value: "2,000 kg", imperial: "4,400 lb" },
            ],
            description: "Rowan Rocket 2 is our most ambitious project, capable of reaching space.",
            parts: [
                { name: "Advanced Nose Cone", description: "Improved aerodynamics for higher speeds.", weight: "75 kg", height: "2.5 m", diameter: "0.8 m" },
                { name: "Expanded Payload Bay", description: "Larger capacity for various mission types.", weight: "300 kg", height: "5 m", diameter: "2.5 m" },
                { name: "Cryogenic Propellant Tanks", description: "Store super-cooled propellants for increased efficiency.", weight: "3000 kg", height: "15 m", diameter: "2.5 m" },
                { name: "Multi-Stage Engines", description: "Provide optimal thrust at different altitudes.", weight: "1500 kg", height: "4 m", diameter: "2.2 m" },
                { name: "Grid Fins", description: "Improve steering during descent for potential reusability.", weight: "150 kg", height: "2 m", diameter: "0.5 m" }
            ]
        }
    ]
};

let currentYear = "2024";
let currentIndex = 0;
let scene, camera, renderer, rocket, controls;

function init() {
    setupYearButtons();
    setupCarousel();
    initThree();
    updateContent();
    setupScrollToTop();
    setupMobileMenu();
    animateStats();
   
}

function setupYearButtons() {
    const yearButtonsContainer = document.getElementById('year-buttons');
    Object.keys(rockets).forEach(year => {
        const button = document.createElement('button');
        button.textContent = year;
        button.classList.add('year-button');
        if (year === currentYear) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentYear = year;
            currentIndex = 0;
            updateContent();
            document.querySelectorAll('.year-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
        yearButtonsContainer.appendChild(button);
    });
}

function setupCarousel() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    prevButton.addEventListener('click', () => changeIndex(-1));
    nextButton.addEventListener('click', () => changeIndex(1));
}

function changeIndex(direction) {
    const totalItems = 1 + rockets[currentYear][0].parts.length;
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateContent();
}

function initThree() {
    const canvas = document.getElementById('rocket-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = true;
    controls.enablePan = false;

    loadRocket();
    animate();

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    const canvas = document.getElementById('rocket-canvas');
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function loadRocket() {
    if (rocket) {
        scene.remove(rocket);
    }

    const loader = new THREE.GLTFLoader();
    let modelUrl;

    switch (currentIndex) {
        case 0: // Full rocket
            modelUrl = '/assets/3d/duck.glb';
            break;
        case 1: // Nose Cone
            modelUrl = '/assets/3d/nose_cone.glb';
            break;
        case 2: // Payload Fairing
            modelUrl = '/assets/3d/payload_fairing.glb';
            break;
        case 3: // Propellant Tanks
            modelUrl = '/assets/3d/propellant_tanks.glb';
            break;
        case 4: // Engines
            modelUrl = '/assets/3d/engines.glb';
            break;
        case 5: // Fins
            modelUrl = '/assets/3d/fins.glb';
            break;
        default:
            modelUrl = '/assets/3d/full_rocket.glb';
    }
    
    loader.load(modelUrl, function(gltf) {
        rocket = gltf.scene;
        scene.add(rocket);

        // Center the model
        const box = new THREE.Box3().setFromObject(rocket);
        const center = box.getCenter(new THREE.Vector3());
        rocket.position.sub(center);

        // Adjust camera to fit the model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // Zoom out a little so object fits comfortably
        camera.position.z = cameraZ;
        camera.updateProjectionMatrix();

        // Update controls
        controls.target.set(0, 0, 0);
        controls.update();
    }, undefined, function(error) {
        console.error('An error happened', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (rocket) {
        rocket.rotation.y += 0.01; // Add continuous rotation
    }
    controls.update();
    renderer.render(scene, camera);
}

function updateContent() {
    const infoCard = document.getElementById('info-card');
    const currentRocket = rockets[currentYear][0];
    let content = '';

    if (currentIndex === 0) {
        content = `
            <h2>${currentRocket.name}</h2>
            <p>${currentRocket.description}</p>
            <div class="specs">
                ${currentRocket.specs.map(spec => `
                    <div class="spec-item">
                        <span class="spec-label">${spec.name}</span>
                        <span>${spec.value} / ${spec.imperial}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        const part = currentRocket.parts[currentIndex - 1];
        content = `
            <h2>${part.name}</h2>
            <p>${part.description}</p>
            <div class="specs">
                <div class="spec-item">
                    <span class="spec-label">Weight</span>
                    <span>${part.weight}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Height</span>
                    <span>${part.height}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Diameter</span>
                    <span>${part.diameter}</span>
                </div>
            </div>
        `;
    }

    infoCard.innerHTML = content;
    updateCarouselDots();
    loadRocket();
}

function updateCarouselDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    const totalItems = 1 + rockets[currentYear][0].parts.length;
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to item ${i + 1}`);
        if (i === currentIndex) {
            dot.classList.add('active');
            dot.setAttribute('aria-current', 'true');
        }
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateContent();
        });
        dotsContainer.appendChild(dot);
    }
}

function setupScrollToTop() {
    const scrollTopButton = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

function animateStats() {
    const stats = [
        { id: 'years-value', value: 10 },
        { id: 'events-value', value: 50 },
        { id: 'persons-value', value: 100 },
        { id: 'awards-value', value: 25 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            let current = 0;
            const increment = stat.value / 100;
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.round(current);
                if (current >= stat.value) {
                    element.textContent = stat.value;
                    clearInterval(timer);
                }
            }, 20);
        }
    });
}

document.addEventListener('DOMContentLoaded', init);

// For demonstration purposes, we'll log a message to the console
console.log("Rocket Viewer JavaScript loaded successfully!");