/**
 * MyTile
 * @constructor
 */
function MyTile(scene, textInitialS, textInitialT, textFinalS, textFinalT) {
 	CGFobject.call(this,scene);
	this.textInitialS = textInitialS;
	this.textInitialT =textInitialT;
	this.textFinalS = textFinalS;
	this.textFinalT = textFinalT;


 	this.initBuffers();
};

MyTile.prototype = Object.create(CGFobject.prototype);
MyTile.prototype.constructor = MyTile;

MyTile.prototype.initBuffers = function() {
 	/*
 	 * Creates the vertices
 	 */
 	this.vertices = [
 	  0, 0, 0,
 	  1, 0, 0,
 	  1, 0, 1,
 	  0 ,0, 1
 	];

	/*
 	 * Creates the indices. According to GLUT, if second vertex is above and to the right of the first vertex, the rectangle is constructed with a counterclockwise winding.
 	 */

	this.indices = [
 	  	0, 2, 1, 
 	 	0, 3, 2
 	];

	/*
 	 * Creates the normals
 	 */
    this.normals = [
      0,1,0,
      0,1,0,
      0,1,0,
      0,1,0
    ];


	/*
 	 * Creates the base texture coordinates
 	 */
    this.texCoords = [
  		this.textInitialS, this.textInitialT,
  		this.textFinalS, this.textInitialT,
  		this.textFinalS, this.textFinalT,
  		this.textInitialS, this.textFinalT
    ];
	this.updateTexCoordsGLBuffers();

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};