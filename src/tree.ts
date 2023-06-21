import * as THREE from "three";
import { Branch } from "./branch";

const BRANCH_RADIUS = 0.02;

export class Tree {
  static BranchGeometry: THREE.BufferGeometry;
  static MaxDepth = 3;
  static Division = 3;

  constructor(private _scene: THREE.Scene) {
    Tree.BranchGeometry = new THREE.CylinderGeometry(BRANCH_RADIUS, BRANCH_RADIUS);
    Tree.BranchGeometry.translate(0, 0.5, 0);
  }

  create() {
    new Branch(this._scene, 0, new THREE.Vector3(), new THREE.Quaternion());
  }
}
