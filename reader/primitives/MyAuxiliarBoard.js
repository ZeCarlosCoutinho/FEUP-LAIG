/**
 * MyAuxiliarBoard
 * @constructor
 */
function MyAuxiliarBoard(scene, dX, dY, lenX, lenY) {
 	CGFobject.call(this,scene);
	
	this.dX = dX;
	this.dY = dY;
	this.lengthX = lenX;
	this.lengthY = lenY;
	this.initializeBoard();
	this.selected = [];
 };

MyAuxiliarBoard.prototype = Object.create(CGFobject.prototype);
MyAuxiliarBoard.prototype.constructor = MyAuxiliarBoard;

MyAuxiliarBoard.prototype.display = function () {
	this.scene.pushMatrix();
		for(var i = 1; i <= this.lengthX; i++){
			for(var j = 1; j <= this.lengthY; j++){
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

MyAuxiliarBoard.prototype.displaySelected = function () {
	for(var k = 0; k < this.selected.length; k++){
		var i = this.selected[k][0];
		var j = this.selected[k][1];

		this.scene.registerForPick(i*10+j, this.tiles[i][j]);
		this.scene.pushMatrix();
			this.scene.translate(0,0.001,0); //TODO This may not be the best way, cause we are displaying 2 times;
			this.scene.translate((i-1)/this.dX,0, (j-1)/this.dY);
			this.scene.scale(1/this.dX, 1/((this.dY+this.dX)/2), 1/this.dY);
			
			//TODO Opcional effect
			this.scene.translate(0.5,0,0.5);
			this.scene.scale(0.8,1,0.8);
			this.scene.translate(-0.5,0,-0.5);

			this.tiles[i][j].display();
		this.scene.popMatrix();
		this.scene.clearPickRegistration();
	}
};

MyAuxiliarBoard.prototype.initializeBoard = function()
{
	this.tiles = [];
	for(var i = 1; i <= this.lengthX; i++)
	{
		this.tiles[i] = [];
		for(var j = 1; j <= this.lengthY; j++){
			this.tiles[i][j] = new MyTile(this.scene, (i-1)/this.dX, (j-1)/this.dY, i/this.dX, j/this.dY);
		}
	}
};

