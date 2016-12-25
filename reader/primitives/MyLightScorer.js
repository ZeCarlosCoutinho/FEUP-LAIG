/**
 * MyLightScorer
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function MyLightScorer(scene, player) {
	CGFobject.call(this,scene);

	this.player = player;
	
	this.off_material = new CGFappearance(this.scene);
	this.off_material.setAmbient(0.1,0.1,0.1,1);
	this.off_material.setDiffuse(0.1,0.1,0.1,1);

	this.on_material = new CGFappearance(this.scene);
	this.on_material.setShininess(10);
	if (this.player == "red"){
		this.on_material.setAmbient(1,0.1,0.1,1);
		this.on_material.setDiffuse(1,0.1,0.1,1);
	}
	else{
		this.on_material.setAmbient(1,1,1,1);
		this.on_material.setDiffuse(0.5,0.5,0.5,1);;
	}
	//this.on_material = new CGFappearance(this.scene, [1,1,1,1], [1,1,1,1],[1,1,1,1], 0);

	this.side = new MyRectangle(this.scene, 0,0,1,1);
	this.lights = new MySphere(this.scene, 0.4, 10, 10);
};

MyLightScorer.prototype = Object.create(CGFobject.prototype);
MyLightScorer.prototype.constructor=MyLightScorer;

MyLightScorer.prototype.display = function () {
	this.displayBody();
	this.displayLights();
};


MyLightScorer.prototype.displayBody = function () {
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 7, 1);
		this.scene.rotate(Math.PI*3/2, 1,0,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(1, 0, 1);
		this.scene.scale(1, 7, 1);
		this.scene.rotate(Math.PI/2, 0,1,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(1, 0, 0);
		this.scene.scale(1, 7, 1);
		this.scene.rotate(Math.PI, 0,1,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(1, 7, 1);
		this.scene.rotate(Math.PI*3/2, 0,1,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.scale(1, 7, 1);
		this.side.display();
	this.scene.popMatrix();
};

MyLightScorer.prototype.displayLights = function () {
	this.scene.pushMatrix();
		this.on_material.apply();
		this.scene.translate(0.5, -0.5, 0.9);

		for(var i = 1; i <= 7; i++){
			if (i > this.scene.players[this.player].points)
				this.off_material.apply();
			this.scene.translate(0, 1, 0);	
			this.lights.display();
		}
	
	this.scene.popMatrix();
};