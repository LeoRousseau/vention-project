import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class MainCamera extends THREE.PerspectiveCamera {
    constructor(renderer : THREE.WebGLRenderer, aspectRatio: number) {
        super(60, aspectRatio, 0.1, 100);
        this.position.set(0,0,8);

        const controls = new OrbitControls( this, renderer.domElement );

        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
    }
}
