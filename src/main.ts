import * as THREE from 'three'
import { MainScene } from './main_scene';
import { MainCamera } from './camera';


// Initialize renderer
const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('app') as HTMLCanvasElement});
renderer.setSize(width, height);
renderer.setClearColor( 0xEEF1D4, 1 );

// Initialize scene and camera
const camera = new MainCamera(renderer, width/height);
const scene = new MainScene();
scene.initialize();


// Rendering
animate();
function animate() {
  requestAnimationFrame( animate );
  renderer.render(scene, camera);
}