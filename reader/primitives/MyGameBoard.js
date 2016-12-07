/**
 * MyGameBoard
 * @constructor
 */
function MyGameBoard(scene, dX, dY) {
 	CGFobject.call(this,scene);
	
	this.dX = dX;
	this.dY = dY;
	this.initializeBoard();
	this.selected = [];
 };

MyGameBoard.prototype = Object.create(CGFobject.prototype);
MyGameBoard.prototype.constructor = MyGameBoard;

MyGameBoard.prototype.display = function () {
	this.scene.pushMatrix();
		for(var i = 1; i <= this.dX; i++){
			for(var j = 1; j <= this.dY; j++){
				//Draw Piece
				this.scene.pushMatrix();
					this.scene.translate((i-1)/this.dX,0, (j-1)/this.dY);
					this.scene.scale(1/this.dX, 1/((this.dY+this.dX)/2), 1/this.dY);
						this.tiles[i][j].display();
				this.scene.popMatrix();
		}
	}   
	this.scene.popMatrix();
 };

MyGameBoard.prototype.displaySelected = function () {
	for(var k = 0; k < this.selected.length; k++){
		var i = this.selected[k][0];
		var j = this.selected[k][1];

		this.scene.registerForPick(i*10+j, this.tiles[i][j]);
		this.scene.pushMatrix();
			this.scene.translate(0,0.001,0); //TODO This may not be the best way, cause we are displaying 2 times;
			this.scene.translate((i-1)/this.dX,0, (j-1)/this.dY);
			this.scene.scale(1/this.dX, 1/((this.dY+this.dX)/2), 1/this.dY);
			
			//TODO Opcional effect
			this.scene.translate(0.45,0,0.45);
			this.scene.scale(0.8,1,0.8);
			this.scene.translate(-0.5,0,-0.5);

			this.tiles[i][j].display();
		this.scene.popMatrix();
	}
};

MyGameBoard.prototype.initializeBoard = function()
{
	this.tiles = [];
	for(var i = 1; i <= this.dX; i++)
	{
		this.tiles[i] = [];
		for(var j = 1; j <= this.dY; j++){
			this.tiles[i][j] = new MyTile(this.scene, (i-1)/this.dX, (j-1)/this.dY, i/this.dX, j/this.dY);
		}
	}
};

