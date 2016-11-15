/**
 * Animation
 * @constructor
 */
function Animation(id) {

}

Animation.prototype.constructor = Animation;

Animation.prototype.init = function(id)
{
	this.id = id;
	this.matrix = mat4.create();
	this.finished = false;
}