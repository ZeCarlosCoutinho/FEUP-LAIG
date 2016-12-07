/**
 * MyGameBoard
 * @constructor
 */
function MyGameBoard(scene, dimensions, selected, texture, c1, c2, cs) {
 	CGFobject.call(this,scene);
	
	this.dimensions = dimensions;
	this.selected = selected;
	this.texture = texture;
	this.c1 = c1;
	this.c2 = c2;
	this.cs = cs;

	this.shader  = new CGFshader(this.scene.gl, 'shaders/customShader.vert', 'shaders/customShader.frag');
	this.shader.setUniformsValues({	dimensions: dimensions,
									c1: c1,
									c2: c2,
									cs: cs,
									selected: selected});
	this.board = [];
	new MyPlane(this.scene, 1 , 1, dimensions[0] * 8, dimensions[1] * 8);
 };

MyGameBoard.prototype = Object.create(CGFobject.prototype);
MyGameBoard.prototype.constructor = MyGameBoard;

MyGameBoard.prototype.display = function () {
	this.scene.pushMatrix();
		this.texture.bind(0);
		this.scene.setActiveShader(this.shader);
		this.board.display();
		this.scene.setActiveShader(this.scene.defaultShader);
	this.scene.popMatrix();
 };

MyGameBoard.prototype.initializeBoard = function()
{
	for(var i = 0; i < this.dimensions[0]; i++)
	{
		var row = [];
		for(var j = 0; j < this.dimensions[1]; j++)
		{
			row.push(new MyPlane(this.scene, 1, 1, 1, 1));
		}
	}
}