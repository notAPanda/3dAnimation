import * as THREE from 'three';
import { TweenMax, TimelineMax, Expo } from 'gsap/TweenMax';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setClearColor('#e5e5e5');
renderer.setSize( window.innerWidth, window.innerHeight );

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial( { color: 0xffcc00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// const ambient = new THREE.AmbientLight( 0x404040 );
// scene.add(ambient)

const light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(10, 0, 25)
scene.add(light)

const handleClick = () => {
    
}

const animate = () => {
    requestAnimationFrame( animate );    
    renderer.render( scene, camera );
}

animate();

const tl = new TimelineMax().delay(.3)
tl.to(cube.scale, 1, { x: 2, ease: Expo.easeOut })
tl.to(cube.scale, .5, { x: .5, ease: Expo.easeOut })
tl.to(cube.position, .5, { x: 2, ease: Expo.easeOut })
tl.to(cube.rotation, .5, { y: Math.PI*.5, ease: Expo.easeOut }, '=-1.5')

document.body.addEventListener('click', handleClick)

