// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===== OBJECTS =====

// Projects (cube)
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
);
cube.position.x = -2;

// About (sphere)
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x22c55e })
);

// Mini Lab (torus)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xf59e0b })
);
torus.position.x = 2;

scene.add(cube, sphere, torus);

camera.position.z = 5;

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.01;

    torus.rotation.x += 0.01;

    renderer.render(scene, camera);
}

animate();
