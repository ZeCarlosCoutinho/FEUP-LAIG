/**
 * MyBoard
 * @constructor
 */
function MyBoard(scene) {
 	CGFobject.call(this,scene);

 	this.scene.players = [];
	this.scene.players["red"] = new Player("Red", "red", "human");
	this.scene.players["white"] = new Player("White", "white", "pc", 1);
	
	this.animation_on = true;
	
	this.board = new MyGameBoard(this.scene, 9, 9);
	this.initializePieces();
	this.pickingTable = []; //Stores picking ids;

	this.movesDone = [];
	this.turn = 0;

	this.state = new TurnStart(this.scene.players["red"], this);
};

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
	var material = this.scene.gameMaterials["board"];
	if (this.scene.gameTextures["board"])
		material.setTexture(this.scene.gameTextures["board"].text);
	
	this.scene.gameMaterials["board"].apply();
	this.state.display();
	
	material.setTexture(null);
	
};


MyBoard.prototype.getSimpleMoveList = function(move){
	move.coordinates;
}

MyBoard.prototype.initializePieces = function () {
	this.pieces = [];
	this.destroyedPieces = [];
	for (var i = 1; i <=9; i++){
		this.pieces[i] = [];
	}
	this.pieces[1][1] = new MyPiece(this.scene, this.scene.players["red"], 3);
	this.pieces[1][9] = new MyPiece(this.scene, this.scene.players["red"], 3);
	this.pieces[2][3] = new MyPiece(this.scene, this.scene.players["red"], 2);
	this.pieces[2][4] = new MyPiece(this.scene, this.scene.players["red"], 1);
	this.pieces[2][5] = new MyPiece(this.scene, this.scene.players["red"], 1);
	this.pieces[2][6] = new MyPiece(this.scene, this.scene.players["red"], 1);
	this.pieces[2][7] = new MyPiece(this.scene, this.scene.players["red"], 2);
	this.pieces[3][5] = new MyPiece(this.scene, this.scene.players["red"], 1);

	this.pieces[9][1] = new MyPiece(this.scene, this.scene.players["white"], 3);
	this.pieces[9][9] = new MyPiece(this.scene, this.scene.players["white"], 3);
	this.pieces[8][3] = new MyPiece(this.scene, this.scene.players["white"], 2);
	this.pieces[8][4] = new MyPiece(this.scene, this.scene.players["white"], 1);
	this.pieces[8][5] = new MyPiece(this.scene, this.scene.players["white"], 1);
	this.pieces[8][6] = new MyPiece(this.scene, this.scene.players["white"], 1);
	this.pieces[8][7] = new MyPiece(this.scene, this.scene.players["white"], 2);
	this.pieces[7][5] = new MyPiece(this.scene, this.scene.players["white"], 1);
};


MyBoard.prototype.toString = function () {
	var str = "[";
	for (var i = 1; i <=9; i++){
		str = str + "[";
		for (var j = 1; j <=9; j++){
			if (this.pieces[j][i])
				str = str + this.pieces[j][i].size + "-" + this.pieces[j][i].player.color;
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