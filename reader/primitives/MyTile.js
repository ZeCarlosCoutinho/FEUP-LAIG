/**
 * MyTile
 * @constructor
 */
function MyTile(scene, x1, y1, x2, y2, txInitial, txFinal) {
 	CGFobject.call(this,scene);

	
 	this.x1 = x1;
 	this.y1 = y1;
	this.x2 = x2;
 	this.y2 = y2;
 	this.textureInitialPoint = txInitial;
 	this.textureFinalPoint = txFinal;

 	this.initBuffers();
};

MyTile.prototype = Object.create(CGFobject.prototype);
MyTile.prototype.constructor = MyTile;

MyTile.prototype.initBuffers = function() {
 	/*
 	 * Creates the vertices
 	 */
 	this.vertices = [
 	  this.x1, this.y1, 0,
 	  this.x2, this.y1, 0,
 	  this.x2, this.y2, 0,
 	  this.x1, this.y2, 0
 	];

	/*
 	 * Creates the indices. According to GLUT, if second vertex is above and to the right of the first vertex, the rectangle is constructed with a counterclockwise winding.
 	 */
	if ((this.x2 > this.x1 && this.y2 > this.y1) || (this.x2 < this.x1 && this.y2 < this.y1))
		this.indices = [
 	  		0, 1, 2, 
 	 		2, 3, 0
 		];
 	else	
		this.indices = [
 	  		0, 2, 1, 
 	 		2, 0, 3
 		];

	/*
 	 * Creates the normals
 	 */
    this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
    ];


	/*
 	 * Creates the base texture coordinates
 	 */
  	this.baseTexCoords = [
  		this.textureInitialPoint[0], this.textureInitialPoint[1],
  		this.textureFinalPoint[0] , this.textureInitialPoint[1],
  		this.textureFinalPoint[0], this.textureFinalPoint[1],
  		this.textureInitialPoint[0], this.textureFinalPoint[1]
    ];
    this.setTextureCoords(1,1);

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

/**
 * Multiplies the texCoords by lengthS and lengthT
 * @param {Number} lengthS
 * @param {Number} lengthT
 */
MyTile.prototype.setTextureCoords = function(lengthS, lengthT) {
  	this.texCoords = [
   		this.baseTexCoords[0] / lengthS, this.baseTexCoords[1] / lengthT,
    	this.baseTexCoords[2] / lengthS, this.baseTexCoords[3] / lengthT,
    	this.baseTexCoords[4] / lengthS, this.baseTexCoords[5] / lengthT,
    	this.baseTexCoords[6] / lengthS, this.baseTexCoords[7] / lengthT
  	];  
  	this.updateTexCoordsGLBuffers();
}