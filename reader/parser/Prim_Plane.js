/**
 * Prim_Plane
 * @constructor
 */
function Prim_Plane(primitive_id) {
	this.id = primitive_id;
	
	this.u_length = 0.0;
	this.v_length = 0.0;
	this.u_parts = 0;
	this.v_parts = 0;
}

Prim_Plane.prototype.toString=function(){
	return "Primitive Plane Item " + this.id
	+ "\nU_Lenght: " + this.u_length + " V_Length: " + this.v_length
	+ "\nU_Parts: " + this.u_parts + " V_Parts: " + this.v_parts
	+ "\n";
}

/**
 * Creates a new MyPlane using the current data.
 * @param {CGFscene} scene
 * @return {MyCylinderWithTops} a cylinder
 */
Prim_Plane.prototype.create=function(scene){
	return new MyPlane(scene, this.u_length, this.v_length, this.u_parts, this.v_parts);
}

