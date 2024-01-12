// Import necessary THREE.js elements
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a box geometry
const originalGeometry = new THREE.BoxGeometry(1, 1, 1);
let geometry = originalGeometry.clone();

// Create the material for the box
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Green
    wireframe: true,  // Enable wireframe mode
    wireframeLinewidth: 1, // Width of the lines of the wireframe
  });

// Add the box to the scene
const parallelepiped = new THREE.Mesh(geometry, material);
scene.add(parallelepiped);

// Add the animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the parallelepiped
    parallelepiped.rotation.x += 0.01;
    parallelepiped.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize to adjust the screen in case the user zooms in/out too much
window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});

// Function to update the transformation matrix
window.updateTransformation = function updateTransformation() {
    // Get the input matrix and store the values in an array
    const values = [];
    for (let i = 1; i <= 9; i++) {
       const elementValue = parseFloat(document.getElementById('m' + i).value) || 0;
       values.push(elementValue);
    }

    // Set a new matrix
    const transformMatrix = new THREE.Matrix4().set(
       values[0], values[3], values[6], 0,
       values[1], values[4], values[7], 0,
       values[2], values[5], values[8], 0,
       0, 0, 0, 1
    );

    // Reset the geometry and apply the new transformation matrix
    parallelepiped.geometry = originalGeometry.clone();
    parallelepiped.geometry.applyMatrix4(transformMatrix);

    // Update the parallelepiped to reflect changes
    parallelepiped.geometry.verticesNeedUpdate = true;
    parallelepiped.geometry.normalsNeedUpdate = true;
    parallelepiped.geometry.computeBoundingSphere();
    parallelepiped.geometry.computeBoundingBox();
};

// Start the animation loop
animate();
