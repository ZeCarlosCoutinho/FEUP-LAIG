
function OmniLight(id) {
	this.id = id;
	this.enabled = null;
	this.loaded = false;

	this.location = [];
	this.ambient = [];
	this.diffuse = [];
	this.specular = [];

}

OmniLight.prototype.isLoaded=function(){
	return this.loaded;
}

OmniLight.prototype.toString=function(){
	return "Omni Light Item " + this.id + "    Loaded? " + this.loaded + "\nEnabled? " + this.enabled + "\nLocation: " + this.location + "\nAmbient: " + this.ambient + "\nDiffuse: " + this.diffuse + "\nSpecular: " + this.specular;
}

