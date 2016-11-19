/**
 * Prim_Boat
 * @constructor
 */
function Prim_Boat(primitive_id) {
	this.id = primitive_id;
	this.woodMaterial_id = "";
	this.sailMaterial_id = "";
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
	var sailMaterial = scene.graph.textures[this.sailMaterial_id];

	var woodAppearance = new CGFappearance(scene);
	var sailAppearance = new CGFappearance(scene);
	
	woodAppearance.loadTexture(woodMaterial.file);
	sailAppearance.loadTexture(sailMaterial.file);
	return new MyBoat(scene, woodAppearance, sailAppearance);
}

