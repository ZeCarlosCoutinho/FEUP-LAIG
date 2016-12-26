/**
 * PieceAnimation
 * @constructor
 */

PieceAnimation.prototype = new Animation(); 

function PieceAnimation(dest, initTime, dur, animationSpeed) {
	this.finished = false;

	this.dest = dest;
	this.initTime = initTime / animationSpeed;
	this.dur = dur / animationSpeed;
	this.time = (dur + initTime) / animationSpeed;
	this.animationSpeed = animationSpeed;
	this.speed = scaleVec(this.dest, 1 / this.dur);
	this.matrix = mat4.create();
}


/**
 * Updates the animation matrix.
 * @param {Float} currTime
 */
PieceAnimation.prototype.updateMatrix = function(currTime)
{
	this.initialTime = this.initialTime || currTime;
	this.lastTime = this.lastTime || currTime;
	var time = (currTime - this.initialTime) /1000 * this.animationSpeed;;
	this.lastTime = currTime;
	
	if(time > this.time){
		this.finished = true;
		time = this.time;
		time =  (time - this.initTime)/9;
	}
	else if (time <= 0 || time <= this.initTime)
		time = 0;
	else
		time =  (time - this.initTime)/9;

	var matrix = mat4.create();
	mat4.translate(matrix, matrix, [
		this.speed[0] * time,
		0,
		this.speed[1] * time
	]);
	this.matrix = matrix;
}


/**
 * Returns the state of the animations
 * @return {Boolean} finished or not
 */
PieceAnimation.prototype.isFinished = function(){
	return this.finished;
}