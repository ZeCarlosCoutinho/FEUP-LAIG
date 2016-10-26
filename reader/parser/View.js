/**
 * View
 * @constructor
 */
function View(id) {
	this.id = id;

	this.near = 0.0;
	this.far = 0.0;
	this.angle = 0.0;
	
	this.from = [];
	this.to = [];
}

View.prototype.toString=function(){
	return "View Item " + this.id + "\nNear: " + this.near + " Far: " + this.far + " Angle: " + this.angle + "\nFrom: " + this.from + "\nTo  : " + this.to;
}

/**
 * Creates a new CGFcamera using the current data.
 * @return {CGFcamera} a new viewport
 */
View.prototype.create=function(){
	return new CGFcamera(
		this.angle, this.near, this.far, 
		this.from, this.to);
}
