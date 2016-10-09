
function Prim_Thorus(primitive_id) {
	this.id = primitive_id;
	this.loaded = false;
	
	this.inner = 0.0;
	this.outer = 0.0;
	this.slices = 0;
	this.loops = 0;
}

Prim_Thorus.prototype.isLoaded=function(){
	return this.loaded;
}

Prim_Thorus.prototype.toString=function(){
	return "Primitive Thorus Item " + this.id + "    Loaded? " + this.loaded 
	+ "\n Inner :" + this.inner + " Outer :" + this.outer
	+ "\n Slices: " + this.slices + " Loops: " + this.loops
	+ "\n";
}

