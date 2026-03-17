const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a1a);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHT
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(0, 10, 10);
scene.add(light);

// TRACK
const track = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 200),
    new THREE.MeshBasicMaterial({ color: 0x222222 })
);
track.rotation.x = Math.PI / 2;
scene.add(track);

// CAR
const car = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.5, 2),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
car.position.set(0, 0.5, 5);
scene.add(car);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
