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
							this.scene.multMatrix(this.animationList[m].matrix);
					}
					this.scene.translate((i-1)/9, 0, (j-1)/9);
					this.scene.scale(1/9, 1/9, 1/9);
					pieces[i][j].display();
				this.scene.popMatrix();
			}
		}
	}

   	if(!this.animation_on || this.animation_finished())
		this.next();
};

MoveSelected.prototype.next = function(){
	while (this.moveList.length != 0){
		var move = this.moveList.pop();
		move.apply(this.board);
	}

	this.board.state = new TurnEnd(this.player, this.board, this.move, this.animation_on);
}

MoveSelected.prototype.animation_finished = function(){
	for (var k in this.animationList)
		if (!this.animationList[k].finished)
			return false;
	return true;
}

MoveSelected.prototype.calculateAnimation = function(){
	this.animationList = [];
	var finalTime = this.moveList[0].distance;
	for (var k in this.moveList){
		if(this.moveList[k].goesOut()){
			var animationList = [];
			animationList.push(new PieceAnimation(this.moveList[k].difference, finalTime - this.moveList[k].distance, this.moveList[k].distance, this.scene.animationSpeed));
			
			var k1 = [0,0,0];
			var nP = this.board.aux_board.nextPosition()
			var bP = this.board.aux_board_position;
			var dP = this.moveList[k].destination;
			
			var k5 = [
				nP[0] + bP[0] - dP[0]/9 + 1/9,
				nP[1] + bP[1],
				nP[2] + bP[2] - dP[1]/9 + 1/9
			];

			var s = size([k5[0] - k1[0], k5[1] - k1[1], k5[2] - k1[2]]);
			var mP = mediumPoint(k1, k5);
			var k3 = [
				mP[0],
				mP[1] + s/3,
				mP[2]
			]

			var k2 = [
				k1[0]*2/3 + k3[0]*1/3,
				k1[1]/2 + k3[1]/2,
				k1[2]*2/3 + k3[2]*1/3,
			]

			var k4 = [
				k5[0]*2/3 + k3[0]*1/3,
				k5[1]/2 + k3[1]/2,
				k5[2]*2/3 + k3[2]*1/3,
			]
			
			animationList.push(new DisappearingAnimation([k1, k2, k3, k4, k5], this.scene.animationSpeed));
			this.animationList.push(new CompoundAnimation("", animationList));
			this.board.next++;
		}
		else
			this.animationList.push(new PieceAnimation(this.moveList[k].difference, finalTime - this.moveList[k].distance, this.moveList[k].distance, this.scene.animationSpeed));
	}
}

MoveSelected.prototype.updateAnimation = function (currTime){
	for(var a of this.animationList)
		a.updateMatrix(currTime);
}


size = function(vec)
{
	return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1] +vec[2]*vec[2]);
}

mediumPoint = function(vec1, vec2){
	return [(vec1[0]+vec2[0])/2, (vec1[1]+vec2[1])/2, (vec1[2]+vec2[2])/2];
}