import * as THREE from "three";
import { Branch } from "./branch";

const BRANCH_RADIUS = 0.02;

export class Tree {
  private _branchGeometry: THREE.BufferGeometry;

  static maxDepth = 0;
  static division = 0;

  constructor(private _scene: THREE.Scene) {
    this._branchGeometry = new THREE.CylinderGeometry(BRANCH_RADIUS, BRANCH_RADIUS);
    this._branchGeometry.translate(0, 0.5, 0);
    Tree.maxDepth = 3;
    Tree.division = 3;
  }

  create() {
    new Branch(this._branchGeometry, this._scene, 0, undefined);
  }
}
