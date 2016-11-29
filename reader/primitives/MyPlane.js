/**
 * MyPlane
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function MyPlane(scene, u_length, v_length, u_parts, v_parts) {
	CGFobject.call(this,scene);

	getSurfacePoint = function(u, v) {
		return [u_length * u, v_length*v, 0]
	};

	this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, u_parts, v_parts);
};

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor=MyPlane;

MyPlane.prototype.display = function () {
	this.obj.display();
};