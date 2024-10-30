const rockets = {
    2024: [
        {
            name: "Rowan rocket 1",
            specs: [
                { name: "HEIGHT", value: "22.25 m", imperial: "73 ft" },
                { name: "DIAMETER", value: "1.68 m", imperial: "5.5 ft" },
                { name: "MASS", value: "24.2964485 kg", imperial: "53.5645 lb" },
                { name: "PAYLOAD TO Destination", value: "670 kg", imperial: "1,480 lb" },
            ],
            description: "Rowan Rocketry's first orbital launch vehicle.",
            modelPath: "/placeholder.svg?height=400&width=200", // Placeholder image
            parts: [
                { name: "Nose Cone", description: "Aerodynamic tip of the rocket" },
                { name: "Payload Bay", description: "Houses the satellite or experimental equipment" },
                { name: "Fuel Tanks", description: "Stores the propellant for the engines" },
                { name: "Engines", description: "Provides thrust for the rocket" }
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
                { name: "PAYLOAD TO Destination", value: "2,000 kg", imperial: "4,400 lb" },
            ],
            description: "Rowan Rocket 2 is our most ambitious project, capable of reaching space.",
            modelPath: "/placeholder.svg?height=400&width=200",
            parts: [
                { name: "Advanced Nose Cone", description: "Improved aerodynamics for higher altitudes" },
                { name: "Expanded Payload Bay", description: "Larger capacity for multiple experiments" },
                { name: "Efficient Fuel Tanks", description: "Lightweight design for improved fuel efficiency" },
                { name: "Next-Gen Engines", description: "Higher thrust-to-weight ratio" }
            ]
        }
    ]
};

let currentYear = "2024";
let currentRocket = 0;
let currentPart = 0;
let scene, camera, renderer, rocket, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('rocket-canvas'), antialias: true });
    renderer.setSize(600, 400);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    setupYearTabs();
    loadRocket();
    updateRocketInfo();
    setupCarouselNav();
    updatePartInfo();
    setupPartNav();

    animate();
}

function setupYearTabs() {
    const yearTabs = document.querySelectorAll('.year-tab');
    yearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            yearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentYear = tab.dataset.year;
            currentRocket = 0;
            currentPart = 0;
            loadRocket();
            updateRocketInfo();
            setupCarouselNav();
            updatePartInfo();
            setupPartNav();
        });
    });
}

function loadRocket() {
    if (rocket) {
        scene.remove(rocket);
    }
    // Since we don't have actual 3D models, we'll create a simple shape
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    rocket = new THREE.Mesh(geometry, material);
    scene.add(rocket);
    // If you have actual 3D models, you can use the commented-out code from the original snippet
}

function animate() {
    requestAnimationFrame(animate);
    if (rocket) {
        rocket.rotation.y += 0.005;
    }
    controls.update();
    renderer.render(scene, camera);
}

function updateRocketInfo() {
    document.getElementById('rocket-name').textContent = rockets[currentYear][currentRocket].name;
    const specsContainer = document.getElementById('rocket-specs');
    specsContainer.innerHTML = '';
    rockets[currentYear][currentRocket].specs.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-name">${spec.name}</span>
            <span class="spec-value">${spec.value} <span>/ ${spec.imperial}</span></span>
        `;
        specsContainer.appendChild(specItem);
    });
}

function setupCarouselNav() {
    const nav = document.getElementById('carousel-nav');
    nav.innerHTML = '';
    rockets[currentYear].forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === currentRocket ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentRocket = index;
            currentPart = 0;
            updateRocketInfo();
            loadRocket();
            updateCarouselNav();
            updatePartInfo();
            setupPartNav();
        });
        nav.appendChild(dot);
    });
}

function updateCarouselNav() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentRocket);
    });
}

function updatePartInfo() {
    const currentRocketObj = rockets[currentYear][currentRocket];
    const part = currentRocketObj.parts[currentPart];
    
    document.getElementById('part-name').textContent = part.name;
    document.getElementById('part-description').textContent = part.description;
    highlightPart(currentPart);
}

function highlightPart(partIndex) {
    // This function would highlight the corresponding part on the 3D model
    // The implementation depends on how your 3D model is structured
    // For example, you might change the material color of the selected part
    console.log(`Highlighting part: ${rockets[currentYear][currentRocket].parts[partIndex].name}`);
}

function nextPart() {
    const currentRocketObj = rockets[currentYear][currentRocket];
    currentPart = (currentPart + 1) % currentRocketObj.parts.length;
    updatePartInfo();
    updatePartNav();
}

function prevPart() {
    const currentRocketObj = rockets[currentYear][currentRocket];
    currentPart = (currentPart - 1 + currentRocketObj.parts.length) % currentRocketObj.parts.length;
    updatePartInfo();
    updatePartNav();
}

function setupPartNav() {
    const partNav = document.getElementById('part-nav');
    partNav.innerHTML = '';
    const currentRocketObj = rockets[currentYear][currentRocket];
    currentRocketObj.parts.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `part-dot ${index === currentPart ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentPart = index;
            updatePartInfo();
            updatePartNav();
        });
        partNav.appendChild(dot);
    });
}

function updatePartNav() {
    const dots = document.querySelectorAll('.part-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPart);
    });
}

// Scroll to top functionality
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');

mobileMenuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Initialize everything
document.addEventListener('DOMContentLoaded', init);

document.querySelector('.prev-button').addEventListener('click', prevPart);
document.querySelector('.next-button').addEventListener('click', nextPart);
document.addEventListener('DOMContentLoaded', () => {
    const stats = {
        years: { element: document.getElementById('years-value'), target: 100 },
        events: { element: document.getElementById('events-value'), target: 500 },
        persons: { element: document.getElementById('persons-value'), target: 1000 },
        awards: { element: document.getElementById('awards-value'), target: 50 }
    };

    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(animationDuration / frameDuration);

    Object.values(stats).forEach(({ element, target }) => {
        let frame = 0;
        const countTo = parseInt(target, 10);
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(countTo * progress);

            if (parseInt(element.innerHTML, 10) !== currentCount) {
                element.innerHTML = currentCount;
            }

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    });
});