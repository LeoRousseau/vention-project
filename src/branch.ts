import * as THREE from "three";
import { Tree } from "./tree";

const MAX_ANGLE = Math.PI / 3.0;

const getRandom = (max: number): number => Math.random() * max * 2 - max;

export class Branch {
  readonly mesh: THREE.Mesh;

  constructor(geometry: THREE.BufferGeometry, scene: THREE.Scene, depth: number, parent?: Branch) {
    const material = new THREE.MeshPhongMaterial({
      color: Math.random() * 0xffffff,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    scene.add(this.mesh);

    if (parent) this._setBranchTransform(parent);

    if (depth < Tree.maxDepth) {
      for (let i = 0; i < Tree.division; i++) new Branch(geometry, scene, depth + 1, this);
    }
  }

  private _setBranchTransform(parent: Branch) {
    this.mesh.rotation.copy(parent.mesh.rotation.clone());
    const parentVector = parent.getEndingPoint().sub(parent.getStartingPoint());
    const rotationAxis = this._getRandomOrthogonalAxis(parentVector);
    this.mesh.position.copy(parent.getEndingPoint());

    const angle = getRandom(MAX_ANGLE);
    this.mesh.rotateOnWorldAxis(rotationAxis, angle);
  }

  private _getRandomOrthogonalAxis(currentAxis: THREE.Vector3): THREE.Vector3 {
    const randomAxis = new THREE.Vector3(getRandom(1), getRandom(1), getRandom(1));
    const result = new THREE.Vector3();
    result.crossVectors(randomAxis.normalize(), currentAxis.normalize());
    return result;
  }

  getEndingPoint(): THREE.Vector3 {
    return this.mesh.localToWorld(new THREE.Vector3(0, Math.random() / 2  + 0.5, 0));
  }

  getStartingPoint(): THREE.Vector3 {
    return this.mesh.localToWorld(new THREE.Vector3(0, 0, 0));
  }
}
