/**
 * Start
 * @constructor
 */

Start.prototype = Object.create(GameState.prototype);

function Start(player, board) {
	GameState.call(this, player, board);

	this.scene.changeMessage("Press 'S' to start or click on 'Play'");
};

Start.prototype.display = function(){
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

Start.prototype.next = function(){
	this.scene.changeMessage("");
	
	switch(this.player.type){
	case "human":
		this.board.state = new TurnStart(this.player, this.board);
		break;
	case "pc":
		this.board.state = new PCTurnStart(this.player, this.board);
		break;
	case "auto":
		this.board.state = new AutoTurnStart(this.player, this.board);
		break;
	default:
		console.log("Error");
	}
};