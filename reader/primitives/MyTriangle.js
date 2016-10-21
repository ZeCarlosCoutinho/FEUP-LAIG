/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
 	CGFobject.call(this,scene);
	
 	this.x1 = x1;
 	this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
 	this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
 	this.y3 = y3;
    this.z3 = z3;

 	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function() {
 	this.vertices = [
 	  this.x1, this.y1, this.z1,
 	  this.x2, this.y2, this.z2,
      this.x3, this.y3, this.z3
 	];

 	this.indices = [
 	  0, 1, 2
 	];


    this.U = [ this.x2-this.x1, this.y2-this.y1, this.z2-this.z1];
    this.V = [ this.x3-this.x1, this.y3-this.y1, this.z3-this.z1];
    this.N = [
      this.U[1]*this.V[2] - this.U[2]*this.V[1],
      this.U[2]*this.V[0] - this.U[0]*this.V[2],
      this.U[0]*this.V[1] - this.U[1]*this.V[0]
    ];

    this.normals = [
      this.N[0], this.N[1], this.N[2],
      this.N[0], this.N[1], this.N[2],
      this.N[0], this.N[1], this.N[2]
    ];


    this.a = Math.sqrt(
      (this.x1 - this.x3)*(this.x1 - this.x3) + 
      (this.y1 - this.y3)*(this.y1 - this.y3) + 
      (this.z1 - this.z3)*(this.z1 - this.z3)
    );
    this.b = Math.sqrt(
      (this.x2 - this.x1)*(this.x2 - this.x1) + 
      (this.y2 - this.y1)*(this.y2 - this.y1) + 
      (this.z2 - this.z1)*(this.z2 - this.z1)
    );
    this.c = Math.sqrt(
      (this.x3 - this.x2)*(this.x3 - this.x2) + 
      (this.y3 - this.y2)*(this.y3 - this.y2) + 
      (this.z3 - this.z2)*(this.z3 - this.z2)
    );

    this.cosAlpha = (- (this.a * this.a) + (this.b * this.b) + (this.c * this.c)) / (2 * this.b * this.c)
    this.cosBeta = ((this.a * this.a) - (this.b * this.b) + (this.c * this.c)) / (2 * this.a * this.c)
    this.cosEpsilon = ((this.a * this.a) + (this.b * this.b) - (this.c * this.c)) / (2 * this.a * this.b)

    this.sinBeta = Math.sin(Math.acos(this.cosBeta));

    this.baseTexCoords = [
      this.c - this.a * this.cosBeta, 1 - this.a * this.sinBeta,
      0, 1,
      this.c, 1
    ];

    this.setTextureCoords(1,1);

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

MyTriangle.prototype.setTextureCoords = function(lengthS, lengthT) {
   this.texCoords = [
    this.baseTexCoords[0] / lengthS, this.baseTexCoords[1] / lengthT,
    this.baseTexCoords[2] / lengthS, this.baseTexCoords[3] / lengthT,
    this.baseTexCoords[4] / lengthS, this.baseTexCoords[5] / lengthT
  ];
    
}
 