/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, height, bRadius, tRadius, stacks, slices) {
 	CGFobject.call(this, scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.height = height;
	this.bRadius = bRadius;
	this.tRadius = tRadius;

	//Size of each stack
	this.deltaRadius = (tRadius - bRadius) / stacks;
	
	//Division of slices
	this.alpha = 2 * Math.PI / slices;

 	this.initBuffers();
 };

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
	
	//Initializes the arrays
	this.vertices = [];
    this.normals = [];
    this.texCoords = [];
	
	//Fills the arrays with the vertices, normals, and textures coordinates
 	for (var i = 0; i <= this.stacks; i++) {
 		for (var j = 0; j <= this.slices; j++) {
 			this.vertices.push(
 				(this.bRadius + this.deltaRadius * i) * Math.cos(this.alpha * j),
 				(this.bRadius + this.deltaRadius * i) * Math.sin(this.alpha * j),
 				this.height * i / this.stacks);
			this.normals.push(
				Math.cos(this.alpha * j),
				Math.sin(this.alpha * j),
				-this.deltaRadius);
			this.texCoords.push(
				1 - (j / this.slices),
                i / this.stacks);
		}
	}

	this.indices = [];
    for (var i = 0; i < this.stacks; i++) {
 		for (var j = 0; j < this.slices; j++) {
			this.indices.push(i*(this.slices+1)+j);
			this.indices.push(i*(this.slices+1)+j+1);
 			this.indices.push((i+1)*(this.slices+1)+j);
 			this.indices.push(i*(this.slices+1)+j+1);
 			this.indices.push((i+1)*(this.slices+1)+j+1);
 			this.indices.push((i+1)*(this.slices+1)+j);

 		}
 	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};
 