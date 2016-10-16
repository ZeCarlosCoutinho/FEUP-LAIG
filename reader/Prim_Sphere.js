
function Prim_Sphere(primitive_id) {
	this.id = primitive_id;
	this.loaded = false;
	
	this.radius = 0.0;
	this.slices = 0;
	this.stacks = 0;
}

Prim_Sphere.prototype.isLoaded=function(){
	return this.loaded;
}

Prim_Sphere.prototype.toString=function(){
	return "Primitive Sphere Item " + this.id + "    Loaded? " + this.loaded 
	+ "\n Radius :" + this.radius
	+ "\n Slices: " + this.slices + " Stacks: " + this.stacks
	+ "\n";
}

