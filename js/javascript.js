import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const orbitalRadius = 1.25;
let angle = 0;
const textureMoonLoader = new THREE.TextureLoader();
const textureMoon = textureMoonLoader.load('textures/moon.jpg');
const materialMoon = new THREE.MeshBasicMaterial({ map: textureMoon });
const satelliteGeometry = new THREE.SphereGeometry(0.2, 58, 58);
const satellite = new THREE.Mesh(satelliteGeometry, materialMoon);

const geometry = new THREE.SphereGeometry(1, 64, 64);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('textures/4k_earth_daymap.png');
const bumpTexture = textureLoader.load('textures/4k_earth_heightmap.png');
const specularTexture = textureLoader.load('textures/4k_earth_specular_map.png');
const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 5,
    specularMap: specularTexture,
    specular: new THREE.Color(0x333333),
});
const earthMesh = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0x222222);
const pointLight = new THREE.PointLight(0xffffff, 8, 50);
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 3;

scene.add(earthMesh);
scene.add(ambientLight);
camera.add(pointLight);
scene.add(camera);
scene.add(satellite);

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10;

const animate = () => {
    requestAnimationFrame(animate);

    satellite.position.y = orbitalRadius * Math.cos(angle);
    satellite.position.z = orbitalRadius * Math.sin(angle);
    satellite.position.x = orbitalRadius * Math.cos(angle);
    angle += 0.01;

    earthMesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});