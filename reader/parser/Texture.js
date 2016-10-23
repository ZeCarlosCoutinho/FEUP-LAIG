/**
 * Texture
 * @constructor
 */
function Texture(id) {
	this.id = id;
	
	this.file;
	this.length_s;
	this.length_t;
}

Texture.prototype.toString = function(){
	return "Texture Item " + this.id + "\nFile: " + this.file + "\nLength_s: " + this.length_s + "\nLength_t: " + this.length_t;
}

/**
 * Creates a new array with a CGFtexture and the corresponding s and t lengths using the current data.
 * @param {CGFscene} scene
 * @return {Texture Data Array} an array with the texture and the corresponding s and t lengths
 */
Texture.prototype.create = function(scene){
	return {	text: new CGFtexture(scene, this.file),
				lengthS: this.length_s,
				lengthT: this.length_t	};
}

