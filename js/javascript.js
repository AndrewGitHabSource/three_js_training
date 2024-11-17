import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.SphereGeometry(1, 64, 64);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('textures/4k_earth_daymap.png');
const bumpTexture = textureLoader.load('path_to/earth_bump.png');
const specularTexture = textureLoader.load('path_to/4k_earth_heightmap.png');
const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.05,
    specularMap: specularTexture,
    specular: new THREE.Color(0x333333),
});
const earthMesh = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0x222222);
const pointLight = new THREE.PointLight(0xffffff, 275);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

earthTexture.wrapS = THREE.RepeatWrapping;
earthTexture.wrapT = THREE.RepeatWrapping;
earthTexture.flipY = false;
camera.position.z = 5;

scene.add(earthMesh);
scene.add(ambientLight);
pointLight.position.set(7, 4, 10);
scene.add(pointLight);

const animate = () => {
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();