import * as THREE from "three";
import { Branch } from "./branch";

const BRANCH_RADIUS = 0.02;

export class Tree {
  static BranchGeometry: THREE.BufferGeometry;
  static MaxDepth = 4;
  static Division = 2;

  private _mainBranch: Branch;

  constructor(private _scene: THREE.Scene) {
    Tree.BranchGeometry = new THREE.CylinderGeometry(BRANCH_RADIUS, BRANCH_RADIUS);
    Tree.BranchGeometry.translate(0, 0.5, 0);

    this._mainBranch = new Branch(this._scene, 0, new THREE.Vector3(), new THREE.Quaternion());
  }

  rotate() {
    this._mainBranch.rotate();
  }
}
