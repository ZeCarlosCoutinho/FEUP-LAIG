/**
 * Prim_Tile
 * @constructor
 */
function Prim_Tile(primitive_id) {
	this.id = primitive_id;
	
	this.tx1 = [];
	this.tx2 = [];
}

Prim_Tile.prototype.toString=function(){
	return "Primitive Tile Item " + this.id + "\n(X1, Y1): (" + this.x1 + "," + this.y1 + ")\n(X2, Y2): (" + this.x2 + "," + this.y2 + ")\n(" +
	this.tx1[0] + "," + this.tx1[1] + ")\n(" + this.tx2[0] + "," + this.tx2[1] + ")\n";
}

/**
 * Creates a new MyTile using the current data.
 * @param {CGFscene} scene
 * @return {MyTile} a rectangle
 */
Prim_Tile.prototype.create = function(scene){
	if(this.tx1[0] == null)
		this.tx1[0] = 0;
	if(this.tx1[1] == null)
		this.tx1[1] = 0;
	if(this.tx2[0] == null)
		this.tx2[0] = 1;
	if(this.tx2[1] == null)
		this.tx2[1] = 1;
	return new MyTile(scene, this.tx1[0],this.tx1[1], this.tx2[0], this.tx2[1]);
}