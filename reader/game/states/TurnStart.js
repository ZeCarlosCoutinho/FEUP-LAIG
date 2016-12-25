/**
 * TurnStart
 * @constructor
 */

TurnStart.prototype = Object.create(GameState.prototype);

function TurnStart(player, board) {
	GameState.call(this, player, board);

	if (this.scene.timer > 0){
		this.board.timer_on = true;
		this.board.timer_init = false; //Next update sets timer_init
		this.board.timer = 0;
	}
    
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

	if (this.timeout)
		this.board.state = new End(this.board.nextPlayer(), this.board);
};

TurnStart.prototype.logPicking = function()
{
   if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
				   this.pieceChosen = this.scene.pickResults[i];
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}		
	}
	if (this.pieceChosen != null){
		//SOUND
    	var audio = this.scene.gameSounds["select"];
    	if (audio.paused) {
    	    audio.play();
    	}else{
    	    audio.currentTime = 0
    	}
    	
	   	this.next();
	}
};

TurnStart.prototype.next = function(){
	var coords = [];
	//console.log("Error = " + this.pieceChosen[1]);
	coords[0] = Math.floor((this.pieceChosen[1] - 100) / 10);
	coords[1] = (this.pieceChosen[1] - 100) % 10;
    requestPossibleMoves(this.board, this.player.color, coords);
    this.board.state = new PieceSelected(this.player, this.board, this.pieceChosen);
}

TurnStart.prototype.undo = function()
{
	//Resets board
	var previousBoard = new MyBoard(this.scene);

	//Store last player
	var lastPlayer;

	var lastMove = this.board.movesDone.pop(); //Delete last move from the moves stack
	lastPlayer = lastMove.player;
	if(lastPlayer.type == "pc")
	{
		//Pops again if the AI did the last turn
		lastMove = this.board.movesDone.pop();
		lastPlayer = lastMove.player;
	}


	//Copy movesDone to the new board
	previousBoard.movesDone = this.board.movesDone;

	//Remakes moves until last one
	for(var i = 0; i < this.board.movesDone.length; i++)
	{
		var moveList = this.board.movesDone[i].move.getImplication(previousBoard);
		while (moveList.length != 0){
		var move = moveList.pop();
		move.apply(previousBoard);
		}
	}
	
	this.board.state = new TurnStart(lastPlayer, previousBoard);
}