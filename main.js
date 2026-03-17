// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===== LIGHTING =====
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(5, 5, 5);
scene.add(light);

// ===== OBJECTS =====

// Projects
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x002222 })
);
cube.position.x = -2;

// About
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x00ff88 })
);

// Mini Lab
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.2, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0xff9900 })
);
torus.position.x = 2;

scene.add(cube, sphere, torus);

// ===== STARS BACKGROUND =====
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starsVertices = [];

for (let i = 0; i < 5000; i++) {
    starsVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
    );
}

starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starsVertices, 3)
);

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// camera position
camera.position.z = 5;

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.01;

    torus.rotation.x += 0.01;

    stars.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();
