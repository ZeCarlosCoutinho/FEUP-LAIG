
function Prim_Triangle(primitive_id) {
	this.id = primitive_id;
	
	this.x1 = 0.0;
	this.y1 = 0.0;
	this.z1 = 0.0;
	
	this.x2 = 0.0;
	this.y2 = 0.0;
	this.z2 = 0.0;
	
	this.x3 = 0.0;
	this.y3 = 0.0;
	this.z3 = 0.0;
}

Prim_Triangle.prototype.toString=function(){
	return "Primitive Triangle Item " + this.id
	+ "\n(X1, Y1, Z1): (" + this.x1 + "," + this.y1 + "," + this.z1
	+ "\n(X2, Y2, Z2): (" + this.x2 + "," + this.y2 + "," + this.z2
	+ "\n(X3, Y3, Z3): (" + this.x3 + "," + this.y3 + "," + this.z3
	+ "\n";
}

Prim_Triangle.prototype.create = function(scene) {
	return new MyTriangle(scene, this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);
}
