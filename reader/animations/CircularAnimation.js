/**
 * CircularAnimation
 * @constructor
 */

CircularAnimation.prototype = new Animation(); 

function CircularAnimation(id, center, radius, initialAngle, rotAngle, time) {
	this.init(id);
	
	this.center = center;
	this.radius = radius;
	this.initialAngle = initialAngle;
	this.finalAngle = initialAngle + rotAngle;
	this.time = time;
	
	this.speed = rotAngle/ this.time;
	
}


CircularAnimation.prototype.getCurrentMatrix = function(time)
{
	var angle;
	if(time > this.time)
		angle = this.finalAngle;
	else if (time <= 0)
		angle = this.initialAngle;
	else
		angle = this.initialAngle + time * this.speed;
	
	
	var matrix = mat4.create();
	
	mat4.translate(matrix, matrix, center);
	mat4.rotate(matrix, matrix, angle, [0,1,0]);
	mat4.translate(matrix, matrix, [this.radius,0,0]);
	
	return matrix;
}