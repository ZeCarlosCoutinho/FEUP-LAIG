/**
 * PCTurnStart
 * @constructor
 */

PCTurnStart.prototype = Object.create(GameState.prototype);

function PCTurnStart(player, board) {
	GameState.call(this, player, board);
	requestMove(this.board, this.player.color, this.player.difficulty);

	this.scene.changeMessage(player.name + "'s Turn");
};

PCTurnStart.prototype.display = function(){
	if(lastResponse != ""){
		this.move = parseMove(lastResponse);
		lastResponse = "";
	}

   	this.scene.pushMatrix();
		this.board.board.display();
	this.scene.popMatrix();

	var pieces = this.board.pieces;
    //Display Pieces
	for (var i = 1; i <= 9; i++){
		for (var j = 1; j <= 9; j++){
			//Draw Piece
			this.scene.pushMatrix();
				this.scene.translate((i-1)/9, 0, (j-1)/9);
				this.scene.scale(1/9, 1/9, 1/9);
				if (pieces[i][j])
					pieces[i][j].display();
			this.scene.popMatrix();
		}
	}   
	
   	if(this.move != undefined){
		this.next();
	}
};

PCTurnStart.prototype.next = function(){
	this.board.state = new MoveSelected(this.player, this.board, this.move);
};