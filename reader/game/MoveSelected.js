/**
 * MoveSelected
 * @constructor
 */

MoveSelected.prototype = Object.create(GameState.prototype);

function MoveSelected(player, board, move) {
    GameState.call(this, player, board);
    this.moveList = move.getImplication(board);

    this.calculateAnimation();
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

   	if(this.animationList[0].finished)
		this.next();
};

MoveSelected.prototype.next = function(){
	while (this.moveList.length != 0){
		var move = this.moveList.pop();
		move.apply(this.board);
	}
	var nextPlayer;
	if (this.player == "red")
		nextPlayer = "white";
	else
		nextPlayer = "red";
	this.board.state = new TurnStart(nextPlayer, this.board);
}

MoveSelected.prototype.calculateAnimation = function(){
    /*this.animationList = [];
    //for (var k = 0; k <= move.distance; k++){
        var x = move.coordinates[0];
        var z = move.coordinates[1];
        if (typeof this.board.pieces[x][z] != "undefined"){
            this.animationList[x][z] = new 
            for (var j = 0; j < k; j++){
                if ()
            }
            this.animationList[x][z] = new LinearAnimation("", )
        }
	//}  */
	/*this.animationList = [];
	var x = move.coordinates[0];
    var z = move.coordinates[1];
    for (var k = 0; k <= move.distance; k++){
        if (typeof this.board.pieces[x][z] != "undefined"){
            var dest = [move.distance - k, move.distance - k];
            vec3.mult(dest, move.directionVector);
            this.animationList[x][z] = new PieceAnimation(dest, initTime, dur);
        }
	} */

	this.animationList = [];
	var finalTime = this.moveList[0].distance;
	for (var k in this.moveList){
		this.animationList.push(new PieceAnimation(this.moveList[k].difference, finalTime - this.moveList[k].distance, this.moveList[k].distance));
	}
}

MoveSelected.prototype.updateAnimation = function (currTime){
	for(var a of this.animationList)
		a.updateMatrix(currTime);
}
