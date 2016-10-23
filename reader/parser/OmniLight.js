function OmniLight(id) {
	this.id = id;
	this.enabled = null;

	this.location = [];
	this.ambient = [];
	this.diffuse = [];
	this.specular = [];

}

OmniLight.prototype.toString=function(){
	return "Omni Light Item " + this.id + "\nEnabled? " + this.enabled + "\nLocation: " + this.location + "\nAmbient: " + this.ambient + "\nDiffuse: " + this.diffuse + "\nSpecular: " + this.specular;
}

