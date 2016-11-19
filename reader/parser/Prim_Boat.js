/**
 * Prim_Boat
 * @constructor
 */
function Prim_Boat(primitive_id) {
	this.id = primitive_id;
	this.woodMaterial_id = "";
}

Prim_Boat.prototype.toString=function(){
	return "Primitive Boat Item " + this.id
	+ "\nMaterial: " + this.woodMaterial_id
	+ "\n";
}

/**
 * Creates a new MyPlane using the current data.
 * @param {CGFscene} scene
 * @return {MyCylinderWithTops} a cylinder
 */
Prim_Boat.prototype.create=function(scene){
	var woodMaterial = scene.graph.textures[this.woodMaterial_id];
	var theAppearance = new CGFappearance(scene);
	theAppearance.setTexture(woodMaterial);
	return new MyBoat(scene, theAppearance);
}

