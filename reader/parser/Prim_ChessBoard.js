/**
 * Prim_ChessBoard
 * @constructor
 */
function Prim_ChessBoard(primitive_id) {
	this.id = primitive_id;
	
	this.dimensions =  [];
	this.selected =  [];
	this.textureref;
	this.c1 = [];
	this.c2 = [];
	this.cs = [];
}

Prim_ChessBoard.prototype.toString=function(){
	return "Primitive Plane Item " + this.id
	+ "\nDimensions: " + this.dimensions + " Selected: " + this.selected
	+ "\nColor 1: " + this.c1 + " Color 2: " + this.c2 + " Color Selected: " + this.cs
	+ "\n";
}

/**
 * Creates a new MyPlane using the current data.
 * @param {CGFscene} scene
 * @return {MyCylinderWithTops} a cylinder
 */
Prim_ChessBoard.prototype.create=function(scene){
	return new MyChessBoard(scene, this.dimensions, this.selected, scene.textures[textureref], this.c1, this.c2, this.cs);
}

