/**
 * MyPiece
 * @constructor
 */
function MyPiece(scene, player, size) {
 	CGFobject.call(this,scene);

 	this.player = player; 	
};

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor = MyPiece;



