/**
 * MyBoard
 * @constructor
 */
function MyBoard(scene) {
 	CGFobject.call(this,scene);

 	
	this.board = new MyGameBoard(this.scene, 9, 9);
	this.initializePieces();
	this.pickingTable = []; //Stores picking ids;
	this.state = new TurnStart("red", this);
	//Testing
	//var array = (new Move([2,5], "east", 1)).getImplication(this);
	//console.log(array);

	/*
	this.pieces[1][1].picked = true;
	this.pieces[7][5].picked = true;//*/
};

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
	this.state.display();
};


MyBoard.prototype.getSimpleMoveList = function(move){
	move.coordinates;
}

/*
MyBoard.prototype.logPicking = function()
{
    if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
					var customId = this.scene.pickResults[i][1];
					console.log(customId);
					this.scene.pickResults[i][0].picked = true;
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}		
	}
};*/

MyBoard.prototype.initializePieces = function () {
	this.pieces = [];
	for (var i = 1; i <=9; i++){
		this.pieces[i] = [];
	}
	this.pieces[1][1] = new MyPiece(this.scene, "red", 3);
	this.pieces[1][9] = new MyPiece(this.scene, "red", 3);
	this.pieces[2][3] = new MyPiece(this.scene, "red", 2);
	this.pieces[2][4] = new MyPiece(this.scene, "red", 1);
	this.pieces[2][5] = new MyPiece(this.scene, "red", 1);
	this.pieces[2][6] = new MyPiece(this.scene, "red", 1);
	this.pieces[2][7] = new MyPiece(this.scene, "red", 2);
	this.pieces[3][5] = new MyPiece(this.scene, "red", 1);

	this.pieces[9][1] = new MyPiece(this.scene, "white", 3);
	this.pieces[9][9] = new MyPiece(this.scene, "white", 3);
	this.pieces[8][3] = new MyPiece(this.scene, "white", 2);
	this.pieces[8][4] = new MyPiece(this.scene, "white", 1);
	this.pieces[8][5] = new MyPiece(this.scene, "white", 1);
	this.pieces[8][6] = new MyPiece(this.scene, "white", 1);
	this.pieces[8][7] = new MyPiece(this.scene, "white", 2);
	this.pieces[7][5] = new MyPiece(this.scene, "white", 1);
};


MyBoard.prototype.toString = function () {
	var str = "[";
	for (var i = 1; i <=9; i++){
		str = str + "[";
		for (var j = 1; j <=9; j++){
			if (this.pieces[j][i])
				str = str + this.pieces[j][i].size + "-" + this.pieces[j][i].player;
			else
				str = str + "empty";
			if (j < 9)
				str = str + ",";
		}
		str = str + "]";
		if (i < 9)
			str = str + ",";
	}
	str = str + "]";
	return str;
};

MyBoard.prototype.toString2 = function () {
	var str = "[";
	for (var i = 1; i <=9; i++){
		str = str + "[";
		for (var j = 1; j <=9; j++){
			if (this.pieces[j][i])
				str = str + this.pieces[j][i].size + "-" + this.pieces[j][i].player;
			else
				str = str + "empty";
			if (j < 9)
				str = str + ", ";
		}
		str = str + "]";
		if (i < 9)
			str = str + ",\n";
	}
	str = str + "]";
	return str;
};

MyBoard.prototype.updateAnimation = function (currTime){
	if (this.state instanceof MoveSelected)
		this.state.updateAnimation(currTime);
}