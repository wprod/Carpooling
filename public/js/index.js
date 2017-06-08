
var Colors = {
	red:0x466fbf,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue: 0x68a53b,
};

window.addEventListener('load', init, false);

function init(e) {
	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	createLights();

	// add the objects
	createPlane();
	createearth();
	//createSky();
  
  // follow mouse
  document.addEventListener('mousemove', handleMouseMove, false);

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	loop();
  
  // temp render
  // renderer.render(scene, camera);
}

var scene,
		camera, 
    fieldOfView, 
    aspectRatio, 
    nearPlane, 
    farPlane, 
    HEIGHT, 
    WIDTH,
		renderer, 
    container;

function createScene() {
  HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
  
  scene = new THREE.Scene();
  
  // Camera Stuff
  aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 1000;
  
  camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);
  
  camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 50;
  
  // Renderer creation
  renderer = new THREE.WebGLRenderer({ 
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true, 

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine :)
		antialias: false 
	});
  
  renderer.setSize(WIDTH, HEIGHT);
  // shadows
  renderer.shadowMap.enabled = true;
  
  // add it
  container = document.getElementById('world');
	container.appendChild(renderer.domElement);
  
  window.addEventListener('resize', handleWindowResize, false);
  
}

function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

// Lighting stuff
var hemisphereLight, 
    shadowLight;

function createLights() {
  // hemisphere light is a gradient colored light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  
  // define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
  
  // define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
  
  scene.add(hemisphereLight);  
	scene.add(shadowLight);
  
  ambientLight = new THREE.AmbientLight(0xdc8874, .2);
  scene.add(ambientLight);
}

earth = function () {
  var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  
  //rotate that bad boy
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  
  geom.mergeVertices();
  
  var l = geom.vertices.length;
  
  this.waves = [];
  
  for (var i = 0; i < l; i++) {
    var v = geom.vertices[i];
    
    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random()*Math.PI*2,
      amp: 5 + Math.random()*15,
      speed: 0.016 + Math.random()*0.032
    });
  }
  
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    transparent: true,
    opacity: 0.6,
    shading: THREE.FlatShading
  });
  
  this.mesh = new THREE.Mesh(geom, mat);
  
  this.mesh.receiveShadow = true;
}


var earth;

function createearth() {
  earth = new earth();
  
  earth.mesh.position.y = -600;
  
  scene.add(earth.mesh);
}

Cloud = function () {
  this.mesh = new THREE.Object3D();
  
  var geom = new THREE.BoxGeometry(20,20,20);
  
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.white,
    transparent: true,
    opacity: 0.9,
    shading: THREE.FlatShading
  });
  
  // dupe it a few times
  var nBlocks = 3+Math.floor(Math.random()*3);
  for (var i = 0; i < nBlocks; i++) {
    var m = new THREE.Mesh(geom, mat);
    
    m.position.x = i*15;
    m.position.y = Math.random()*10;
    m.position.z = Math.random()*10;
    m.rotation.z = Math.random()*Math.PI*2;
    m.rotation.z = Math.random()*Math.PI*2;
    
    var s = .1 + Math.random() * 0.9;
    m.scale.set(s,s,s);
    
    m.castSahdow = true;
    m.receiveShadow = true;
    
    this.mesh.add(m);
  }
}

Sky = function () {
  this.mesh = new THREE.Object3D();
  
  this.nClouds = 20;
  
  var stepAngle = Math.PI*2 / this.nClouds;
  
  for (var i=0; i < this.nClouds; i++) {
    var c = new Cloud();
    
    var a = stepAngle*i;
    var h = 750 + Math.random()*200;
    
    c.mesh.position.y = Math.sin(a)*h;
    c.mesh.position.x = Math.cos(a)*h;
    
    c.mesh.rotation.z = a + Math.PI/2;
    c.mesh.position.z = -400-Math.random()*400;
    
    var s = 1+Math.random()*2;
    c.mesh.scale.set(s,s,s);
    
    this.mesh.add(c.mesh);
  }
  
}

var sky;

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

var AirPlane = function () {
  this.mesh = new THREE.Object3D();
  
  // cabin
  var geomCockpit = new THREE.BoxGeometry(120,40,40,1,1,1);
  var matCockpit = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading
  });
  
  geomCockpit.vertices[4].y -=10;
  geomCockpit.vertices[4].z +=20;
  geomCockpit.vertices[5].y -=10;
  geomCockpit.vertices[5].z -=20;
  geomCockpit.vertices[6].y +=30;
  geomCockpit.vertices[6].z +=20;
  geomCockpit.vertices[7].y +=30;
  geomCockpit.vertices[7].z -=20;
  
  var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  this.mesh.add(cockpit);
  
  // windshield
  var geomWs = new THREE.BoxGeometry(2,20,50,1,1,1);
  var matWs = new THREE.MeshPhongMaterial({
    color: Colors.white,
    transparent: true,
    opacity: 0.3,
    shading: THREE.FlatShading
  });
  var ws = new THREE.Mesh(geomWs, matWs);
  ws.castShadow = true;
  ws.receiveShadow = true;
  ws.rotation.z = 0.25;
  ws.position.set(57, 30, 0);
  this.mesh.add(ws);
 
  // engine
  var geomEngine = new THREE.BoxGeometry(20,40,40,1,1,1);
  var matEngine = new THREE.MeshPhongMaterial({
    color: Colors.white,
    shading: THREE.flatShading
  });
  
  geomEngine.vertices[0].x += 5;
  geomEngine.vertices[0].z -= 5;
  geomEngine.vertices[0].y -= 5;
  geomEngine.vertices[1].x += 5;
  geomEngine.vertices[1].z += 5;
  geomEngine.vertices[1].y -= 5;
  geomEngine.vertices[2].x += 5;
  geomEngine.vertices[2].y += 5;
  geomEngine.vertices[2].z -= 5;
  geomEngine.vertices[3].x += 5;
  geomEngine.vertices[3].y += 5;
  geomEngine.vertices[3].z += 5;
  
  var engine = new THREE.Mesh(geomEngine, matEngine);
  engine.position.x = 70;
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);
  
  // tail
  var geomTailPlane = new THREE.BoxGeometry(20,40,3,1,1,1);
  var matTailPlane = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading
  });
  
  geomTailPlane.vertices[0].x -= 10;
  geomTailPlane.vertices[1].x -= 10;
  
  var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-50,30,0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  this.mesh.add(tailPlane);
  
  // wing
  var geomSideWing = new THREE.BoxGeometry(40,2,390,1,1,1);
  var matSideWing = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading
  });
  
  geomSideWing.vertices[4].z += 10;
  geomSideWing.vertices[6].z += 10;
  
  geomSideWing.vertices[5].z -= 10;
  geomSideWing.vertices[7].z -= 10;
  
  
  var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
  sideWing.castShadow = true;
  sideWing.receiveShadow = true;
  this.mesh.add(sideWing);
  
  // tail wing
  var geomTailWing = new THREE.BoxGeometry(20,1,55,1,1,1);
  var matTailWing = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading
  });
  
  var tailWing = new THREE.Mesh(geomTailWing, matTailWing);
  tailWing.castShadow = true;
  tailWing.receiveShadow = true;
  
  geomTailWing.vertices[0].z -= 5;
  geomTailWing.vertices[2].z -= 5;
  geomTailWing.vertices[1].z += 5;
  
  tailWing.position.set(-50,10,0);
  this.mesh.add(tailWing);
  
  // prop
  var geomProp = new THREE.BoxGeometry(20,10,10,1,1,1);
  var matProp = new THREE.MeshPhongMaterial({
    color: Colors.brown,
    shading: THREE.FlatShading
  });
  this.prop = new THREE.Mesh(geomProp, matProp);
  this.prop.castShadow = true;
  this.prop.receiveShadow = true;
  
  //blades
  var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
  var matBlade = new THREE.MeshPhongMaterial({
    color: Colors.brownDark,
    shading: THREE.FlatShading
  });
  var blade = new THREE.Mesh(geomBlade, matBlade);
  blade.position.set(8,0,0);
  blade.castShadow = true;
  blade.receiveShadow = true;
  this.prop.add(blade);
  this.prop.position.set(85,0,0);
  this.mesh.add(this.prop);
}

var airplane;

function createPlane() {
  airplane = new AirPlane();
  airplane.mesh.scale.set(0.25,0.25,0.25);
  airplane.mesh.position.y = 100;
  airplane.mesh.rotation.x = 0.5;
  scene.add(airplane.mesh);
}

// Animation 

function loop () {
  airplane.prop.rotation.x += .3;
  earth.mesh.rotation.z += 0.005;
  //sky.mesh.rotation.z += 0.01;
  
  // update the plane
  updatePlane();
  
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

// Mouse follow

var mousePos = {
  x: 0,
  y: 0
};

function handleMouseMove (e) {
  // normalize mouse pos between -1 and 1
  
  var tx = -1 + (e.clientX / WIDTH) * 2;
  var ty = 1 - (e.clientY / HEIGHT) * 2;
  
  mousePos = {
    x: tx,
    y: ty
  };
}

function updatePlane () {
  var targetX = normalize(mousePos.x, -0.75, 0.75, -100, 100);
  var targetY = normalize(mousePos.y, -0.75, 0.75, 25, 175);
  
  airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.1;
  airplane.mesh.position.x += (targetX-airplane.mesh.position.x)*0.1;
  
  // rotate the plane
  airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.128;
  airplane.mesh.rotation.z = (airplane.mesh.position.y-targetY)*0.0064;
  
}

function normalize (v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}

// earth = function () {
//   var geom = new THREE.CylinderGeometry(600,600,800,40,10);
//   geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  
//   geom.mergeVertices();
// }