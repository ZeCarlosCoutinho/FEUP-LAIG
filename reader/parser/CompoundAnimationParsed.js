/**
 * CompoundAnimationParsed
 * @constructor
 */

function CompoundAnimationParsed(id) {
	this.id = id;

	this.animations = [];
}

CompoundAnimationParsed.prototype.toString=function(){
	return "Compound Animation Item " + this.id + "\nFinished :" + this.finished + " Matrix: " + this.matrix + 
			"\nAnimations: " + this.animations;
}

CompoundAnimationParsed.prototype.create=function(){
	var createdAnimations = [];
	for(var i = 0; i < this.animations.length; i++)
	{
		createdAnimations.push(this.animations[i].create());
	}
	var animation = new CompoundAnimation(this.id, createdAnimations);
	return animation;
}
