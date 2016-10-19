
function Prim_Cylinder(primitive_id) {
	this.id = primitive_id;
	this.loaded = false;
	
	this.base = 0.0;
	this.top = 0.0;
	this.height = 0.0;
	this.slices = 0;
	this.stacks = 0;
}

Prim_Cylinder.prototype.isLoaded=function(){
	return this.loaded;
}

Prim_Cylinder.prototype.toString=function(){
	return "Primitive Cylinder Item " + this.id + "    Loaded? " + this.loaded 
	+ "\nBase: " + this.base + " Top: " + this.top + " Height: " + this.height
	+ "\n Slices: " + this.slices + " Stacks: " + this.stacks
	+ "\n";
}

Prim_Cylinder.prototype.create=function(scene){
	return new MyCylinderWithTops(scene, this.height, this.base, this.top, this.stacks, this.slices);
}

