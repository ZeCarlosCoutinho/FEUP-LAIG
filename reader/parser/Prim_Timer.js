/**
 * Prim_Timer
 * @constructor
 */
function Prim_Timer(primitive_id) {
	this.id = primitive_id;
}

Prim_Timer.prototype.toString=function(){
	return "Primitive Timer Item " + this.id
	+ "\n";
}

/**
 * Creates a new MyTimer using the current data.
 * @param {CGFscene} scene
 * @return {MyTimer} a Timer
 */
Prim_Timer.prototype.create = function(scene) {
	return new MyNumberTimer(scene);
}
