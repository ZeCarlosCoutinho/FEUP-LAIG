
function Prim_Torus(primitive_id) {
	this.id = primitive_id;
	this.loaded = false;
	
	this.inner = 0.0;
	this.outer = 0.0;
	this.slices = 0;
	this.loops = 0;
}

Prim_Torus.prototype.isLoaded=function(){
	return this.loaded;
}

Prim_Torus.prototype.toString=function(){
	return "Primitive Torus Item " + this.id + "    Loaded? " + this.loaded 
	+ "\n Inner :" + this.inner + " Outer :" + this.outer
	+ "\n Slices: " + this.slices + " Loops: " + this.loops
	+ "\n";
}

