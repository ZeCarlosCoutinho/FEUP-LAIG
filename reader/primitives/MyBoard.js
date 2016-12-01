/**
 * MyBoard
 * @constructor
 */
function MyBoard(scene, texture) {
 	CGFobject.call(this,scene);

 	
	this.board = new MyChessBoard(this.scene, [9,9], [0,0], texture, [1,1,1,1], [1,1,1,1], [1,1,1,1]);
	//this.board = new MyChessBoard(this.scene, [9,9], [0,0], texture, [1,1,1,0], [1,1,1,0], [1,1,1,1]);
	//this.board = new MyChessBoard(this.scene, [9,9], [1,5], texture, [1,0,1,1], [0,1,0,1], [1,1,1,1]);
	this.initializePieces();

	//this.state = new TurnStart("red", this);

	//Testing
	this.pieces[3][5].picked = true;
	this.pieces[7][5].picked = true;
	console.log(this.toString());
	requestScore(this);
	requestMove(this);
};

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.board.display();
	this.scene.popMatrix();

	for (var i = 1; i <= 9; i++){
		for (var j = 1; j <= 9; j++){
			this.scene.pushMatrix();
				//this.scene.translate((i-1)/9, 0, (i-1)/9);
				this.scene.translate((i-1)/9, 0, (j-1)/9);
				this.scene.scale(1/9, 1/9, 1/9);
				if (this.pieces[i][j])
					this.pieces[i][j].display();
			this.scene.popMatrix();
		}
	}
 };

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

