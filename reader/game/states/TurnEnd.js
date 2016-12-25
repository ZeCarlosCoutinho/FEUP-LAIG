/**
 * TurnEnd
 * @constructor
 */

TurnEnd.prototype = Object.create(GameState.prototype);

function TurnEnd(player, board, move) {
	GameState.call(this, player, board);
	requestScore(this.board);
    
    if(this.player.type != "auto"){
    	//Puts the move in the stack
		var moveEntry = [];
		moveEntry.move = move;
		moveEntry.player = this.player;
		this.board.movesDone.push(moveEntry);
		this.board.turn++;
    }
};

TurnEnd.prototype.display = function()
{
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

	this.board.startCamAnimation();
	
	if(lastResponse != ""){
		var scores = parseScores(lastResponse);
		lastResponse = "";
		this.board.updateScores(scores);
		this.next();
	}
 
};

TurnEnd.prototype.next = function(){
	var nextPlayer;
	if (this.player.color == "red")
		nextPlayer = "white";
	else
		nextPlayer = "red";
	nextPlayer =  this.scene.players[nextPlayer];

	switch(nextPlayer.type ){
	case "human":
		this.board.state = new TurnStart(nextPlayer, this.board);
		break;
	case "pc":
		this.board.state = new PCTurnStart(nextPlayer, this.board);
		break;
	case "auto":
		this.board.state = new AutoTurnStart(nextPlayer, this.board);
		break;
	default:
		console.log("Error");
	}
};