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
	if (this.picked & !this.scene.pickMode)
		this.scene.setActiveShader(this.scene.highlightShader);

    this.scene.pushMatrix();
        if(this.player.color == "white"){
            this.scene.translate(0.5,0,0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(-0.5,0,-0.5);
        }
        var material = this.scene.gameMaterials[this.player.color];
        var texture = this.scene.gameTextures[this.player.color];
		if (texture){
			material.setTexture(texture.text);
			if (this.scene.pieceObjects[this.size].setTextureCoords != null)
				this.scene.pieceObjects[this.size].setTextureCoords(texture.lengthS, texture.lengthT);
		}
        
		this.scene.pieceObjects[this.size].display(material, texture);
		if(texture)
			material.setTexture(null);
	this.scene.popMatrix();
	
	if (this.picked & !this.scene.pickMode)
		this.scene.setActiveShaderSimple(this.scene.defaultShader);
}

