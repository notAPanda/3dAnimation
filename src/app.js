import * as THREE from 'three';
import { TweenMax, TimelineMax, Expo } from 'gsap/TweenMax';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

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

let objects = new Array(30).fill(null)
objects.map(o => {
    let cube = new THREE.Mesh( geometry, material );
    cube.position.x = (Math.random() - .5) * 100
    cube.position.y = (Math.random() - .5) * 100
    scene.add( cube );
    return cube
})

const light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(0, 0, 30)
scene.add(light)

const handleClick = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1    
    raycaster. setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children, true)
    intersects.map(element => {        
        const tl = new TimelineMax().delay(.3)
        tl.to(element.object.scale, 1, { x: 2, ease: Expo.easeOut })
        tl.to(element.object.scale, .5, { x: .5, ease: Expo.easeOut })
        tl.to(element.object.position, .5, { x: 0, ease: Expo.easeOut })
        tl.to(element.object.rotation, .5, { y: Math.PI*.5, ease: Expo.easeOut }, '=-1.5')
    })
    
}

const animate = () => {
    requestAnimationFrame( animate );    
    renderer.render( scene, camera );
}

animate();

document.body.addEventListener('click', handleClick)

