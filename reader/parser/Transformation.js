/**
 * Transformation
 * @constructor
 */
function Transformation(id) {
	this.id = id;
	this.matrix = [];
}

Transformation.prototype.toString=function(){
	return "Transformation Item " + this.id + "\nMatrix :" + this.matrix;
}

