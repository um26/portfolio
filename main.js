// scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 100);

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

// ===== LIGHT =====
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 5, 5);
scene.add(light);

// ===== TRACK =====
const track = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 500),
    new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        emissive: 0x111111
    })
);
track.rotation.x = Math.PI / 2;
scene.add(track);

// ===== NEON SIDE LINES =====
function createNeonLine(x) {
    const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.05, 500),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
    );
    line.position.x = x;
    scene.add(line);
}
createNeonLine(-3.5);
createNeonLine(3.5);

// ===== MOVING ROAD DASHES =====
const dashes = [];

for (let i = 0; i < 50; i++) {
    const dash = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.05, 2),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    dash.position.z = -i * 10;
    scene.add(dash);
    dashes.push(dash);
}

// ===== "CAR" =====
const car = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.3, 2),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
car.position.set(0, 0.2, 3);
scene.add(car);

// ===== BILLBOARDS =====
function createBoard(text, x, z, color) {
    const board = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.5, 0.2),
        new THREE.MeshStandardMaterial({
            color: color,
            emissive: color
        })
    );
    board.position.set(x, 1.5, z);
    scene.add(board);
}

// Bigger + visible boards
createBoard("PROJECTS", -5, -30, 0x00ffff);
createBoard("MINI LAB", 5, -60, 0xff00ff);
createBoard("LEADERSHIP", -5, -90, 0xffff00);
createBoard("RESUME", 5, -120, 0x00ff00);

// ===== STARS =====
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

// ===== CAMERA =====
camera.position.set(0, 2, 6);

// ===== SCROLL =====
let scrollY = 0;
document.body.style.height = "5000px";

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
});

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);

    // camera forward
    const targetZ = 6 - scrollY * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.1;

    // move road dashes (speed illusion)
    dashes.forEach(d => {
        d.position.z += 0.5;
        if (d.position.z > camera.position.z) {
            d.position.z = camera.position.z - 200;
        }
    });

    renderer.render(scene, camera);
}

animate();
