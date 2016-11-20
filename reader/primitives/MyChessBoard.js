/**
 * MyChessBoard
 * @constructor
 */
function MyChessBoard(scene, dimensions, selected, texture, c1, c2, cs) {
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
	this.board = new MyPlane(this.scene, 1 , 1, dimensions[0] * 8, dimensions[1] * 8);
 };

MyChessBoard.prototype = Object.create(CGFobject.prototype);
MyChessBoard.prototype.constructor = MyChessBoard;

MyChessBoard.prototype.display = function () {
	this.scene.pushMatrix();
		this.texture.bind(0);
		this.scene.setActiveShader(this.shader);
		this.board.display();
		this.scene.setActiveShader(this.scene.defaultShader);
		//this.texture.unbind(0);
	this.scene.popMatrix();
 };
