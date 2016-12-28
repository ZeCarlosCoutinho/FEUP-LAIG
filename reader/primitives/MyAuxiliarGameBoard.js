/**
 * MyAuxiliarGameBoard
 * @constructor
 */
function MyAuxiliarGameBoard(scene) {
 	CGFobject.call(this,scene);
	
	this.dX = 8;
	this.dY = 2;
	this.board = new MyAuxiliarBoard(scene, 9, 9, this.dX, this.dY);
	this.redPieces = [];
	this.whitePieces = [];
 };

MyAuxiliarGameBoard.prototype = Object.create(CGFobject.prototype);
MyAuxiliarGameBoard.prototype.constructor = MyAuxiliarGameBoard;

MyAuxiliarGameBoard.prototype.display = function () {
	this.board.display();

	//Draw Red pieces
	for(var i = 0; i < this.redPieces.length; i++)
	{
		//Draw Piece
			this.scene.pushMatrix();
				this.scene.translate(i/9, 0, 0/9);
				this.scene.scale(1/9, 1/9, 1/9);
				if (this.redPieces[i])
					this.redPieces[i].display();
			this.scene.popMatrix();
	}

	//Draw White pieces
	for(var i = 0; i < this.whitePieces.length; i++)
	{
		//Draw Piece
			this.scene.pushMatrix();
				this.scene.translate(i/9, 0, 1/9);
				this.scene.scale(1/9, 1/9, 1/9);
				if (this.whitePieces[i])
					this.whitePieces[i].display();
			this.scene.popMatrix();
	}


};

MyAuxiliarGameBoard.prototype.lastAvailableSlot = function(player)
{
	if(player == "Red")
	{
		return this.redPieces.length;
	}
	else if(player == "White")
	{
		return this.whitePieces.length;
	}
};

//Returns the position of the slot relatively to auxiliarboard origin
MyAuxiliarGameBoard.prototype.lastAvailableSlotPosition = function(player)
{
	var slotnumber = this.lastAvailableSlot(player);

	if(player == "Red")
	{
		return vec3.fromValues(slotnumber/this.dX, 0, 0);
	}
	else if(player == "White")
	{
		return vec3.fromValues(slotnumber/this.dX, 0, 1/this.dY);
	}

};

MyAuxiliarGameBoard.prototype.insertPiece = function(piece)
{
	if(piece.player.name == "Red")
	{
		this.redPieces.push(piece);
	}
	else if(piece.player.name == "White")
	{
		this.whitePieces.push(piece);
	}
}

