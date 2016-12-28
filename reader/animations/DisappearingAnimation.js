/**
 * Disappearing Animation
 * @constructor
 */

DisappearingAnimation.prototype = new Animation(); 

function DisappearingAnimation(pointsList, speed) {
	this.finished = false;
	this.matrix = mat4.create();
	this.initialTime;
	this.speed = speed;
	
	this.pointsList = pointsList;
	this.derivativesList = [];
	this.endingTimesList = [];
	this.initializeDerivatives();
	this.initializeTimes();

	this.actualPosition; //vec3
	this.actualDerivative; //vec3
	this.actualIndex = 0;
	this.initialPoint; //Point before in the pointsList
	this.finalPoint; //Point after in the pointsList

}


/**
 * Updates the animation matrix.
 * @param {Float} currTime
 */
DisappearingAnimation.prototype.updateMatrix = function(currTime)
{
	//Beginning of each segment
	if(this.initialTime == 0 || this.initialTime == null)
	{
		this.initialTime = currTime;
	}
	else
	{
		//Calculate point
		var timeDiff = currTime - this.initialTime;
		var point = this.getAnimationPosition(timeDiff);

		//Create animation matrix (to be later multiplied in the component)
		var matrix = mat4.create();
		mat4.translate(matrix, matrix, [
			point[0],
			point[1],
			point[2]
		])
		this.matrix = matrix;
		
	}

}

DisappearingAnimation.prototype.getAnimationPosition = function(timeDiff)
{
	//Convert to seconds
	timeDiff = timeDiff/1000;
	
	for(var i = 0; i < this.endingTimesList.length; i++)
	{
		//When
		if(this.endingTimesList[i] >= timeDiff)
		{
			//Get initial point in the segment
			var initialPointIndex = i - 1;
			var initialPoint = this.pointsList[initialPointIndex];

			//Time after animation segment started
			var timeInSegment = timeDiff - this.endingTimesList[initialPointIndex];

			//TODO é mesmo esta a fórmula?? Talvez o actualderivative ja seja o speed
			var positionX = initialPoint[0] + this.speed * this.derivativesList[initialPointIndex][0] * timeInSegment;
			var positionY = initialPoint[1] + this.speed * this.derivativesList[initialPointIndex][1] * timeInSegment;
			var positionZ = initialPoint[2] + this.speed * this.derivativesList[initialPointIndex][2] * timeInSegment;

			console.log("PosX: " + positionX + "\n");
			if(positionX < -0.01)
			{
				console.log("Wut?");
			}
			return vec3.fromValues(positionX, positionY, positionZ);
		}
	}
	
	//In case the time passes the limit, then last point is returned
	var lastPoint = this.pointsList[this.pointsList.length - 1];
	this.finished = true;
	return vec3.fromValues(lastPoint[0], lastPoint[1], lastPoint[2]);
}

DisappearingAnimation.prototype.initializeDerivatives = function()
{
	for(var i = 1; i < this.pointsList.length; i++)
	{
		//Obtain the derivatives by axis
		var dX = this.pointsList[i][0] - this.pointsList[i-1][0];
		var dY = this.pointsList[i][1] - this.pointsList[i-1][1];
		var dZ = this.pointsList[i][2] - this.pointsList[i-1][2];

		//Put the derivatives in the list
		this.derivativesList.push(vec3.fromValues(dX, dY, dZ));
	}
}

DisappearingAnimation.prototype.initializeTimes = function()
{
	var timeUntilNow = 0.0;
	this.endingTimesList.push(timeUntilNow);
	for(var i = 1; i < this.pointsList.length; i++)
	{
		//Obtain the time taken in each segment
		var distance = Math.sqrt(Math.pow(this.derivativesList[i-1][0], 2) + Math.pow(this.derivativesList[i-1][1], 2)
		+ Math.pow(this.derivativesList[i-1][2], 2));
	
		var timeTaken = distance/this.speed; //Time that this segment takes
		timeUntilNow = timeUntilNow + timeTaken; //Sum of the times of all the segments processed
		
		//Put the time until now in the list
		this.endingTimesList.push(timeUntilNow);
	}
}

/**
 * Returns the state of the animations
 * @return {Boolean} finished or not
 */
DisappearingAnimation.prototype.isFinished = function(){
	return this.finished;
}