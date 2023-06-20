import * as THREE from 'three'

const MAX_ANGLE  = Math.PI/3.0;

export class Branch {
    private _mesh: THREE.Mesh;

    constructor(geometry : THREE.BufferGeometry, scene: THREE.Scene, parent?: THREE.Mesh, depth = 0, numberOfChild = 0) {
        const material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
        this._mesh = new THREE.Mesh(geometry, material);

        scene.add(this._mesh);

        if (parent) {
            this._mesh.parent = parent;
            this._mesh.rotateZ(Math.random() * MAX_ANGLE * 2 - MAX_ANGLE );
            this._mesh.translateY(1);
        }

        if (depth > 0) {
            for (let i=0; i<numberOfChild; i++) new Branch(geometry, scene, this._mesh, depth-1, numberOfChild);
        }
    }
}