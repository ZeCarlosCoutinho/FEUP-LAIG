/**
 * Prim_Vehicle
 * @constructor
 */
function Prim_Vehicle(primitive_id) {
	this.id = primitive_id;
	
	this.textureref = null;
}

Prim_Vehicle.prototype.toString=function(){
	return "Primitive Vehicle Item " + this.id
	+ "\nTexture Id: " + this.textureref + "\n";
}

/**
 * Creates a new MyBoat using the current data.
 * @param {CGFscene} scene
 * @return {MyBoat} a boat
 */
Prim_Vehicle.prototype.create=function(scene){
	if (this.textureref == null)
		return new MyBoat(scene);
	var material = new CGFappearance(scene);
	material.setTexture(scene.textures[this.textureref].text);
	material.setTextureWrap('REPEAT', 'REPEAT');
	return new MyBoat(scene, material);
}

