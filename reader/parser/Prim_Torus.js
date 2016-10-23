/**
 * Prim_Torus
 * @constructor
 */
function Prim_Torus(primitive_id) {
	this.id = primitive_id;
	this.loaded = false;
	
	this.inner = 0.0;
	this.outer = 0.0;
	this.slices = 0;
	this.loops = 0;
}

Prim_Torus.prototype.toString=function(){
	return "Primitive Torus Item " + this.id
	+ "\n Inner :" + this.inner + " Outer :" + this.outer
	+ "\n Slices: " + this.slices + " Loops: " + this.loops
	+ "\n";
}

/**
 * Creates a new MyTorus using the current data.
 * @param {CGFscene} scene
 * @return {MyTorus} a torus
 */
Prim_Torus.prototype.create = function(scene) {
	return new MyTorus(scene, this.inner, this.outer, this.slices, this.loops);
}


