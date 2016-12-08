/**
 * PieceSelected
 * @constructor
 */

PieceSelected.prototype = Object.create(GameState.prototype);

function PieceSelected(player, board, pieceChosen) {
	GameState.call(this, player, board);

    this.pieceChosen = pieceChosen; //Piece passed to the from the previous state
    this.tileChosen;
};

PieceSelected.prototype.display = function()
{
	if(lastResponse != ""){
		this.board.board.selected = parseListMoves(lastResponse);
		lastResponse = "";
	}

  	//Parse pick information
	this.logPicking();

    //Display the wood board
	this.scene.pushMatrix();
		this.board.board.display();
	this.scene.popMatrix();

    //Pick ID
	var chosen_position;

    var pieces = this.board.pieces;
    //Display Pieces
	for (var i = 1; i <= 9; i++){
		for (var j = 1; j <= 9; j++){
			if (this.pieceChosen[0] == pieces[i][j])
				chosen_position = [i, j];

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

	if (!this.scene.pickMode)
		this.scene.setActiveShader(this.scene.highlightShader);
	
	//Draw Piece
	var i = chosen_position[0];
	var j = chosen_position[1];
	this.scene.pushMatrix();
		this.scene.translate((i-1)/9, 0, (j-1)/9);
		this.scene.scale(1/9, 1/9, 1/9);
		if (pieces[i][j])
			pieces[i][j].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.board.board.displaySelected();
	this.scene.popMatrix();


   //TODO EXTRA Highlight aos tiles possiveis

   if (!this.scene.pickMode)
		this.scene.setActiveShaderSimple(this.scene.defaultShader);
};

PieceSelected.prototype.logPicking = function()
{
    if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
					var Id = this.scene.pickResults[i][1];
					/*
					console.log(customId);
					this.scene.pickResults[i][0].picked = true;*/
					if(Id >= 100){
							var coords = [];
							coords[0] = Math.floor((this.scene.pickResults[i][1] - 100) / 10);
							coords[1] = (this.scene.pickResults[i][1] - 100) % 10;
    						requestPossibleMoves(this.board, this.player, coords);
    						this.pieceChosen = this.scene.pickResults[i];
					}			
						 
					else{
						this.tileChosen = this.scene.pickResults[i];
						this.next();
					}

					//Clear Selected
					this.board.board.selected = [];
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}		
	}
};

PieceSelected.prototype.next = function(){
	console.log(this.tileChosen[1]);

	var Xi = Math.floor((this.pieceChosen[1] - 100) / 10);
	var Zi = (this.pieceChosen[1] - 100) % 10;
	var Xf = Math.floor((this.tileChosen[1]) / 10);
	var Zf = (this.tileChosen[1]) % 10;

	var dir;
	var dist;
	if (Xi > Xf){
		dir = "west";
		dist = Xi - Xf;
	}
	else if (Xi < Xf){
		dir = "east";
		dist = Xf - Xi;
	}
	else if (Zi > Zf){
		dir = "north";
		dist = Zi - Zf;
	}
	else if (Zi < Zf){
		dir = "south";
		dist = Zf - Zi;
	}

	var move = new Move([Xi, Zi], dir, dist);
    this.board.state = new MoveSelected(this.player, this.board, move);
}
