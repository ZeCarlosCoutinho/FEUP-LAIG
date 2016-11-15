/**
 * CircularAnimation
 * @constructor
 */

CircularAnimation.prototype = new Animation(); 

function CircularAnimation(id, center, radius, initialAngle, rotAngle, time) {
	this.init(id);
	
	this.center = center;
	this.negCenter = [];
	vec3.negate(this.negCenter, center);
	this.radius = radius;
	this.initialAngle = initialAngle;
	this.finalAngle = initialAngle + rotAngle;
	this.time = time;
	
	this.speed = rotAngle / this.time;
}


CircularAnimation.prototype.updateMatrix = function(currTime)
{
	this.initialTime = this.initialTime || currTime;
	this.lastTime = this.lastTime || currTime;
	var time = (currTime - this.initialTime) /1000;
	this.lastTime = currTime;

	var angle;
	if(time > this.time){
		angle = this.finalAngle;
		this.finished = true;
	}	
	else if (time <= 0)
		angle = this.initialAngle;
	else
		angle = this.initialAngle + time * this.speed;
	
	
	var matrix = mat4.create();
	
	mat4.translate(matrix, matrix, this.center);
	mat4.translate(matrix, matrix, [-this.radius,0,0]);
	mat4.rotate(matrix, matrix, angle, [0,1,0]);
	mat4.translate(matrix, matrix, [this.radius,0,0]);
	mat4.translate(matrix, matrix, this.negCenter);

	this.matrix = matrix;
}

CircularAnimation.prototype.isFinished = function(){
	return this.finished;
}