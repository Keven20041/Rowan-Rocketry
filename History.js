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
            modelPath: "/placeholder.svg?height=400&width=200" // Placeholder image
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
            modelPath: "/placeholder.svg?height=400&width=200" // Placeholder image
        }
    ]
};

let currentYear = "2024";
let currentRocket = 0;
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
            loadRocket();
            updateRocketInfo();
            setupCarouselNav();
        });
    });
}

function loadRocket() {
    if (rocket) {
        scene.remove(rocket);
    }

    // Since we don't have actual 3D models, we'll create a simple shape
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xc3ccccc });
    rocket = new THREE.Mesh(geometry, material);
    scene.add(rocket);

    // If you have actual 3D models, you can use this code instead:
    /*
    const loader = new THREE.GLTFLoader();
    loader.load(
        rockets[currentYear][currentRocket].modelPath,
        (gltf) => {
            if (rocket) {
                scene.remove(rocket);
            }
            rocket = gltf.scene;
            rocket.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
            scene.add(rocket);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
            // Fallback to a simple geometry if model fails to load
            const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
            rocket = new THREE.Mesh(geometry, material);
            scene.add(rocket);
        }
    );
    */
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
            updateRocketInfo();
            loadRocket();
            updateCarouselNav();
        });
        nav.appendChild(dot);
    });

    document.querySelector('.prev-button').addEventListener('click', () => {
        currentRocket = (currentRocket - 1 + rockets[currentYear].length) % rockets[currentYear].length;
        updateRocketInfo();
        loadRocket();
        updateCarouselNav();
    });

    document.querySelector('.next-button').addEventListener('click', () => {
        currentRocket = (currentRocket + 1) % rockets[currentYear].length;
        updateRocketInfo();
        loadRocket();
        updateCarouselNav();
    });
}

function updateCarouselNav() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentRocket);
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