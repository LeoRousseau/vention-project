import * as THREE from "three";
import { MainScene } from "./main_scene";
import { MainCamera } from "./camera";

// Initialize renderer
const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app") as HTMLCanvasElement });
renderer.setSize(width, height);
renderer.setClearColor(0xeef1d4, 1);

// Initialize scene and camera
const camera = new MainCamera(renderer, width / height);
const scene = new MainScene();
scene.initialize();

// Mesh Picking
const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();

function onDocumentMouseDown(event) {
  event.preventDefault();

  mousePosition.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) intersects[0].object["onClick"] && intersects[0].object["onClick"]( intersects[0].point);
}

window.addEventListener("click", onDocumentMouseDown, false);

// Rendering
animate();
function animate() {
  scene.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
