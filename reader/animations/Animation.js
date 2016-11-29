/**
 * Animation
 * @constructor
 */
function Animation(id) {

}

Animation.prototype.constructor = Animation;

/**
 * Inits the animation.
 * @param {String} id
 */
Animation.prototype.init = function(id)
{
	this.id = id;
	this.matrix = mat4.create();
	this.finished = false;
}