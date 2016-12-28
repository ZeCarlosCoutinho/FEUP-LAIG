/**
 * MoveSelected
 * @constructor
 */

MoveSelected.prototype = Object.create(GameState.prototype);

function MoveSelected(player, board, move) {
    GameState.call(this, player, board);
    this.move = move;
    this.player = player;
    this.moveList = move.getImplication(board);
	this.animation_on = this.board.animation_on;

	this.board.timer_on = false;
    
    this.calculateAnimation();
    var a = 5;
};

MoveSelected.prototype.display = function()
{
    //Display the wood board
	this.scene.pushMatrix();
		this.board.board.display();
	this.scene.popMatrix();

    //Pick ID

    var pieces = this.board.pieces;
    //Display Pieces
	for (var i = 1; i <= 9; i++){
		for (var j = 1; j <= 9; j++){
			if (pieces[i][j]){
				//Draw Piece
				this.scene.pushMatrix();
					for (var m in this.moveList){
						var mov = this.moveList[m];
						var x = mov.coordinates[0];
						var z = mov.coordinates[1]
						if (pieces[x][z] && pieces[i][j] == pieces[x][z])
						{
							this.scene.multMatrix(this.animationList[m].matrix);
							if(this.outOfBoardAnimationList[m] && this.animationList[0].finished)
							{
								this.scene.multMatrix(this.outOfBoardAnimationList[m].matrix);
							}
						}
					}
					this.scene.translate((i-1)/9, 0, (j-1)/9);
					this.scene.scale(1/9, 1/9, 1/9);
					pieces[i][j].display();
				this.scene.popMatrix();
			}
		}
	}

   	/*if(!this.animation_on || this.animationList[0].finished) //TODO change
		this.next();*/
	if(!this.animation_on || (this.animationList[0].finished && this.checkOutAnimationFinished())) //TODO change
		this.next();
};

MoveSelected.prototype.next = function(){
	while (this.moveList.length != 0){
		var move = this.moveList.pop();
		move.apply(this.board);
	}

	this.board.state = new TurnEnd(this.player, this.board, this.move, this.animation_on);
}

MoveSelected.prototype.calculateAnimation = function(){
	this.animationList = [];
	this.outOfBoardAnimationList = [];
	var finalTime = this.moveList[0].distance;
	for (var k in this.moveList){
		this.animationList.push(new PieceAnimation(this.moveList[k].difference, finalTime - this.moveList[k].distance, this.moveList[k].distance, this.scene.animationSpeed));
		if(this.moveList[k].isGoingOutOfBoard())
		{
			//Push to a list to do the animation later
			var height = 0.2;
			var speed = 0.1;
			var point1 = vec3.fromValues(this.moveList[k].destination[0]/9, 0, this.moveList[k].destination[1]/9);
			var point2 = vec3.fromValues(this.moveList[k].destination[0]/9, height, this.moveList[k].destination[1]/9);

			//TODO I need the Move to have reference to the player, owner of that piece.
			//TODO Sum point3/point4 to the coordinates of the auxiliarBoard origin.
			var point3 = this.board.auxiliarBoard.lastAvailableSlotPosition("Red"); //This assumes always its the red player
			var point4 = point3;
			point3[1] += height;
			
			var keyframeAnimation = new DisappearingAnimation([point1, point2, point3, point4], speed);
			this.outOfBoardAnimationList.push(keyframeAnimation);
		}
		else //Just to keep the paralellism with the moveList
		{
			this.outOfBoardAnimationList.push(undefined);
		}
		/*TEST
		var pointsList = [
		vec3.fromValues(0, 0, 0), 
		vec3.fromValues(0.5, 0, 0), 
		vec3.fromValues(0, 0.5, 0),
		vec3.fromValues(0,0,0.5)
		];
		this.animationList.push(new DisappearingAnimation(pointsList, 0.1));*/
	}
}

MoveSelected.prototype.updateAnimation = function (currTime){
	for(var a of this.animationList)
		a.updateMatrix(currTime);
	if(this.animationList[0].finished)
	{
		for(var b of this.outOfBoardAnimationList)
		{
			if(b)
				b.updateMatrix(currTime);
		}
	}
}

MoveSelected.prototype.checkOutAnimationFinished = function()
{
	for(var a of this.outOfBoardAnimationList)
	{
		if(a && !(a.finished)) //If one of the animations isn't finished
			return false;
	}

	return true;
}
