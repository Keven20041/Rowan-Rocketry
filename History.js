import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

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
        { name: "Nose Cone", description: "Aerodynamic tip of the rocket that reduces air resistance.", weight: "7.231 kg", height: "2 m", diameter: "0.5 m" },
        { name: "Payload Fairing", description: "Protects the payload during launch and ascent.", weight: "200 kg", height: "4 m", diameter: "1.68 m" },
        { name: "Propellant Tanks", description: "Store the rocket's fuel and oxidizer.", weight: "2000 kg", height: "10 m", diameter: "1.68 m" },
        { name: "Engines", description: "Provide thrust to propel the rocket.", weight: "1000 kg", height: "3 m", diameter: "1.5 m" },
        { name: "Fins", description: "Stabilize the rocket during flight.", weight: "100 kg", height: "1.5 m", diameter: "0.3 m" }
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
  // No year buttons needed as we only have one year
}

function setupCarousel() {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  prevButton.addEventListener('click', () => changeIndex(-1));
  nextButton.addEventListener('click', () => changeIndex(1));
}

function changeIndex(direction) {
  const totalItems = 1 + rockets[2024][0].parts.length;
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

  controls = new OrbitControls(camera, renderer.domElement);
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

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);

  let modelPath;

  if (currentIndex === 0) {
    modelPath = 'c:\Users\Keven\Downloads\Solidworks\Rocket Assembly v3.GLB';
  } else {
    const partNames = ['nose_cone', 'payload_fairing', 'propellant_tanks', 'engines', 'fins'];
    modelPath = `/models/${partNames[currentIndex - 1]}.glb`;
  }

  // Show loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) loadingIndicator.style.display = 'block';

  loader.load(
    modelPath,
    (gltf) => {
      rocket = gltf.scene;
      scene.add(rocket);

      rocket.traverse((child) => {
        if (child.isMesh) {
          child.material.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <map_fragment>',
              `
              #ifdef USE_MAP
                vec4 texelColor = texture2D(map, vUv);
                if (texelColor.a < 0.5) discard;
                texelColor = mapTexelToLinear(texelColor);
                diffuseColor *= texelColor;
              #endif
              `
            );
          };
        }
      });

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(rocket);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      rocket.scale.setScalar(scale);
      rocket.position.sub(center.multiplyScalar(scale));

      // Hide loading indicator
      if (loadingIndicator) loadingIndicator.style.display = 'none';
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
      if (loadingIndicator) loadingIndicator.style.display = 'none';
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) {
        errorMessage.textContent = 'Failed to load the model. Please check if the file exists and try again.';
        errorMessage.style.display = 'block';
      }
      // Load a default cube if the model fails to load
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      rocket = new THREE.Mesh(geometry, material);
      scene.add(rocket);
    }
  );
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
  const currentRocket = rockets[2024][0];
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
  const totalItems = 1 + rockets[2024][0].parts.length;
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
    { id: 'events-value', value: 3 },
    { id: 'persons-value', value: 12 },
    { id: 'awards-value', value: 2 }
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