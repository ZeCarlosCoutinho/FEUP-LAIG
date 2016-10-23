/**
 * MyCylinderWithTops
 * @constructor
 */
function MyCylinderWithTops(scene, height, bRadius, tRadius, stacks, slices) {
 	CGFobject.call(this,scene);
	
	this.height = height;
	this.bRadius = bRadius;
	this.tRadius = tRadius;

	//Cylinder with tops is made of one Cylinder and 2 circles. "Top" circle will be diplayed 2 times, in each of Cylinder's holes
	this.cylinder = new MyCylinder(this.scene, height, bRadius, tRadius, stacks, slices);
	this.top = new MyCircle(this.scene, slices);
 };

MyCylinderWithTops.prototype = Object.create(CGFobject.prototype);
MyCylinderWithTops.prototype.constructor = MyCylinderWithTops;

MyCylinderWithTops.prototype.display = function () {

	//Display Cylinder
	this.scene.pushMatrix();
		this.cylinder.display();
	this.scene.popMatrix();

	//Display one Top
	this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height);
		this.scene.scale(this.tRadius, this.tRadius, 1);
		this.top.display();
	this.scene.popMatrix();

	//Display other Top
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.scene.scale(this.bRadius, this.bRadius, 1);
		this.top.display();
	this.scene.popMatrix();
 };
