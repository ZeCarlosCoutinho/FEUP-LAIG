/**
 * Prim_Patch
 * @constructor
 */
function Prim_Patch(primitive_id) {
	this.id = primitive_id;
	
	this.order_u = 0;
	this.order_v = 0;
	this.u_parts = 0;
	this.v_parts = 0;
	this.controlPoints = [];
}

Prim_Patch.prototype.toString=function(){
	return "Primitive Patch Item " + this.id
	+ "\nOrder U: " + this.u_length + " Order V: " + this.u_length
	+ "\nU_Parts: " + this.u_parts + " V_Parts: " + this.v_parts
	+ "\n";
}

/**
 * Creates a new MyPatch using the current data.
 * @param {CGFscene} scene
 * @return {MyPatch} a patch
 */
Prim_Patch.prototype.create=function(scene){
	var controlPoints = [];
	for(var i = 0; i < this.order_u +1; i++)
		controlPoints[i] = [];
	for(var j = 0; j < this.controlPoints.length; j++){
		var v = Math.floor(j / (this.order_u+1));
		var u = j % (this.order_u+1);
		var t = (u * (this.order_u+1) + v);
		controlPoints[u][v] = this.controlPoints[j];
	}
	console.log(this.controlPoints);
	console.log(controlPoints);
	return new MyPatch(scene, this.order_u, this.order_v, this.u_parts, this.v_parts, controlPoints);
}

