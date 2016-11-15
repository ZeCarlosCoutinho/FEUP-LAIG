/**
 * CompoundAnimationParsed
 * @constructor
 */

CompoundAnimationParsed.prototype = new AnimationParsed();

function CompoundAnimationParsed(id) {
	this.init(id);

	this.animations = [];
}

CompoundAnimationParsed.prototype.toString=function(){
	return "Compound Animation Item " + this.id + "\nFinished :" + this.finished + " Matrix: " + this.matrix + 
			"\nAnimations: " + this.animations;
}

CompoundAnimationParsed.prototype.create=function(){
	var animation = new CompoundAnimation(this.id, this.animations);
	return animation;
}
