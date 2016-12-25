/**
 * Prim_Scorer
 * @constructor
 */
function Prim_Scorer(primitive_id) {
	this.id = primitive_id;
}

Prim_Scorer.prototype.toString=function(){
	return "Primitive Scorer Item " + this.id
	+ "\n";
}

/**
 * Creates a new MyScorer using the current data.
 * @param {CGFscene} scene
 * @return {MyScorer} a Scorer
 */
Prim_Scorer.prototype.create = function(scene) {
	return new MyNumberScorer(scene);
}
