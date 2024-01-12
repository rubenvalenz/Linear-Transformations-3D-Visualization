For this project, I used Three.js (JavaScript library/API) because it made it easy to render a visualization of 3D figures. In this case, the visualization of a parallelepiped. I also chose Three.js because when dealing with cubes (parallelepipeds in general), there is a feature that allows you to directly apply a linear transformation given by a 4x4 matrix to the vector space in which the cube (parallelepiped) exists. So, the first thing I did was import the three.js library.


  // Import necessary THREE.js elements
  import * as THREE from 'three';


In order to display a 3D visual animation, you need to have three things first: a scene, a camera, and a renderer. You can find the code to do this in the Three.js manual (https://threejs.org/).


  // Create a scene
  const scene = new THREE.Scene();


  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;


  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


Because it is easier to visualize the linear transformations if the parallelepiped is transparent and only the corners and edges are visible, I adjusted the properties of the material of the square so that it has a wire-frame.


  const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00, // Green
      wireframe: true,  // Enable wireframe mode
      wireframeLinewidth: 1, // Width of the lines of the wireframe
  });


Now, at this point, we are all set to create a box (our parallelepiped).


  const originalGeometry = new THREE.BoxGeometry(1, 1, 1);


Because the pre-determined matrix is the identity matrix, we want to see a normal cube, which is determined by the standard coordinate vectors e_1, e_2, and e_3. Thus, the dimensions of this box (cube) are one in height, width, and depth.


One of the problems I was running into while trying to take user input (in the form of a matrix) and applying a new linear transformation to the parallelepiped in real time, was that, if the user had changed the form of the cube before by applying a linear transformation, the next linear transformation would be applied to the already modified parallelepiped (not to the original 1x1x1 cube). Thus, it was impossible to go back to the original cube after a transformation. This happened because a linear transformation affected directly the original object, and thus, the initial shape of the object was lost forever. Thus, I had to create a clone of the original cube. By cloning it, you can make changes to the clone without affecting the original.


  let geometry = originalGeometry.clone();


In the line of code from the main.js file number 70-72, inside the updateTransformation() function:


  // Reset the geometry and apply the new transformation matrix
  parallelepiped.geometry = originalGeometry.clone();
  parallelepiped.geometry.applyMatrix4(transformMatrix);


By resetting 'parallelepiped.geometry' to a clone of the original before applying the transformation, the original geometry remains unchanged, and the transformations are applied to the cloned parallelepiped, giving the desired effect without altering the original geometry.


Now, with respect to the updateTransformation() function, which is called whenever the user clicks the 'Apply Transformation' button, I used a for loop to get the user-input values from the entries of the matrix to make it more efficient. I stored the values in an array.


  // Get the input matrix and store the values in an array
  const values = [];
  for (let i = 1; i <= 9; i++) {
     const elementValue = parseFloat(document.getElementById('m' + i).value) || 0;
     values.push(elementValue);
  }


Because the purpose of this function is to take a new matrix and apply a linear transformation given by that matrix to the shape of the parallelepiped, we need a new matrix with the values entered by the user.


  // Set a new matrix
  const transformMatrix = new THREE.Matrix4().set(
     values[0], values[3], values[6], 0,
     values[1], values[4], values[7], 0,
     values[2], values[5], values[8], 0,
     0, 0, 0, 1
  );


Notice that I am always using a 4x4 matrix, even though I only care about the top-left 3x3 block because Three.js only includes a specific function, 'applyMatrix4()', to apply a linear transformation described by a 4x4 matrix to the vectors that span a parallelepiped in R^3. Values of the matrix in the entries (1,4), (2,4), (3,4), (4,4), (4,1), (4,2), and (4,3) are not relevant in the context of my program though they do have a function. For example, the value of entry (4,4) in the matrix directly increases or decreases the dimensions of the parallelepiped, but I only want to allow the user to see how the vectors that determine the parallelepiped change given a 3x3 matrix that represents a linear transformation. I am not interested in allowing users to change how big or small the parallelepiped is because that is not relevant in the context of linear algebra and linear transformations in the context of my program.


After you collect the user's input in the 'values' array, you need to update the shape of the parallelepiped accordingly. You can find how to do this in the documentation for matrix transformations on threejs.org.


   // Reset the geometry and apply the new transformation matrix
   parallelepiped.geometry = originalGeometry.clone();
   parallelepiped.geometry.applyMatrix4(transformMatrix);


   // Update the parallelepiped to reflect changes
   parallelepiped.geometry.verticesNeedUpdate = true;
   parallelepiped.geometry.normalsNeedUpdate = true;
   parallelepiped.geometry.computeBoundingSphere();
   parallelepiped.geometry.computeBoundingBox();


Now, with respect to the 'animate()' function, you can alter how pronounced the rotation of the parallelepiped is with these two lines of code.


   // Rotate the parallelepiped
   parallelepiped.rotation.x += 0.01;
   parallelepiped.rotation.y += 0.01;


Again, the code for the 'animate()' function is pretty standard and can be found in the 'Creating a Scene' section from the Three.js manual online on threejs.org.


The last thing I did was make sure that my web application could handle window resizing using this piece of code.


   // Handle window resize to adjust the screen in case the user zooms in/out too much
   window.addEventListener('resize', function () {
       const newWidth = window.innerWidth;
       const newHeight = window.innerHeight;


       renderer.setSize(newWidth, newHeight);
       camera.aspect = newWidth / newHeight;
       camera.updateProjectionMatrix();
   });


Now, with respect to my index.html file, I used the #matrixInput id to adjust the format of the boxes for the entries of the matrix. The place holder for each box is '0' because in case the user forgets to fill out one of the entries of the array, my program will consider those empty entries as zero entries. Also, in order for the program to be more fluent, I set the steps of the numbers of each entry to 0.01, so that a long float does not cause any problem.


Finally, with respect to my style.css file, I added some code so that my program can handle smaller scheen sizes. I tried to make it more 'responsive.'


    /* Media query for smaller screens */
    @media screen and (max-width: 600px) {
        #matrixInput {
            position: static;
            width: 80%;
            margin: 20px auto;
        }
    }


I also added some animations to the 'Apply Transformation' button.


    #matrixInput button:hover {
        background-color: #45a049;
    }


Also, I set the margin of the 'body' to zero because, for some reason, when creating a scene with Three.js, a white border appeared on the left and top side of the screen. Everything else in my 'styles.css' file was pretty standard. I used some AI (ChatGPT 2023) to give a better appearance to the matrix. 
