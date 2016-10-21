/**
 * MyRectangle
 * @constructor
 */
 function MyRectangle(scene, x1, y1, x2, y2) {
 	CGFobject.call(this,scene);

	
 	this.x1 = x1;
 	this.y1 = y1;
	this.x2 = x2;
 	this.y2 = y2;

 	this.initBuffers();
 };

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	  this.x1, this.y1, 0,
 	  this.x2, this.y1, 0,
 	  this.x2, this.y2, 0,
 	  this.x1, this.y2, 0
 	];

 	this.indices = [
 	  0, 1, 2, 
 	  2, 3, 0
 	];

    this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
    ];
/*
    this.baseTexCoords = [
      0, 1,
      0, 0,
      1, 1,
      1, 0
    ];*/

	this.baseTexCoords = [
		1 - (this.y2 - this.y1), 0,
		1, 0,
      	1, this.x2 - this.x1,
      	1 - (this.y2 - this.y1), this.x2 - this.x1,
      	
 
    ];
    this.setTextureCoords(1,1);

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

MyRectangle.prototype.setTextureCoords = function(lengthS, lengthT) {
  	this.texCoords = [
   		this.baseTexCoords[0] / lengthS, this.baseTexCoords[1] / lengthT,
    	this.baseTexCoords[2] / lengthS, this.baseTexCoords[3] / lengthT,
    	this.baseTexCoords[4] / lengthS, this.baseTexCoords[5] / lengthT,
    	this.baseTexCoords[6] / lengthS, this.baseTexCoords[7] / lengthT
  	];  
}