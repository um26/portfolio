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

// ===== LIGHT =====
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(5, 5, 5);
scene.add(light);

// ===== TRACK =====
const trackGeometry = new THREE.PlaneGeometry(5, 200);
const trackMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    side: THREE.DoubleSide
});
const track = new THREE.Mesh(trackGeometry, trackMaterial);
track.rotation.x = Math.PI / 2;
scene.add(track);

// ===== TRACK LINES =====
for (let i = 0; i < 20; i++) {
    const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.01, 2),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    line.position.z = -i * 10;
    scene.add(line);
}

// ===== BILLBOARDS (portfolio sections) =====
function createBoard(text, x, z) {
    const board = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
    );
    board.position.set(x, 1, z);
    scene.add(board);
}

// add sections
createBoard("Projects", -3, -20);
createBoard("Mini Lab", 3, -40);
createBoard("Leadership", -3, -60);
createBoard("Resume", 3, -80);

// ===== STARS =====
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starsVertices = [];
for (let i = 0; i < 3000; i++) {
    starsVertices.push(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
    );
}

starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starsVertices, 3)
);

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// ===== CAMERA START =====
camera.position.set(0, 2, 5);

// ===== SCROLL CONTROL =====
let scrollY = 0;

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
});

// make page scrollable
document.body.style.height = "5000px";

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);

    // move camera forward
    camera.position.z += (5 - scrollY * 0.01 - camera.position.z) * 0.1;

    renderer.render(scene, camera);
}

animate();
