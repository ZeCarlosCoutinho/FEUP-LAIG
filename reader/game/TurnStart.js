/**
 * TurnStart
 * @constructor
 */

TurnStart.prototype = Object.create(GameState.prototype);

function TurnStart(player, board) {
	GameState.call(this, player, board);
    
    this.pieceChosen = null; //Piece passed to the next state
};

TurnStart.prototype.display = function()
{
    //Parse pick information
	this.logPicking();

    //Display the wood board
	this.scene.pushMatrix();
		/*this.scene.translate(0, 0, 1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);*/
		this.board.board.display();
	this.scene.popMatrix();

    //Pick ID

    var pieces = this.board.pieces;
    //Display Pieces
	for (var i = 1; i <= 9; i++){
		for (var j = 1; j <= 9; j++){
		    //If there's a piece and it is from the current player
			if (typeof pieces[i][j] != "undefined" && pieces[i][j].player == this.player){
				this.scene.registerForPick(100+i*10+j, pieces[i][j]);
			}

			//Draw Piece
			this.scene.pushMatrix();
				this.scene.translate((i-1)/9, 0, (j-1)/9);
				this.scene.scale(1/9, 1/9, 1/9);
				if (pieces[i][j])
					pieces[i][j].display();
			this.scene.popMatrix();
			this.scene.clearPickRegistration();
		}
	}   
};

TurnStart.prototype.logPicking = function()
{
   if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
				    /*
					var customId = this.scene.pickResults[i][1];
					console.log(customId);
					this.scene.pickResults[i][0].picked = true;*/
					this.pieceChosen = this.scene.pickResults[i];
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}		
	}
	if (this.pieceChosen != null)
	   this.next();
};

TurnStart.prototype.next = function(){
	var coords = [];
	coords[0] = Math.floor((this.pieceChosen[1] - 100) / 10);
	coords[1] = (this.pieceChosen[1] - 100) % 10;
    requestPossibleMoves(this.board, this.player, coords);
    this.board.state = new PieceSelected(this.player, this.board, this.pieceChosen[0]);
}


