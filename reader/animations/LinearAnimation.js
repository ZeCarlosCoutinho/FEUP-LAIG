/**
 * LinearAnimation
 * @constructor
 */

LinearAnimation.prototype = new Animation(); 

function LinearAnimation(id, controlPoints, time) {
	this.init(id);
	
	this.controlPoints = controlPoints;
	this.time = time;
	
	this.orientation = 0;
	this.segments = [];
	this.totalDistance = 0;
	this.calculateTotalDistance();
	this.orientation = 0
	
	this.speed = this.totalDistance / this.time;
}

/**
 * Calculates the total distance an object will travel during the animation.
 * @return {Boolean} finished or not
 */
LinearAnimation.prototype.calculateTotalDistance = function()
{
	for (var i = 1; i < this.controlPoints.length; i++){
		var delta = [
			this.controlPoints[i][0] - this.controlPoints[i-1][0],
			this.controlPoints[i][1] - this.controlPoints[i-1][1],
			this.controlPoints[i][2] - this.controlPoints[i-1][2]
		];
		//Distance between initial and final points
		var distance = Math.sqrt( delta[0] * delta[0] + delta[1] * delta[1] + delta[2] * delta[2] );
		//Unitary Vector
		var direction = [delta[0]/distance, delta[1]/distance, delta[2]/distance];
		//Orientation related to Z axis
		if (delta[0] != 0 || delta[2] != 0) 
			this.orientation = Math.atan2(direction[0], direction[2]);
		this.segments.push({
				initialDistance: 	this.totalDistance,
				finalDistance: 		this.totalDistance + distance,
				direction: 			direction,
				orientation: 		this.orientation,
				initialPoint: 		this.controlPoints[i-1]
							});
		this.totalDistance += distance;
	}
}


/**
 * Updates the animation matrix.
 * @param {Float} currTime
 */
LinearAnimation.prototype.updateMatrix = function(currTime)
{
	this.initialTime = this.initialTime || currTime;
	this.lastTime = this.lastTime || currTime;
	var time = (currTime - this.initialTime) /1000;
	this.lastTime = currTime;
	
	var currentDistance;
	if(time > this.time){
		currentDistance = this.totalDistance;
		this.finished = true;
	}
	else if (time <= 0)
		currentDistance = 0;
	else
		currentDistance = time * this.speed;
	
	var currentSegment;
	for(var i = 0; i < this.segments.length; i++){
		currentSegment = this.segments[i];
		if (currentDistance < currentSegment.finalDistance)
			break;
	}
	
	var matrix = mat4.create();
	
	var segTranslation = [
		currentSegment.initialPoint[0] + currentSegment.direction[0] * (currentDistance - currentSegment.initialDistance),
		currentSegment.initialPoint[1] + currentSegment.direction[1] * (currentDistance - currentSegment.initialDistance),
		currentSegment.initialPoint[2] + currentSegment.direction[2] * (currentDistance - currentSegment.initialDistance)
	]
	mat4.translate(matrix, matrix, segTranslation);

	mat4.rotate(matrix, matrix, currentSegment.orientation, [0,1,0]);
	
	this.matrix = matrix;
}


/**
 * Returns the state of the animations
 * @return {Boolean} finished or not
 */
LinearAnimation.prototype.isFinished = function(){
	return this.finished;
}