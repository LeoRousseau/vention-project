import * as THREE from 'three'
import { Branch } from './branch';

const BRANCH_RADIUS = 0.03;

export class Tree {
    private _branchGeometry : THREE.BufferGeometry;

    constructor(private _scene: THREE.Scene) {
        this._branchGeometry = new THREE.CylinderGeometry(BRANCH_RADIUS, BRANCH_RADIUS);
    }

    create() {
        new Branch(this._branchGeometry, this._scene, undefined, 3, 3);
    }
}