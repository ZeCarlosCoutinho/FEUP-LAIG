/**
 * MyNumberTimer
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function MyNumberTimer(scene, player) {
	CGFobject.call(this,scene);

	this.numbers_material = new CGFappearance(this.scene);
	this.numbers_material.loadTexture("../reader/resources/images/numbers.png");//*/
	
	this.off_material = new CGFappearance(this.scene);
	this.off_material.setAmbient(0.1,0.1,0.1,1);
	this.off_material.setDiffuse(0.1,0.1,0.1,1);

	this.on_material = [];
	this.on_material["red"] = new CGFappearance(this.scene);
	this.on_material["red"].setShininess(10);
	this.on_material["red"].setAmbient(1,0.1,0.1,1);
	this.on_material["red"].setDiffuse(1,0.1,0.1,1);
	
	this.on_material["white"] = new CGFappearance(this.scene);
	this.on_material["white"].setShininess(10);
	this.on_material["white"].setAmbient(1,1,1,1);
	this.on_material["white"].setDiffuse(0.5,0.5,0.5,1);;
	
	this.light = new MySphere(this.scene, 0.4, 10, 10);

	this.number = [];
	for (var i = 0; i < 10; i++)
		this.number[i] = new MyTile(this.scene, i/10, 0, (i+1)/10, 1);
		
	this.side = new MyRectangle(this.scene, 0,0,1,1);
	this.timer = 0;
};

MyNumberTimer.prototype = Object.create(CGFobject.prototype);
MyNumberTimer.prototype.constructor=MyNumberTimer;

MyNumberTimer.prototype.display = function () {
	this.updateTimer();
	this.displayBody();
	this.displayNumbers();
	this.displayLight();
};

MyNumberTimer.prototype.updateTimer = function () {
	var game = this.scene.game;
	this.timer = Math.ceil(game.timer/1000);
};

MyNumberTimer.prototype.displayLight = function () {
	var curr_player = this.scene.game.state.player.color;
	if(this.timer % 2 == 0)
		this.off_material.apply();
	else
		this.on_material[curr_player].apply();

	this.scene.pushMatrix();
		this.scene.translate(1, 1, 0.5);
		this.scene.scale(1, 1, 1);
		this.light.display();
	this.scene.popMatrix();
		
};

MyNumberTimer.prototype.displayBody = function () {
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.scene.scale(2, 1, 1);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 1, 1);
		this.scene.rotate(Math.PI*3/2, 1,0,0);
		this.scene.scale(2, 1, 1);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2, 0, 1);
		this.scene.rotate(Math.PI/2, 0,1,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2, 0, 0);
		this.scene.rotate(Math.PI, 0,1,0);
		this.scene.scale(2, 1, 1);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI*3/2, 0,1,0);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.scale(2, 1, 1);
		this.side.display();
	this.scene.popMatrix();
};

MyNumberTimer.prototype.displayNumbers = function () {
	var n1 = Math.floor(this.timer/10) % 10;
	var n2 = this.timer % 10;

	
	this.numbers_material.apply();	
	this.scene.pushMatrix();
		this.scene.translate(0.1, 0.95, 1.01);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.scene.scale(0.9, 1, 0.9);
		this.number[n1].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(1, 0.95, 1.01);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.scene.scale(0.9, 1, 0.9);
		this.number[n2].display();
	this.scene.popMatrix();


};