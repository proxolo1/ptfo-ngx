import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AvatarService } from './avatar.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

  constructor(private avatarService: AvatarService) {}

  ngOnInit() {
    const canvas = document.querySelector('canvas') || null;
    this.init(canvas);
  }
  init(canvas: any) {
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    camera.position.z = 10;
    renderer.setSize(window.innerWidth, window.innerHeight);
    const controller=new OrbitControls(camera,renderer.domElement);
    controller.update();
    const geometry = new THREE.TorusGeometry(1, 0.5, 50, 50);
    const material = new THREE.MeshNormalMaterial();
    for(let i=0;i<200;i++){
      const torus = new THREE.Mesh(geometry, material);
      torus.position.set((Math.random()-0.5)*40,(Math.random()-0.5)*40,(Math.random()-0.5)*40);
      torus.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
      let size=Math.random();
      torus.scale.set(size,size,size)
      scene.add(torus);
     
    }
    const loader = new GLTFLoader();
    let i=0;
    function animate() {
     
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }

}

