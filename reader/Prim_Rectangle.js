
function Prim_Rectangle(primitive_id) {
	this.id = primitive_id;
	this.loaded = false;
	
	this.x1 = 0.0;
	this.y1 = 0.0;
	this.x2 = 0.0;
	this.y2 = 0.0;
}

Prim_Rectangle.prototype.isLoaded=function(){
	return this.loaded;
}

Prim_Rectangle.prototype.toString=function(){
	return "Primitive Rectangle Item " + this.id + "    Loaded? " + this.loaded + "\n(X1, Y1): (" + this.x1 + "," + this.y1 + ")\n(X2, Y2): (" + this.x2 + "," + this.y2 + ") \n";
}

Prim_Rectangle.prototype.create = function(scene){
	return new MyRectangle(scene, this.x1, this.y1, this.x2, this.y2);
}