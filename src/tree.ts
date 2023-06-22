import * as THREE from "three";
import { Branch } from "./branch";

const BRANCH_RADIUS = 0.02;

export class Tree {
  static BranchGeometry: THREE.BufferGeometry;
  static MaxDepth = 4;
  static Division = 2;

  private _isAnimated = false;
  private _mainBranch: Branch;

  constructor(private _scene: THREE.Scene) {
    Tree.BranchGeometry = new THREE.CylinderGeometry(BRANCH_RADIUS, BRANCH_RADIUS);
    Tree.BranchGeometry.translate(0, 0.5, 0);

    this._initURLParams();

    this._mainBranch = new Branch(this._scene, 0, new THREE.Vector3());
  }

  /**
   * Init MaxDepth, Division, isAnimated with URL Params
   */
  private _initURLParams() {
    const params = new URLSearchParams(window.location.search);
    const division = params.get('branch');
    if (division) Tree.Division = parseInt(division);

    const depth = params.get('depth');
    if (depth) Tree.MaxDepth = parseInt(depth);

    const animate = params.get('animate');
    if (animate) this._isAnimated = parseInt(animate) === 1;
  }

  rotate() {
    if (this._isAnimated) this._mainBranch.rotate();
  }
}
