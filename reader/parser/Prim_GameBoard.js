/**
 * Prim_GameBoard
 * @constructor
 */
function Prim_GameBoard(primitive_id) {
	this.id = primitive_id;
	
}

Prim_GameBoard.prototype.toString=function(){
	return "Primitive GameBoard Item " + this.id
	+ "\n";
}

/**
 * Creates a new MyBoard using the current data.
 * @param {CGFscene} scene
 * @return {MyBoard} a game board
 */
Prim_GameBoard.prototype.create=function(scene){
	scene.game = new MyBoard(scene);
	return scene.game;
}
