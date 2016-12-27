/**
 * AutoTurnStart
 * @constructor
 */

AutoTurnStart.prototype = Object.create(GameState.prototype);

function AutoTurnStart(player, board) {
	GameState.call(this, player, board);
	this.scene.camera_controller.set(player.color);
};

AutoTurnStart.prototype.display = function(){

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
	
 	this.next();

};

AutoTurnStart.prototype.next = function(){
	if (this.board.movesDone.length == this.board.turn){
		this.scene.players["red"].type =this.board.playersTypes["red"];
		this.scene.players["white"].type = this.board.playersTypes["white"];
		this.board.animation_on = true;
		this.board.state = new TurnStart(this.player, this.board);
		
	}
	else{
		this.move = this.board.movesDone[this.board.turn].move;
		this.board.turn++;
		this.board.state = new MoveSelected(this.player, this.board, this.move);
	}
};