import * as THREE from "three";
import { Tree } from "./tree";

export class MainScene extends THREE.Scene {

  private _tree: Tree;
  public initialize() {
    this._createTree();
    this._createLight();
  }

  private _createLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 2);
    this.add(light);
  }

  private _createTree() {
    this._tree = new Tree(this);
  }

  update() {
    if (this._tree) this._tree.rotate();
  }
}
