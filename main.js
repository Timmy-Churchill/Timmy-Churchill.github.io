import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {FlyControls} from "./FlyControls.js"



////////////////////////////////////////////////////
//                 Initializing                   //
////////////////////////////////////////////////////

//scene and scene background
const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('images/SpacePexels.jpg');
//scene.background = spaceTexture;


//camera, set camera position above and behind center
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
let moveRate = 1;
let starBlinker = 0;
camera.position.x = 0
camera.position.y = 20
camera.position.z = 100

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


function random(low, high){
  const range = high-low;
  return (Math.floor(Math.random()*(range+1)) + low)
}

////////////////////////////////////////////////////
//                    Shapes                      //
////////////////////////////////////////////////////
//Making the sun shape
const sunGeometry = new THREE.SphereGeometry(4, 24, 24);
const sunTexture = new THREE.TextureLoader().load('images/theSUN.jpg');
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
const primerTexture = new THREE.TextureLoader().load('images/planetTextures/primerPlanet.jpg');
const primerMaterial = new THREE.MeshStandardMaterial({map:primerTexture});
const primerPlanet = new THREE.Mesh(primerGeometry, primerMaterial);
primerPlanet.position.set(20, 0, 0);
scene.add(primerPlanet);

//Making the primer Planet
let primerPlanetX = 3000;


//making the 23cubed planet
const twentythreeGeometry = new THREE.SphereGeometry(3, 24, 24);
const twentythreeTexture = new THREE.TextureLoader().load('images/planetTextures/23cubed.png');
const twentythreeMaterial = new THREE.MeshStandardMaterial({map:twentythreeTexture});
const twentythreePlanet = new THREE.Mesh(twentythreeGeometry, twentythreeMaterial);
twentythreePlanet.position.set(0, 0, 20);
scene.add(twentythreePlanet);

//Making the primer Planet
let twentythreePlanetX = -3000;



//return button
const primerHomeGeometry1 = new THREE.BoxGeometry(6, 5, 6);
const primerHomeTexture1 = new THREE.TextureLoader().load('images/brickWall.jpg');
const primerHomeMaterial1 = new THREE.MeshStandardMaterial({map:primerHomeTexture1});
const primerHomePlanet1 = new THREE.Mesh(primerHomeGeometry1, primerHomeMaterial1);
primerHomePlanet1.position.set(0+primerPlanetX, 3, 0);
scene.add(primerHomePlanet1);

const primerHomeGeometry2 = new THREE.ConeGeometry(6, 3, 4, 1, false, Math.PI/4);
const primerHomeTexture2 = new THREE.TextureLoader().load('images/shingles.jpg');
const primerHomeMaterial2 = new THREE.MeshStandardMaterial({map:primerHomeTexture2});
const primerHomePlanet2 = new THREE.Mesh(primerHomeGeometry2, primerHomeMaterial2);
primerHomePlanet2.position.set(0+primerPlanetX, 6.5, 0);
scene.add(primerHomePlanet2);
//return button finished


const thisgeo = new THREE.BoxGeometry(1, 1, 1.618);
const rgbMaterial = new THREE.MeshNormalMaterial();
let boxesList = []
for (let i = 0; i < 40; i++) {
  boxesList[i] = new THREE.Mesh(thisgeo, rgbMaterial);
  boxesList[i].position.set(random(-100, 100), random(-100, 100), random(-100, 100))
  scene.add(boxesList[i])
}




////////////////////////////////////////////////////
//                    Lights                      //
////////////////////////////////////////////////////
//mainPointLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5, 0);
scene.add(ambientLight);



const color = 0xFFFCC9
const strength = 0.7
const distance = 0
const decay = 1
const distanceFromSun = 10

const pointLight1 = new THREE.PointLight(color, strength, distance, decay);
pointLight1.position.set(distanceFromSun, 0, 0);
scene.add(pointLight1)
const lightHelper1 = new THREE.PointLightHelper(pointLight1)
scene.add(lightHelper1)


const pointLight2 = new THREE.PointLight(color, strength, distance, decay);
pointLight2.position.set(-distanceFromSun, 0, 0);
scene.add(pointLight2)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
scene.add(lightHelper2)


const pointLight3 = new THREE.PointLight(color, strength, distance, decay);
pointLight3.position.set(0, distanceFromSun, 0);
scene.add(pointLight3)
const lightHelper3 = new THREE.PointLightHelper(pointLight3)
scene.add(lightHelper3)


const pointLight4 = new THREE.PointLight(color, strength, distance, decay);
pointLight4.position.set(0, -distanceFromSun, 0);
scene.add(pointLight4)
const lightHelper4 = new THREE.PointLightHelper(pointLight4)
scene.add(lightHelper4)


const pointLight5 = new THREE.PointLight(color, strength, distance, decay);
pointLight5.position.set(0, 0, distanceFromSun);
scene.add(pointLight5)
const lightHelper5 = new THREE.PointLightHelper(pointLight5)
scene.add(lightHelper5)

const pointLight6 = new THREE.PointLight(color, strength, distance, decay);
pointLight6.position.set(0, 0, -distanceFromSun);
scene.add(pointLight6)
const lightHelper6 = new THREE.PointLightHelper(pointLight6)
scene.add(lightHelper6)






////////////////////////////////////////////////////
//                    Helpers                     //
////////////////////////////////////////////////////


//gridHelper
const gridHelper = new THREE.GridHelper(3000, 100);
scene.add(gridHelper);






////////////////////////////////////////////////////
//            Fly Controls               //
////////////////////////////////////////////////////



const controls = new FlyControls(camera, renderer.domElement);


controls.movementSpeed = 0.3;
controls.dragToLook = true;





// const spiresPrefix = "images/dawnmountain-";
// const insideDirections  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
// const pngSuffix = ".png";
// const spiresGeometry = new THREE.BoxGeometry( 500, 500, 500 );	

// let materialArraySpires = [];

// for (let i = 0; i < 6; i++){
//   const spiresSideTexture = new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load( spiresPrefix + insideDirections[i] + pngSuffix ),
//     side: THREE.BackSide
//   })

//   materialArraySpires.push(spiresSideTexture);
// }


// const spiresBox = new THREE.Mesh( spiresGeometry, materialArraySpires );
// scene.add( spiresBox );




// const mountainPrefix = "images/mountains-";
// const jpgSuffix = ".jpg";
// const mountainGeometry = new THREE.BoxGeometry( 2000, 2000, 2000 );	

// let materialArrayMountains = [];

// for (let i = 0; i < 6; i++){
//   const mountainSideTexture = new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load( mountainPrefix + insideDirections[i] + jpgSuffix ),
//     side: THREE.BackSide
//   })

//   materialArrayMountains.push(mountainSideTexture);
// }


// const mountainBox = new THREE.Mesh( mountainGeometry, materialArrayMountains );
// scene.add( mountainBox );

// mountainBox.position.set(primerPlanetX, 0, 0);




////////////////////////////////////////////////////
//                    animate                     //
////////////////////////////////////////////////////

const animate = function () {

    const cameraScaleFactor = 1.2
    for (let i = 0; i < 40; i++) {
      
      const cameraHalfX = camera.position.x/cameraScaleFactor
      const cameraHalfY = camera.position.y/cameraScaleFactor
      const cameraHalfZ = camera.position.z/cameraScaleFactor
      boxesList[i].lookAt(new THREE.Vector3(cameraHalfX, cameraHalfY, cameraHalfZ));
    }
    
    starBlinker += 1;
    primerPlanet.position.x = 20*(Math.cos(starBlinker/100-0.4));
    primerPlanet.position.y = 5*(Math.sin(starBlinker/100));
    primerPlanet.position.z = 20*(Math.sin(starBlinker/100));

    twentythreePlanet.position.x = -50*(Math.cos(starBlinker/100));
    twentythreePlanet.position.y = 19*(Math.sin(starBlinker/100));
    twentythreePlanet.position.z = 50*(Math.sin(starBlinker/100-0.4));

    controls.update(2);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();























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
//   if (event.code === "Space"){
//       // Handle "up"
//       manuallyPan("y", 1, 5)
//       // manuallyPan("y", 1, moveRate)
//   } else if (event.code === "ArrowDown"){
//       // Handle "backward"
//       camera.rotation.x -= 0.05
//       //manuallyPan("y", -1, moveRate)
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
      
      camera.position.x += primerPlanetX;
      controls.target.x += primerPlanetX;
    


	} else if (intersects[i].object == sun){
    alert("sun")

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
 1) skybox


longterm:
1) for each project

  a) make the planet itself, fixing orbit, texture, and adding another if clause above
  b) make the scene it transports you to: probably move the camera super far away, add a new background, and try the box surrounding idea from http://stemkoski.github.io/Three.js/
  c) make a button to get back to home
  d) maybe make a character of some sort, that animates as you move and is always in the screen (3rd person pov) stu is a good concept, with one wheel
  e) make a skybox and world


2) make the sun link to a more traditional resume list, maybe add a picture of me somewhere (possibly replacing the sun)




1) series of game engines/solvers (chess, farkle, wordle)
2) 23 cubed 
3) Weather app
4) Neruel net (try to get the baseball thing working)
5) Academic History
6) Nobles app
7) Fun facts
8) Sports
9) contact me (instagram, email, github, linkedin)
*/



