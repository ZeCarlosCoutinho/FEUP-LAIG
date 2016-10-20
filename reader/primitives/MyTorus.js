/**
 * MyTorus
 * @constructor
 */
function MyTorus(scene, minorRadius, majorRadius, slices, loops) {
 	CGFobject.call(this, scene);
		
	this.majorRadius = majorRadius;
	this.minorRadius = minorRadius;
	this.slices = slices;
	this.loops = loops;
	
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
 				Math.cos(this.beta * i) * (this.majorRadius + Math.cos(this.alpha * j) * this.minorRadius),
 				Math.sin(this.beta * i) * (this.majorRadius + Math.cos(this.alpha * j) * this.minorRadius),
 				Math.sin(this.alpha * j) * this.minorRadius);
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
 
