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

   	if(!this.animation_on || this.animationList[0].finished)
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
	var finalTime = this.moveList[0].distance;
	for (var k in this.moveList){
		this.animationList.push(new PieceAnimation(this.moveList[k].difference, finalTime - this.moveList[k].distance, this.moveList[k].distance, this.scene.animationSpeed));
	}
}

MoveSelected.prototype.updateAnimation = function (currTime){
	for(var a of this.animationList)
		a.updateMatrix(currTime);
}
