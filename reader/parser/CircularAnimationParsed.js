/**
 * CircularAnimationParsed
 * @constructor
 */

 CircularAnimationParsed.prototype = new AnimationParsed();

function CircularAnimationParsed(id) {
	this.init(id);
	this.center = [];
	this.radius = 0;
 	this.initialAngle = 0;
 	this.rotAngle = 0;
 	this.time = 0;
}

CircularAnimationParsed.prototype.toString=function(){
	return "Circular Animation Item " + this.id + "\nFinished :" + this.finished + " Matrix: " + this.matrix +
			"\nCentre: " + this.center + " Radius: " + this.radius +
			"\nInicial/Rotation angles: " + this.initialAngle + "/" + this.rotAngle + 
			"\nTime: " + this.time;
}

CircularAnimationParsed.prototype.create=function(){
	var animation = new CircularAnimation(this.id, this.center, this.radius, this.initialAngle, this.rotAngle, this.time)
	return animation;
}
