/**
 * Material
 * @constructor
 */
function Material(id) {
	this.id = id;
	
	this.emission = [];
	this.ambient = [];
	this.diffuse = [];
	this.specular = [];
	this.shininess;
}

Material.prototype.toString=function(){
	return "Material Item " + this.id + "\nEmission: " + this.emission + "\nAmbient: " + this.ambient + "\nDiffuse: " + this.diffuse + "\nSpecular: " + this.specular + "\nShininess: " + this.shininess;
}

/**
 * Creates a new CGFappearance using the current data.
 * @param {CGFscene} scene
 * @return {CGFappearance} a new material
 */
Material.prototype.create=function(scene){
	var material = new CGFappearance(scene);
	material.setAmbient(
		this.ambient[0],
	    this.ambient[1],
	    this.ambient[2],
	    this.ambient[3]);
	material.setEmission(
		this.emission[0],
	    this.emission[1],
	    this.emission[2],
	    this.emission[3]);
	material.setDiffuse(
		this.diffuse[0],
		this.diffuse[1],
		this.diffuse[2],
		this.diffuse[3]);
	material.setSpecular(
		this.specular[0],
		this.specular[1],
		this.specular[2],
		this.specular[3]);
	material.setShininess = this.shininess;
	material.setTextureWrap('REPEAT', 'REPEAT');
	return material;
}

