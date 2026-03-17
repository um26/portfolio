// scene
const scene = new THREE.Scene();

// ===== SKY COLOR (no black void) =====
scene.background = new THREE.Color(0x0a0a1a);

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
const light = new THREE.PointLight(0xffffff, 3, 200);
light.position.set(0, 20, 10);
scene.add(light);

// ===== TRACK =====
const track = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 400),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
);
track.rotation.x = Math.PI / 2;
scene.add(track);

// ===== SIDE BARRIERS =====
function barrier(x) {
    const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1, 400),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    b.position.set(x, 0.5, -200);
    scene.add(b);
}

barrier(-10);
barrier(10);

// ===== CENTER LINES =====
const dashes = [];
for (let i = 0; i < 40; i++) {
    const dash = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.05, 3),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    dash.position.z = -i * 10;
    scene.add(dash);
    dashes.push(dash);
}

// ===== CAR (better shape) =====
const car = new THREE.Group();

const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.3, 3),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
);

const top = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.3, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
);
top.position.y = 0.3;

car.add(body);
car.add(top);
car.position.set(0, 0.3, 5);

scene.add(car);

// ===== BILLBOARDS (BIG + CLOSE) =====
function createBoard(text, x, z, color) {
    const board = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2, 0.5),
        new THREE.MeshStandardMaterial({
            color: color,
            emissive: color
        })
    );
    board.position.set(x, 2, z);
    scene.add(board);
}

// bring them closer
createBoard("PROJECTS", -8, -20, 0x00ffff);
createBoard("MINI LAB", 8, -40, 0xff00ff);
createBoard("LEADERSHIP", -8, -60, 0xffff00);
createBoard("RESUME", 8, -80, 0x00ff00);

// ===== CAMERA =====
camera.position.set(0, 3, 10);
camera.lookAt(0, 0, 0);

// ===== SCROLL =====
let scrollY = 0;
document.body.style.height = "4000px";

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
});

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);

    const targetZ = 10 - scrollY * 0.03;
    camera.position.z += (targetZ - camera.position.z) * 0.1;

    // move road lines
    dashes.forEach(d => {
        d.position.z += 0.6;
        if (d.position.z > camera.position.z) {
            d.position.z = camera.position.z - 200;
        }
    });

    renderer.render(scene, camera);
}

animate();
