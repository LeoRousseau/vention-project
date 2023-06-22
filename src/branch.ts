import * as THREE from "three";
import { Tree } from "./tree";

const MAX_ANGLE = Math.PI / 3.0;

const getRandom = (max: number): number => Math.random() * max * 2 - max;

export class Branch {
  private _mesh: THREE.Mesh;

  private _childBranch: Branch[] = [];

  constructor(scene: THREE.Scene, depth: number, position: THREE.Vector3, parent?: THREE.Mesh) {
    this._createMesh(scene);

    const quaternion = parent ? parent.quaternion.clone() : new THREE.Quaternion();
    if (depth > 0) this._setBranchTransform(quaternion, position);

    if (depth < Tree.MaxDepth) this._createChildren(scene, depth);
    if (parent) parent.attach(this._mesh);
  }

  /**
   * Create Branch Mesh
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
   * Create all Branch children
   * @param scene - scene in which to add the mesh
   * @param depth - current depth value
   */
  private _createChildren(scene: THREE.Scene, depth: number) {
    for (let i = 0; i < Tree.Division; i++)
      this._childBranch.push(new Branch(scene, depth + 1, this._getMergingPoint(), this._mesh));

    this._mesh["onClick"] = (point: THREE.Vector3) => {
      this._childBranch.push(new Branch(scene, depth + 1, point, this._mesh));
    };
  }

  /**
   * Set Branch transform (rotation and position)
   * @param defaultQuaternion - base quaternion (quaternion of parent branch)
   * @param position - starting position of the branh
   */
  private _setBranchTransform(defaultQuaternion: THREE.Quaternion, position: THREE.Vector3) {
    this._mesh.quaternion.copy(defaultQuaternion.clone());
    this._mesh.position.copy(position);

    const parentDirection = new THREE.Vector3(0, 1, 0).applyQuaternion(defaultQuaternion.clone());
    const rotationAxis = this._getRandomOrthogonalAxis(parentDirection);

    this._mesh.rotateOnWorldAxis(rotationAxis, MAX_ANGLE);
  }

  private _getRandomOrthogonalAxis(currentAxis: THREE.Vector3): THREE.Vector3 {
    const randomAxis = new THREE.Vector3(getRandom(1), getRandom(1), getRandom(1));
    const result = new THREE.Vector3();
    result.crossVectors(randomAxis.normalize(), currentAxis.normalize());
    return result;
  }

  /**
   * Obtain a random position on the current branch where a child branch can be placed
   * @returns 
   */
  private _getMergingPoint(): THREE.Vector3 {
    return this._mesh.localToWorld(new THREE.Vector3(0, Math.random() / 2 + 0.5, 0));
  }

  rotate() {
    this._mesh.rotation.y -= 0.001;
    this._childBranch.forEach((b) => b.rotate());
  }
}
