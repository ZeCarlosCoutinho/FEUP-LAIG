
function Transformation(id) {
	this.id = id;
	this.loaded = false;
	
	this.matrix = [];
}

Transformation.prototype.isLoaded=function(){
	return this.loaded;
}

Transformation.prototype.toString=function(){
	return "Transformation Item " + this.id + "    Loaded? " + this.loaded + "\nMatrix :" + this.matrix;
}

