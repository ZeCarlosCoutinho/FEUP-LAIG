/**
 * Prim_AuxiliarBoard
 * @constructor
 */
function Prim_AuxiliarBoard(primitive_id) {
	this.id = primitive_id;
	
}

Prim_AuxiliarBoard.prototype.toString=function(){
	return "Primitive Auxiliar Board Item " + this.id
	+ "\n";
}

/**
 * Creates a new MyBoard using the current data.
 * @param {CGFscene} scene
 * @return {MyBoard} a game board
 */
Prim_AuxiliarBoard.prototype.create=function(scene){
	scene.game.auxiliarBoard = new MyAuxiliarGameBoard(scene);
	return scene.game.auxiliarBoard;
}
