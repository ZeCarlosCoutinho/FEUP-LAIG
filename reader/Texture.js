
function Texture(id) {
	this.id = id;
	this.loaded = false;
	
	this.file;
	this.length_s;
	this.length_t;
}

Texture.prototype.isLoaded=function(){
	return this.loaded;
}

Texture.prototype.toString=function(){
	return "Texture Item " + this.id + "    Loaded? " + this.loaded + "\nFile: " + this.file + "\nLength_s: " + this.length_s + "\nLength_t: " + this.length_t;
}

