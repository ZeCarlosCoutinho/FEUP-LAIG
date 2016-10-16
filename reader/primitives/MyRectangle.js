/**
 * MyRectangle
 * @constructor
 */
 function MyRectangle(scene, primitive_id, x1, y1, x2, y2) {
 	CGFobject.call(this,scene);

	this.id = primitive_id;
	this.loaded = false;
	
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
 	  this.x1, this.y2, 0,
      this.x2, this.y1, 0,
 	  this.x2, this.y2, 0
 	];

 	this.indices = [
 	  0, 2, 1, 
 	  1, 2, 3
 	];

    this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
    ];

    this.texCoords = [
      0, 1,
      0, 0,
      1, 1,
      1, 0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 
 MyRectangle.prototype.isLoaded=function(){
	return this.loaded;
}

MyRectangle.prototype.toString=function(){
	return "Primitive Rectangle Item " + this.id + "    Loaded? " + this.loaded + "\n(X1, Y1): (" + this.x1 + "," + this.y1 + ")\n(X2, Y2): (" + this.x2 + "," + this.y2 + ") \n";
}
