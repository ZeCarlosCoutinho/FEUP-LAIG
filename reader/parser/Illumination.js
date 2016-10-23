/**
 * Illumination
 * @constructor
 */
function Illumination(id) {
	this.doublesided = false;
	this.local = false;
	
	this.ambient = [];
	this.background = [];
}

Illumination.prototype.toString=function(){
	return "Illumination\nDoublesided? " +  this.doublesided + "\nLocal? " + this.local + "\nAmbient " + this.ambient + "\nBackground " + this.background;
}

