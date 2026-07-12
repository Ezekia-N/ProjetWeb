import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';

const sideBar = document.getElementById("sideBar");
const sideBarMenu = document.querySelector(".sideBarMenu");
const bgCanvas = document.getElementById("bg-canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const ambientLight = new THREE.AmbientLight(0xffffff, 10); 
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
const renderer = new THREE.WebGLRenderer({
    canvas: bgCanvas,
    antialias: true,
    alpha: true
});

const loader = new GLTFLoader();

let model = null;

scene.position.set(0, 0, 0);
camera.position.set(0, 0, 90);
directionalLight.position.set(5, 10, 7);

scene.add(ambientLight);
scene.add(directionalLight);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

loader.load(
    './looking_glass_hologram_technology_meet_art.glb', (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0); 
        model.scale.set(1, 1, 1); 
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    (error) => {
        console.error("Erreur lors du chargement du fichier 3D :", error);
    }
);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
    requestAnimationFrame(animate);

    if (model) 
    {
        model.rotation.x += 0.005; 
        model.rotation.y += 0.005; 
    }

    renderer.render(scene, camera);
}
animate();

sideBar.addEventListener("click", e => {
    sideBarMenu.classList.toggle("active");
});
