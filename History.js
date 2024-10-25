const rockets = {
    2023: {
        name: "rowan rocket 1",
        shortDescription: "Our first rocket capable of reaching space.",
        fullDescription: "This rocket is our most ambitious project to date, designed to reach the edge of space. This three-stage rocket incorporates cutting-edge materials and propulsion technology, allowing it to achieve unprecedented altitudes for a university-built rocket. Its payload capacity enables us to conduct experiments in microgravity and gather data from the mesosphere.",
        specs: {
            height: "25 m",
            diameter: "2.5 m",
            thrust: "200 kN",
            maxAltitude: "100 km"
        },
        additionalInfo: {
            propellantType: "Hybrid (Solid/Liquid)",
            stages: "Three-stage",
            payloadCapacity: "500 kg",
            recoverySystem: "Reusable first stage, parachute for upper stages",
            launchSite: "Kennedy Space Center"
        }
    },
    2024: {
        name: "rowan rocket 2",
        shortDescription: "Our latest rocket, pushing the boundaries of university rocketry.",
        fullDescription: "This rocket represents the pinnacle of our rocketry program, incorporating lessons learned from all previous projects. This advanced rocket features a revolutionary propulsion system, cutting-edge avionics, and a modular payload bay. Designed for suborbital flights, the Stargazer aims to set new records in altitude and payload capacity for university-built rockets.",
        specs: {
            height: "30 m",
            diameter: "3 m",
            thrust: "250 kN",
            maxAltitude: "120 km"
        },
        additionalInfo: {
            propellantType: "Liquid (LOX/Methane)",
            stages: "Two-stage",
            payloadCapacity: "750 kg",
            recoverySystem: "Fully reusable with propulsive landing",
            launchSite: "Pacific Spaceport Complex - Alaska"
        }
    }
};

let currentYear = '2023';
let scene, camera, renderer, rocket, stars, exhaust;
let isBoostAnimationActive = false;

function initThreeJS() {
    try {
        const container = document.getElementById('rocket-viewer');
        
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Set background to black
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Add stars
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = -Math.random() * 2000;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const spotlight = new THREE.SpotLight(0xffffff, 2);
        spotlight.position.set(5, 5, 5);
        spotlight.angle = 0.3;
        spotlight.penumbra = 0.5;
        spotlight.decay = 1;
        spotlight.distance = 20;
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 512;
        spotlight.shadow.mapSize.height = 512;
        scene.add(spotlight);

        createRocket();

        window.addEventListener('resize', onWindowResize, false);
        animate();

    } catch (error) {
        console.error("Error initializing Three.js:", error);
        document.getElementById('rocket-viewer').textContent = "Error loading 3D viewer";
    }
}

function createRocket() {
    rocket = new THREE.Group();

    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    rocket.add(body);

    const noseGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 2.5;
    nose.castShadow = true;
    nose.receiveShadow = true;
    rocket.add(nose);

    const finGeometry = new THREE.BoxGeometry(0.1, 1, 1);
    const finMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    for (let i = 0; i < 4; i++) {
        const fin = new THREE.Mesh(finGeometry, finMaterial);
        fin.position.y = -1.5;
        fin.rotation.y = (i * Math.PI) / 2;
        fin.castShadow = true;
        fin.receiveShadow = true;
        rocket.add(fin);
    }

    // Add exhaust
    const exhaustGeometry = new THREE.ConeGeometry(0.5, 2, 32);
    const exhaustMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff6600,
        transparent: true,
        opacity: 0.7
    });
    exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    exhaust.position.y = -3;
    exhaust.rotation.x = Math.PI;
    exhaust.visible = false;
    rocket.add(exhaust);

    scene.add(rocket);
}

function onWindowResize() {
    const container = document.getElementById('rocket-viewer');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    rocket.rotation.y += 0.01;
    stars.rotation.y += 0.0005;

    if (isBoostAnimationActive) {
        rocket.position.y += 0.05;
        if (rocket.position.y > 10) {
            rocket.position.y = -10;
        }
        exhaust.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.2;
    }

    renderer.render(scene, camera);
}

function toggleBoostAnimation() {
    isBoostAnimationActive = !isBoostAnimationActive;
    exhaust.visible = isBoostAnimationActive;
    if (!isBoostAnimationActive) {
        rocket.position.y = 0;
    }
    const boostButton = document.getElementById('boost-button');
    boostButton.textContent = isBoostAnimationActive ? 'Stop Boost' : 'Boost Rocket';
}

function updateRocketInfo(year) {
    currentYear = year;
    const currentRocket = rockets[year];
    document.getElementById('rocket-name').textContent = currentRocket.name;
    document.getElementById('rocket-description').textContent = currentRocket.shortDescription;
    
    const specsContainer = document.getElementById('rocket-specs');
    specsContainer.innerHTML = '';
    for (const [key, value] of Object.entries(currentRocket.specs)) {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `<span class="spec-label">${key}:</span> ${value}`;
        specsContainer.appendChild(specItem);
    }

    document.querySelectorAll('.year-button').forEach(button => {
        button.classList.toggle('active', button.dataset.year === year);
    });
}

function createYearSelector() {
    const yearSelector = document.getElementById('year-selector');
    Object.keys(rockets).forEach(year => {
        const yearButton = document.createElement('button');
        yearButton.className = 'year-button';
        yearButton.textContent = year;
        yearButton.dataset.year = year;
        yearButton.addEventListener('click', () => updateRocketInfo(year));
        yearSelector.appendChild(yearButton);
    });
}

function initializeModal() {
    const modal = document.getElementById("rocket-modal");
    const seeMoreBtn = document.getElementById("see-more-button");
    const boostBtn = document.getElementById("boost-button");
    const span = document.getElementsByClassName("close")[0];

    seeMoreBtn.addEventListener('click', function() {
        console.log('See More button clicked'); // Debug log
        const currentRocket = rockets[currentYear];
        document.getElementById("modal-title").textContent = currentRocket.name;
        document.getElementById("modal-description").textContent = currentRocket.fullDescription;
        
        const additionalInfoContainer = document.getElementById("modal-additional-info");
        additionalInfoContainer.innerHTML = '';
        for (const [key, value] of Object.entries(currentRocket.additionalInfo)) {
            const infoItem = document.createElement('p');
            infoItem.innerHTML = `<strong>${key}:</strong> ${value}`;
            additionalInfoContainer.appendChild(infoItem);
        }
        
        modal.style.display = "block";
    });

    boostBtn.addEventListener('click', toggleBoostAnimation);

    span.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

function initScrollToTop() {
    const scrollToTopButton = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    scrollToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initThreeJS();
    createYearSelector();
    updateRocketInfo(currentYear);
    initializeModal();
    initScrollToTop();
});