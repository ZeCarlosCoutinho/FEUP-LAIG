/**
 * MySphere
 * @constructor
 */
 function MySphere(scene, radius, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.radius = radius;

	this.slices = slices;
	this.alpha = 2*Math.PI/slices;

	this.stacks = stacks;
	this.beta = Math.PI/stacks;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.texCoords = [];
 	this.normals = [];
 	for (var i = 0; i <= this.stacks; i++) {
 		for (var j = 0; j <= this.slices; j++) {
			this.vertices.push(
				this.radius * Math.sin(this.beta * i)*Math.cos(this.alpha*j),
				this.radius * Math.sin(this.beta * i)*Math.sin(this.alpha*j),
				this.radius * Math.cos(this.beta * i));
			this.normals.push(
				Math.sin(this.beta * i)*Math.cos(this.alpha*j),
				Math.sin(this.beta * i)*Math.sin(this.alpha*j),
				Math.cos(this.beta * i));

			//pode ser preciso mudar
 			this.texCoords.push(0.5 + Math.cos(this.alpha * i)*Math.cos(this.beta*j)/2, 0.5 + Math.sin(this.alpha * i)*Math.cos(this.beta*j)/2);
 		}
	}

 	this.indices = [];
    for (var i = 0; i < this.stacks; i++) {
 		for (var j = 0; j < this.slices; j++) {
			this.indices.push(i*(this.slices+1)+j);
 			this.indices.push((i+1)*(this.slices+1)+j);
 			this.indices.push(i*(this.slices+1)+j+1);
 			this.indices.push(i*(this.slices+1)+j+1);
 			this.indices.push((i+1)*(this.slices+1)+j);
 			this.indices.push((i+1)*(this.slices+1)+j+1);
 		}
 	}




 	console.log(this.vertices.length);
 	console.log(this.indices.length);
	console.log(this.normals.length);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
