/**
 * Prim_Plane
 * @constructor
 */
function Prim_Plane(primitive_id) {
	this.id = primitive_id;
	
	this.textureref = null;
}

Prim_Plane.prototype.toString=function(){
	return "Primitive Plane Item " + this.id
	+ "\nTexture If: " + this.textureref + "\n";
}

/**
 * Creates a new MyPlane using the current data.
 * @param {CGFscene} scene
 * @return {MyCylinderWithTops} a cylinder
 */
Prim_Plane.prototype.create=function(scene){
	if (this.textureref == null)
		return new MyBoat(scene);
	var material = new CGFAppearance(scene);
	material.setTexture(scene.textures[this.textureref]);
	return new MyBoat(scene, material);
}

