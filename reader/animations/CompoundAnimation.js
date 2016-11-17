/**
 * CompoundAnimation
 * @constructor
 */

CompoundAnimation.prototype = new Animation(); 

function CompoundAnimation(id, animations) {
	this.init(id);
	
	this.animations = animations;
	this.currentAnimation = 0;
}


CompoundAnimation.prototype.updateMatrix = function(currTime)
{
	this.initialTime = this.initialTime || currTime;
	var time = (currTime - this.initialTime) /1000;
	var matrix = mat4.create();

	if(this.currentAnimation < this.animations.length) {
		this.animations[this.currentAnimation].updateMatrix(currTime);
		if (this.animations[this.currentAnimation].isFinished())
			this.currentAnimation++;
	}
	else
		this.finished = true;

	
	for(var i = 0; i < this.animations.length; i++){
		if (i > this.currentAnimation)
			break;
		mat4.multiply(matrix,matrix,this.animations[i].matrix);
	}
	//*/
	/***
	for(var i = this.animations.length-1; i >= 0; i--){
		mat4.multiply(matrix,matrix,this.animations[i].matrix);
	}
	//*/

	this.matrix = matrix;
}

CompoundAnimation.prototype.isFinished = function(currTime){
	return this.finished;
}