/**
 * Animation
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
	calculateTotalDistance();
	
	this.speed = this.totalDistance / this.time;
	
}

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
		var orientation = Math.atan2(x,z);
		this.segments.push({
				initialDistance: 	this.totalDistance,
				finalDistance: 		this.totalDistance + distance,
				direction: 			direction,
				orientation: 		orientation,
				initialPoint: 		this.controlPoints[i-1]
							});
		this.totalDistance += distance;
	}
}



LinearAnimation.prototype.getCurrentMatrix = function(time)
{
	var currentDistance;
	if(time > this.time)
		currentDistance = this.totalDistance;
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
	
	return matrix;
}