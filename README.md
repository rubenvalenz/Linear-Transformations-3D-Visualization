Video link: https://youtu.be/Z8zhmunwg-U


For this project, I used Three.js (JavaScript library and API), which is commonly used to display 3D graphics. My project consists of three
documents: main.js, styles.css, and index.html. To run my program, you might be driven to type 'http-server' in the terminal. However, this is
not recommendable mainly because the HTTP server is not good at handling dynamic 3D visualizations. Thus, we need to do something different
to run my program. If you are running my program on an online coding environment such as 'cs50.dev', make sure that Node.js (a JavaScript
runtime environment) is supported. To check this, type


   node -v


in your terminal window. It should display a number corresponding to the Node.js version that is supported by your online coding environment. If
you are running my program on a non-online coding environment, make sure to install Node.js on your machine. You can download it from this site: https://nodejs.org/en.


Now that you are all set with Node.js, the next step is to install three.js and a build tool, Vite, using a terminal in the project folder.
First, run


   cd LinearTransformations


in your terminal window to change directories. Once your terminal is in the project folder, run


   npm install three


in your terminal window to install the 'three' package using NPM, which is a JavaScript node package manager. Then, to install 'Vite,' a build tool, run


   npm install vite


in your terminal window. In case you are using an older NPM version (older than v5.0.0) to install three.js and Vite, run


   npm install --save three


   npm install --save-dev vite


respectively in your terminal window (always in the project directory). To check the NPM version, type


   npm -v


in your terminal window.


Now that you have installed the Three.js package and the build tool (Vite), you can enter


   npx vite


in your terminal window (always in the directory of the project) to run my program. You will see a URL like http://localhost:5173 appear in your
terminal window. Go to that URL to see my web application.


After going to the URL, you will see a parallelepiped (a solid body of which each face is a parallelogram) rotating dynamically, and on the
top-left corner of the screen, you will see a 3x3 matrix and a button that will apply the linear transformation (given by the entered matrix) to
the vectors that determine the parallelepiped. The parallelepiped is determined by three linealy independent vectors in R^3. You must click
the 'Apply Transformation' button every time you change the matrix and want to apply the transformation to the vectors that determine the
parallelepiped displayed. Remember that a linear transformation T always can be described with a matrix.


    T(x)=Ax


The pre-determined matrix is the identity matrix (a diagonal matrix with diagonal entries equal to one). Remember that a vector space that
undergoes a linear transformation whose standard matrix is the identity matrix does not change. That is why you see a normal cube, which is
determined by the standard coordinate vectors e_1, e_2, and e_3.


If you leave some of the entries of the matrix without a value, those entries will be taken as zeros.

