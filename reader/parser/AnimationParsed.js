/**
 * AnimationParsed
 * @constructor
 */
function AnimationParsed(id) {
	this.id = id;
	this.matrix = mat4.create();
	this.finished = false;
}

AnimationParsed.prototype.toString=function(){
	return "Animation Item " + this.id + "\nFinished :" + this.finished + " Matrix: " + this.matrix;
}

AnimationParsed.prototype.init=function(id){
	//this.animation = new Animation(this.id);
	this.id = id;
	this.matrix = mat4.create();
	this.finished = false;
}
