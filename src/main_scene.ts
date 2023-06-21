import * as THREE from "three";
import { Tree } from "./tree";

export class MainScene extends THREE.Scene {
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
    new Tree(this).create();
  }
}
