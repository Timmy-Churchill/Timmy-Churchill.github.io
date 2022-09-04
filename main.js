import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {FirstPersonControls} from "/Users/timothychurchill/Documents/code/JS/threeJS/myWebsite/node_modules/three/examples/jsm/controls/FirstPersonControls";










////////////////////////////////////////////////////
//                 Initializing                   //
////////////////////////////////////////////////////

//scene and scene background
const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('images/SpacePexels.jpg');
scene.background = spaceTexture;


//camera, set camera position above and behind center
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let moveRate = 1;
let starBlinker = 0;
camera.position.x = 0
camera.position.y = 20
camera.position.z = -30

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );








////////////////////////////////////////////////////
//                    Shapes                      //
////////////////////////////////////////////////////
//Making the sun shape
const sunGeometry = new THREE.SphereGeometry(4, 24, 24);
const sunTexture = new THREE.TextureLoader().load('/Users/timothychurchill/Documents/code/JS/threeJS/myWebsite/images/theSUN.jpg');
const sunMaterial = new THREE.MeshPhongMaterial({map:sunTexture});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
scene.add(sun);



//Making the stars
function makeStar(){
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [ x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(makeStar);

//making the planets
const primerGeometry = new THREE.SphereGeometry(1, 24, 24);
const primerTexture = new THREE.TextureLoader().load('/Users/timothychurchill/Documents/code/JS/threeJS/myWebsite/images/planetTextures/primerPlanet.jpg');
const primerMaterial = new THREE.MeshBasicMaterial({map:primerTexture});
const primerPlanet = new THREE.Mesh(primerGeometry, primerMaterial);
primerPlanet.position.set(20, 0, 0);
scene.add(primerPlanet);

//Making the primer Planet
let primerPlanetX = 1000;
const planetSurfaceGeometry = new THREE.PlaneGeometry(200, 200);
const primerPlanetSurfaceTexture = new THREE.TextureLoader().load('/Users/timothychurchill/Documents/code/JS/threeJS/myWebsite/images/planetTextures/primerPlanet.jpg');
const primerPlanetSurfaceMaterial = new THREE.MeshBasicMaterial({map:primerPlanetSurfaceTexture});
const primerPlanetSurface = new THREE.Mesh(planetSurfaceGeometry, primerPlanetSurfaceMaterial);
primerPlanetSurface.position.set(primerPlanetX , 0, 0);
primerPlanetSurface.rotation.x = -Math.PI / 2
scene.add(primerPlanetSurface);


//return button
const primerHomeGeometry1 = new THREE.BoxGeometry(6, 5, 6);
const primerHomeTexture1 = new THREE.TextureLoader().load('/Users/timothychurchill/Documents/code/JS/threeJS/myWebsite/images/brickWall.jpg');
const primerHomeMaterial1 = new THREE.MeshBasicMaterial({map:primerHomeTexture1});
const primerHomePlanet1 = new THREE.Mesh(primerHomeGeometry1, primerHomeMaterial1);
primerHomePlanet1.position.set(0+primerPlanetX, 3, 0);
scene.add(primerHomePlanet1);

const primerHomeGeometry2 = new THREE.ConeGeometry(6, 3, 4, 1, false, Math.PI/4);
const primerHomeTexture2 = new THREE.TextureLoader().load('/Users/timothychurchill/Documents/code/JS/threeJS/myWebsite/images/shingles.jpg');
const primerHomeMaterial2 = new THREE.MeshBasicMaterial({map:primerHomeTexture2});
const primerHomePlanet2 = new THREE.Mesh(primerHomeGeometry2, primerHomeMaterial2);
primerHomePlanet2.position.set(0+primerPlanetX, 6.5, 0);
scene.add(primerHomePlanet2);
//return button finished













////////////////////////////////////////////////////
//                    Lights                      //
////////////////////////////////////////////////////
//mainPointLight
const sunPointLight = new THREE.AmbientLight(0xffffff, 0.7, 0, 1.4);
sunPointLight.position.set(0,0,0);
scene.add(sunPointLight);


      






////////////////////////////////////////////////////
//                    Helpers                     //
////////////////////////////////////////////////////


//gridHelper
const gridHelper = new THREE.GridHelper(3000, 100);
scene.add(gridHelper);






////////////////////////////////////////////////////
//            First Person Controls               //
////////////////////////////////////////////////////



const controls = new FirstPersonControls(camera, renderer.domElement);


controls.lookSpeed  =.003;
controls.autoForward = false;
controls.movementSpeed = 1;













// ////////////////////////////////////////////////////
// //                  mouse move                    //
// ////////////////////////////////////////////////////


// const mouse = new THREE.Vector2();
// const target = new THREE.Vector2();
// const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );


// document.addEventListener( 'mousemove', onMouseMove );
// document.addEventListener( 'wheel', onMouseWheel );


// function onMouseMove( event ) {

// 	mouse.x = ( event.clientX - windowHalf.x );
// 	mouse.y = ( event.clientY - windowHalf.y );
// }

// function onMouseWheel( event ) {

//   camera.position.z += event.deltaY * 0.1; // move camera along z-axis

// }


















////////////////////////////////////////////////////
//                    animate                     //
////////////////////////////////////////////////////

const animate = function () {
    
    
    starBlinker += 1;
    primerPlanet.position.x = 20*(Math.cos(starBlinker/100-0.4));
    primerPlanet.position.y = 5*(Math.sin(starBlinker/100));
    primerPlanet.position.z = 20*(Math.sin(starBlinker/100));

    if (controls.mouseDragOn == true){
      setTimeout(() => { 
        controls.activeLook = true;
        controls.movementSpeed = 0;
       }, 1000);
      
      
    } else {
      controls.activeLook = false
      controls.movementSpeed = 1;
    }
    
    controls.handleResize ()
    controls.update(1.0);
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();

//new commit





















// //lots of defenitions for possible use of x and z axes. But rn, only used for arrows moving up and down
// function fixTargets(oldX, oldY, oldZ){
//   controls.target.x += (camera.position.x - oldX);
//   controls.target.y += (camera.position.y - oldY);
//   controls.target.z += (camera.position.z - oldZ);
// }
// function manuallyPan(axis, parity, moveRate){
//   let oldX = camera.position.x
//   let oldY = camera.position.y
//   let oldZ = camera.position.z
//   switch (axis){
//     case "x":
//       camera.translateX(moveRate * parity);
//       fixTargets(oldX, oldY, oldZ);
//       break;

//     case "y":
//       camera.translateY(moveRate * parity);
//       fixTargets(oldX, oldY, oldZ);
//       break;
    
//     case "z":
//       camera.translateZ(moveRate * parity);
//       fixTargets(oldX, oldY, oldZ);
//       break;
//   }
// }
// //Controls arrow keys
// window.addEventListener("keydown", function(event) {
//   if (event.defaultPrevented) {
//     return;
//   }
//   if (event.code === "ArrowUp"){
//       // Handle "up"
//       camera.rotation.x += 0.05
//       // manuallyPan("y", 1, moveRate)
//   } else if (event.code === "ArrowDown"){
//       // Handle "backward"
//       camera.rotation.x -= 0.05
//       //manuallyPan("y", -1, moveRate)
//   } else if (event.code === "ArrowLeft"){
//     // Handle "up"
//     camera.rotation.y += 0.05
//     // manuallyPan("y", 1, moveRate)
//   } else if (event.code === "ArrowRight"){
//       // Handle "backward"
//       camera.rotation.y -= 0.05
//       //manuallyPan("y", -1, moveRate)
//   } else if (event.code === "KeyW"){
//     // Handle "up"
//     camera.rotation.z += 0.05
//     // manuallyPan("y", 1, moveRate)
//   } else if (event.code === "KeyS"){
//     // Handle "backward"
//     camera.rotation.z -= 0.05
//     //manuallyPan("y", -1, moveRate)
//   }
// });














////////////////////////////////////////////////////
//                   Raycaster                    //
////////////////////////////////////////////////////



const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onClick( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

    if (intersects[i].object == primerPlanet){

      camera.position.x += 1000;
      controls.target.x += 1000;


	} else if (intersects[i].object == sun){
    alert("sun")
    scene.background = sunTexture;

  }

	renderer.render( scene, camera );

  }  

}

window.addEventListener( 'click', onClick );





////////////////////////////////////////////////////
//                    TODO                     //
////////////////////////////////////////////////////
/*

shortTerm:



longterm:
1) make a list of projects I want to display (below)
2) for each project
  a) make the planet itself, fixing orbit, texture, and adding another if clause above
  b) make the scene it transports you to: probably move the camera super far away, add a new background, and try the box surrounding idea from http://stemkoski.github.io/Three.js/
  c) make a button to get back to home
  d) maybe make a character of some sort, that animates as you move and is always in the screen (3rd person pov) stu is a good concept, with one wheel
3) make the sun link to a more traditional resume list, maybe add a picture of me somewhere (possibly replacing the sun)



*/



