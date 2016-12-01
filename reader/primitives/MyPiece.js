/**
 * MyPiece
 * @constructor
 */
function MyPiece(scene, player, size) {
 	CGFobject.call(this,scene);

 	this.player = player;
 	this.size = size;

 	//	Picked State
	this.picked = false;
};

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor = MyPiece;

MyPiece.prototype.display = function(){
	if (this.picked)
		this.scene.setActiveShader(this.scene.highlightShader);

    this.scene.pushMatrix();
        if(this.player == "red"){
            this.scene.translate(0.5,0,0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(-0.5,0,-0.5);
        }
        this.scene.playerMaterials[this.player].apply();
		this.scene.pieceObjects[this.size].display(this.scene.playerMaterials[this.player]);
	this.scene.popMatrix();

	if (this.picked)
		this.scene.setActiveShader(this.scene.defaultShader);
}

