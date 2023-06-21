import * as THREE from 'three'
import { Tree } from './tree';

const MAX_ANGLE  = Math.PI/3.0;

export class Branch {

    readonly mesh: THREE.Mesh;
    readonly angle: number;

    constructor(geometry : THREE.BufferGeometry, scene: THREE.Scene, depth: number, parent?: Branch) {

        const material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        this.mesh = new THREE.Mesh(geometry, material);

        scene.add(this.mesh);
        this.angle = Math.random() * MAX_ANGLE * 2 - MAX_ANGLE; // TO FIX

        if (parent) {
            this.mesh.rotateZ((this.angle + parent.angle) % (Math.PI * 2));
            this.mesh.rotateOnWorldAxis(new THREE.Vector3(0,1,0), Math.random()* Math.PI * 2)
            this.mesh.position.copy(parent.getEndingPoint());
            this.mesh.translateY(0.5);
        }

        if (depth < Tree.maxDepth) {
            for (let i=0; i<Tree.division; i++) new Branch(geometry, scene, depth + 1, this);
        }

    }

    getEndingPoint(): THREE.Vector3 {
        return this.mesh.localToWorld(new THREE.Vector3(0, 0.5,0));
    }
}