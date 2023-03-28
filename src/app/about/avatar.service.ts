import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor() {}

  init(element: any) {
    let mixer: any;
    let mixer1: any;
    const clock = new THREE.Clock();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(100, 200, 300);
    const scene = new THREE.Scene();
    const fbxLoader = new FBXLoader();
    scene.add(camera);
    fbxLoader.load('assets/Chicken Dance.fbx', (object) => {
      console.log(object);
      mixer = new THREE.AnimationMixer(object);
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 100;
      const action = mixer.clipAction(object.animations[0]);
      action.play();

      // object.traverse(function (child) {

      //     if (child.isMesh) {

      //         child.castShadow = true;
      //         child.receiveShadow = true;

      //     }

      // });

      scene.add(object);
    });
    const fbxLoader1 = new FBXLoader();
    fbxLoader1.load('assets/Angry.fbx', (object) => {
      console.log(object);
      mixer1 = new THREE.AnimationMixer(object);
      object.position.x = 200;
      object.position.y = 0;
      object.position.z = 100;
      const action = mixer1.clipAction(object.animations[0]);
      action.play();

      // object.traverse(function (child) {

      //     if (child.isMesh) {

      //         child.castShadow = true;
      //         child.receiveShadow = true;

      //     }

      // });

      scene.add(object);
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    element.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    const controls = new OrbitControls(camera, element);
    controls.target.set(0, 1, 0);
    scene.background = new THREE.Color(0xa0a0a0);
    // scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
    controls.enableDamping = true;
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    scene.add(grid);
    console.log(camera);
    // const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } ) );
    // 				mesh.rotation.x =  Math.PI / 2;
    // 				scene.add( mesh );

    // 				const grid = new THREE.GridHelper( 200, 40, 0xffffff, 0xffffff );
    // 				grid.material.opacity = 0.2;
    // 				grid.material.transparent = true;
    // 				scene.add( grid );
    window.addEventListener('dblclick', () => {
      if (!document.fullscreenElement) {
        element.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    // window.addEventListener('resize', () => {
    //     sizes.width = window.innerWidth
    //     sizes.height = window.innerHeight

    //     camera.aspect = sizes.width / sizes.height
    //     camera.updateProjectionMatrix()

    //     renderer.setSize(sizes.width, sizes.height)
    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // })
    const animate = () => {
      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);
      if (mixer1) mixer1.update(delta);
      renderer.render(scene, camera);
      controls.update();

      window.requestAnimationFrame(animate);
    };

    animate();
  }
}
