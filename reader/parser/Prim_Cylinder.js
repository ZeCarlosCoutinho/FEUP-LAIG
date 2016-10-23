/**
 * Prim_Cylinder
 * @constructor
 */
function Prim_Cylinder(primitive_id) {
	this.id = primitive_id;
	
	this.base = 0.0;
	this.top = 0.0;
	this.height = 0.0;
	this.slices = 0;
	this.stacks = 0;
}

Prim_Cylinder.prototype.toString=function(){
	return "Primitive Cylinder Item " + this.id
	+ "\nBase: " + this.base + " Top: " + this.top + " Height: " + this.height
	+ "\n Slices: " + this.slices + " Stacks: " + this.stacks
	+ "\n";
}

/**
 * Creates a new MyCylinderWithTops using the current data.
 * @param {CGFscene} scene
 * @return {MyCylinderWithTops} a cylinder
 */
Prim_Cylinder.prototype.create=function(scene){
	return new MyCylinderWithTops(scene, this.height, this.base, this.top, this.stacks, this.slices);
}

