import * as THREE from "three";
import { Tree } from "./tree";

const BRANCH_ANGLE = Math.PI / 3.0;

export class Branch {
  private _mesh: THREE.Mesh;

  constructor(scene: THREE.Scene, depth: number, position: THREE.Vector3, parent?: THREE.Mesh) {
    this._createMesh(scene);

    const q = new THREE.Quaternion();
    const quaternion = parent ? parent.getWorldQuaternion(q).clone() : new THREE.Quaternion();
    if (depth > 0) this._setBranchTransform(quaternion, position);

    if (depth < Tree.MaxDepth) this._createChildren(scene, depth);
    parent?.attach(this._mesh);
  }

  /**
   * Creates Branch Mesh
   * @param scene - scene in which to add the mesh
   */
  private _createMesh(scene: THREE.Scene) {
    const material = new THREE.MeshPhongMaterial({
      color: Math.random() * 0xffffff,
    });
    this._mesh = new THREE.Mesh(Tree.BranchGeometry, material);
    scene.add(this._mesh);
  }

  /**
   * Creates all Branch children
   * @param scene - scene in which to add the mesh
   * @param depth - current depth value
   */
  private _createChildren(scene: THREE.Scene, depth: number) {
    for (let i = 0; i < Tree.Division; i++) new Branch(scene, depth + 1, this._getMergingPoint(), this._mesh);

    this._mesh["onClick"] = (point: THREE.Vector3) => {
      new Branch(scene, depth + 1, point, this._mesh);
    };
  }

  /**
   * Sets Branch transform (rotation and position)
   * @param defaultQuaternion - base quaternion (world quaternion of parent branch)
   * @param position - starting position of the branh
   */
  private _setBranchTransform(defaultQuaternion: THREE.Quaternion, position: THREE.Vector3) {
    this._mesh.quaternion.copy(defaultQuaternion.clone());
    this._mesh.position.copy(position);

    const parentDirection = new THREE.Vector3(0, 1, 0).applyQuaternion(defaultQuaternion.clone());
    this._mesh.rotateX(BRANCH_ANGLE);
    this._mesh.rotateOnWorldAxis(parentDirection, Math.random() * Math.PI * 2);
  }

  /**
   * Obtains a random position on the current branch where a child branch can be placed
   * @returns
   */
  private _getMergingPoint(): THREE.Vector3 {
    return this._mesh.localToWorld(new THREE.Vector3(0, Math.random() / 2 + 0.5, 0));
  }

  rotate() {
    this._mesh.traverse((m) => m.rotateY(0.001));
  }
}
