import * as THREE from "three";
import { Tree } from "./tree";

const MAX_ANGLE = Math.PI / 3.0;

const getRandom = (max: number): number => Math.random() * max * 2 - max;

export class Branch {
  private readonly _mesh: THREE.Mesh;

  constructor(scene: THREE.Scene, depth: number, position: THREE.Vector3, defaultQuaternion: THREE.Quaternion) {
    const material = new THREE.MeshPhongMaterial({
      color: Math.random() * 0xffffff,
    });
    this._mesh = new THREE.Mesh(Tree.BranchGeometry, material);
    scene.add(this._mesh);

    if (depth > 0) this._setBranchTransform(defaultQuaternion, position);

    if (depth < Tree.MaxDepth) {
      for (let i = 0; i < Tree.Division; i++) new Branch(scene, depth + 1, this._getMergingPoint(), this._mesh.quaternion.clone());

      this._mesh["onClick"] = (point: THREE.Vector3) => {
        new Branch(scene, depth + 1, point, this._mesh.quaternion.clone());
      };
    }
  }

  private _setBranchTransform(defaultQuaternion: THREE.Quaternion, position: THREE.Vector3) {
    this._mesh.quaternion.copy(defaultQuaternion.clone());
    this._mesh.position.copy(position);

    const parentDirection = new THREE.Vector3(0, 1, 0).applyQuaternion(defaultQuaternion.clone());
    const rotationAxis = this._getRandomOrthogonalAxis(parentDirection);

    const angle = getRandom(MAX_ANGLE);
    this._mesh.rotateOnWorldAxis(rotationAxis, angle);
  }

  private _getRandomOrthogonalAxis(currentAxis: THREE.Vector3): THREE.Vector3 {
    const randomAxis = new THREE.Vector3(getRandom(1), getRandom(1), getRandom(1));
    const result = new THREE.Vector3();
    result.crossVectors(randomAxis.normalize(), currentAxis.normalize());
    return result;
  }

  private _getMergingPoint(): THREE.Vector3 {
    return this._mesh.localToWorld(new THREE.Vector3(0, Math.random() / 2 + 0.5, 0));
  }
}
