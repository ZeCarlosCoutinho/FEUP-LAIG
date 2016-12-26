/**
 * End
 * @constructor
 */

End.prototype = Object.create(GameState.prototype);

function End(player, board) {
	GameState.call(this, player, board);
	this.board.timer_on = false;

	if (this.player instanceof Player)
		this.scene.changeMessage("Player '" + this.player.name + "' won!");
	else
	 	this.scene.changeMessage("Draw!");
};

End.prototype.display = function(){
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
	
};

End.prototype.next = function(){

};