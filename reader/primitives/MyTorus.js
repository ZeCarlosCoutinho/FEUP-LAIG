/**
 * MyPrism
 * @constructor
 */
function MyTorus(scene, primitive_id, inner, outer, slices, loops) {
 	CGFobject.call(this, scene);
	
	this.id = primitive_id;
	this.loaded = false;
	
	this.inner = inner;
	this.outer = outer;
	this.slices = slices;
	this.loops = loops;

	this.baseRadius = (inner + outer) / 2;
	this.deltaRadius = (outer - inner) / 2;
	
	this.alpha = 2 * Math.PI / slices;
	this.beta = 2 * Math.PI / loops;
	
 	this.initBuffers();
 };

 MyTorus.prototype = Object.create(CGFobject.prototype);
 MyTorus.prototype.constructor = MyTorus;

MyTorus.prototype.initBuffers = function() {
	this.vertices = [];
    this.normals = [];
    this.texCoords = [];
 	for (var i = 0; i <= this.loops; i++) {
 		for (var j = 0; j <= this.slices; j++) {
 			this.vertices.push(
 				Math.cos(this.beta * i) * (this.baseRadius + Math.cos(this.alpha * j) * this.deltaRadius),
 				Math.sin(this.beta * i) * (this.baseRadius + Math.cos(this.alpha * j) * this.deltaRadius),
 				Math.sin(this.alpha * j) * this.deltaRadius);
			this.normals.push(
				Math.cos(this.beta * i) * Math.cos(this.alpha * j),
				Math.sin(this.beta * i) * Math.cos(this.alpha * j),
				Math.sin(this.alpha * j));
			this.texCoords.push(
				1 - (j / this.slices),
                i / this.loops);
		}
	}

	this.indices = [];
    for (var i = 0; i < this.loops; i++) {
 		for (var j = 0; j < this.slices; j++) {
			this.indices.push(i*(this.slices+1)+j);
			 this.indices.push((i+1)*(this.slices+1)+j);
			this.indices.push(i*(this.slices+1)+j+1);
 			this.indices.push(i*(this.slices+1)+j+1);
 			this.indices.push((i+1)*(this.slices+1)+j);
 			this.indices.push((i+1)*(this.slices+1)+j+1);

 		}
 	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 
 MyTorus.prototype.isLoaded=function(){
	return this.loaded;
}

MyTorus.prototype.toString=function(){
	return "Primitive Thorus Item " + this.id + "    Loaded? " + this.loaded 
	+ "\n Inner :" + this.inner + " Outer :" + this.outer
	+ "\n Slices: " + this.slices + " Loops: " + this.loops
	+ "\n";
}
