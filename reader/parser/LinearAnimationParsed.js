/**
 * LinearAnimationParsed
 * @constructor
 */

LinearAnimationParsed.prototype = new AnimationParsed();

function LinearAnimationParsed(id) {
	this.init(id);

	this.controlPoints = [];
	this.time = 0;
}

LinearAnimationParsed.prototype.toString=function(){
	return "Linear Animation Item " + this.id + "\nFinished :" + this.finished + " Matrix: " + this.matrix +
			"\nControlPoints : " + this.controlPoints +
			"\nTime : " + this.time;
}

LinearAnimationParsed.prototype.create=function(){
	var animation = new LinearAnimation(this.id, this.controlPoints, this.time);
	return animation;
}
