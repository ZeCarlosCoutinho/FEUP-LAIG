/**
 * MyAuxiliarBoard
 * @constructor
 */
function MyAuxiliarBoard(scene, dX, dY, lenX, lenY, pieces) {
 	CGFobject.call(this,scene);
	
	this.dX = dX;
	this.dY = dY;
	this.lengthX = dX/lenX;
	this.lengthY = dY/lenY;
	this.mainX = lenX;
	this.mainY = lenY;
	this.initializeBoard();
	this.pieces = pieces;
	this.next = 0;
};

MyAuxiliarBoard.prototype = Object.create(CGFobject.prototype);
MyAuxiliarBoard.prototype.constructor = MyAuxiliarBoard;

MyAuxiliarBoard.prototype.display = function () {
	this.next = this.pieces.length;

	this.scene.pushMatrix();
		for(var i = 1; i <= this.dX; i++){
			for(var j = 1; j <= this.dY; j++){
				this.scene.pushMatrix();
					this.scene.translate((i-1)/this.lengthX,0, (j-1)/this.lengthY);
					this.scene.scale(1/this.lengthX, 1/((this.lengthY+this.lengthX)/2), 1/this.lengthY);
					this.tiles[i][j].display();
				this.scene.popMatrix();
		}
	}   
	this.scene.popMatrix();

	//Draw Pieces
	this.scene.pushMatrix();
		for(var k = 0; k < this.pieces.length; k++){
			var i = Math.floor(k/this.dY);
			var j = k % this.dY;
			var curr = this.pieces[k];
			this.scene.pushMatrix();
				this.scene.translate((i)/this.lengthX, 0, (j)/this.lengthY);
				this.scene.scale(1/this.lengthX, 1/((this.lengthY+this.lengthX)/2), 1/this.lengthY);
				curr.display();
			this.scene.popMatrix();
		}
	this.scene.popMatrix();
 };

MyAuxiliarBoard.prototype.initializeBoard = function()
{
	this.tiles = [];
	for(var i = 1; i <= this.dX; i++)
	{
		this.tiles[i] = [];
		for(var j = 1; j <= this.dY; j++){
			this.tiles[i][j] = new MyTile(this.scene, (i-1)/this.lengthX, (j-1)/this.lengthY, i/this.lengthX, j/this.lengthY);
		}
	}
};

MyAuxiliarBoard.prototype.nextPosition = function()
{
	var i = Math.floor(this.next/this.dY);
	var j = this.next % this.dY;
	return [(i)/this.lengthX, 0, (j)/this.lengthY];
};