
function SpotLight(id) {
	this.id = id;
	this.enabled = null;
	this.loaded = false;
	this.angle = 0.0;
	this.exponent = 0.0

	this.target = [];
	this.location = [];
	this.ambient = [];
	this.diffuse = [];
	this.specular = [];

}

SpotLight.prototype.isLoaded=function(){
	return this.loaded;
}

SpotLight.prototype.toString=function(){
	return "Spot Light Item " + this.id + "    Loaded? " + this.loaded + "\nEnabled? " + this.enabled + " Angle: " + this.angle + " Exponent: " + this.exponent + "\nTarget: " + this.target + "\nLocation: " + this.location + "\nAmbient: " + this.ambient + "\nDiffuse: " + this.diffuse + "\nSpecular: " + this.specular;
}

