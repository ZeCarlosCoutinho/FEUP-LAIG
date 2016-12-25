/**
 * MyNumberScorer
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function MyNumberScorer(scene) {
	CGFobject.call(this,scene);

	this.numbers_material = new CGFappearance(this.scene);
	this.numbers_material.loadTexture("../reader/resources/images/numbers.png");//*/
	
	this.number = [];
	for (var i = 0; i < 10; i++)
		this.number[i] = new MyTile(this.scene, i/10, 0, (i+1)/10, 1);
		
	this.side = new MyRectangle(this.scene, 0,0,1,1);
};

MyNumberScorer.prototype = Object.create(CGFobject.prototype);
MyNumberScorer.prototype.constructor=MyNumberScorer;

MyNumberScorer.prototype.display = function () {
	this.displayBody();
	this.displayNumbers();
};


MyNumberScorer.prototype.displayBody = function () {
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

MyNumberScorer.prototype.displayNumbers = function () {
	this.numbers_material.apply();
	var red = this.scene.players["red"].points;
	var white = this.scene.players["white"].points;
		
	this.scene.pushMatrix();
		this.scene.translate(0.05, 0.95, 1.01);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.scene.scale(0.9, 1, 0.9);
		this.number[red].display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(1.05, 0.95, 1.01);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.scene.scale(0.9, 1, 0.9);
		this.number[white].display();
	this.scene.popMatrix();


};