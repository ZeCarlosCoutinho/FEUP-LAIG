/**
 * MyBoat
 * @constructor
 */
function MyBoat(scene) {
 	CGFobject.call(this,scene);
	var hullPointSize = -0.2;
	this.hull = new MyPatch(this.scene, 3, 2, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ -1, 0, 0.0, 1 ],
					[ -1.2, 3, 0, 1 ],
					[ 0,  7.0, hullPointSize, 1 ]			
				],
				// U = 1
				[ // V = 0..3
					 [ -1, 0, 1, 1 ],
					 [ -1.2, 3, 2, 1],
					 [ 0,  6.0, 0.5, 1 ]
				],
				// U = 2
				[ // V = 0..3							 
				 	 [ 1, 0, 1, 1 ],
					 [ 1.2, 3, 2, 1],
					 [ 0,  6.0, 0.5, 1 ]
				],
				// U = 3
				[ // V = 0..3							 
					[ 1, 0, 0.0, 1 ],
					[ 1.2, 3, 0, 1 ],
					[ 0,  7.0, hullPointSize, 1 ]
				]
			]);
	this.frame = new MyPatch(this.scene, 3, 2, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ 1, 0, 0.0, 1 ],
					[ 1.2, 3, 0, 1 ],
					[ 0,  7.0, hullPointSize, 1 ]		
				],
				// U = 1
				[ // V = 0..3
					  [ 1, 0, 1, 1 ],
					 [ 1.2, 3, 2, 1],
					 [ 0,  6.0, 0.5, 1 ]
				],
				// U = 2
				[ // V = 0..3							 
				 	  [ -1, 0, 1, 1 ],
					 [ -1.2, 3, 2, 1],
					 [ 0,  6.0, 0.5, 1 ]
				],
				// U = 3
				[ // V = 0..3							 
					[ -1, 0, 0.0, 1 ],
					[ -1.2, 3, 0, 1 ],
					[ 0,  7.0, hullPointSize, 1 ]
				]
			]);
	this.mast = new MyCylinderWithTops(this.scene, 3, 0.1, 0.1, 6, 10);
 };

MyBoat.prototype = Object.create(CGFobject.prototype);
MyBoat.prototype.constructor = MyBoat;

MyBoat.prototype.display = function () {
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.hull.display();
		this.frame.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.mast.display();
	this.scene.popMatrix();
};
