
function MyView(id) {
	this.id = id;
	this.loaded = false;
	this.near = 0.0;
	this.far = 0.0;
	this.angle = 0.0;
	
	this.fromX = 0.0;
	this.fromY = 0.0;
	this.fromZ = 0.0;

	this.toX = 0.0;
	this.toY = 0.0;
	this.toZ = 0.0;
}

MyView.prototype.isLoaded=function(){
	return this.loaded;
}

MyView.prototype.toString=function(){
	return "View Item " + this.id + "    Loaded? " + this.loaded + "\nNear: " + this.near + " Far: " + this.far + " Angle: " + this.angle + "\nFrom X: " + this.fromX + " Y: " + this.fromX + " Z: " + this.fromX + "\nTo   X: " + this.toX + " Y: " + this.toY + " Z: " + this.toZ;
}

