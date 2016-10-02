
function Material(id) {
	this.id = id;
	this.loaded = false;
	
	this.emission = [];
	this.ambient = [];
	this.diffuse = [];
	this.specular = [];
	this.shininess;
}

Material.prototype.isLoaded=function(){
	return this.loaded;
}

Material.prototype.toString=function(){
	return "Material Item " + this.id + "    Loaded? " + this.loaded + "\nEmission: " + this.emission + "\nAmbient: " + this.ambient + "\nDiffuse: " + this.diffuse + "\nSpecular: " + this.specular + "\nShininess: " + this.shininess;
}

