/**
 * MyPatch
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function MyPatch(scene, order_u, order_v, u_parts, v_parts, controlPoints) {
	CGFobject.call(this,scene);
	
	var knots1 = this.getKnotsVector(order_u); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(order_v); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(order_u, order_v, knots1, knots2, controlPoints); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, u_parts, v_parts);
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor=MyPatch;

MyPatch.prototype.display = function () {
	this.obj.display();
};

MyPatch.prototype.getKnotsVector = function (order){
	var knots = [];
	for(var i = 0; i < (order+1)*2; ++i) {
		knots.push(Math.round(i/((order+1)*2), 0));
	}
	return knots;
}