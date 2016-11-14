/**
 * MyBoat
 * @constructor
 */
function MyBoat(scene, woodMaterial) {
 	CGFobject.call(this,scene);

	this.initPatches();
	this.initCannonsParts();
		
	this.woodMaterial = woodMaterial || new CGFappearance(this.scene);

	this.mast = new MyCylinderWithTops(this.scene, 4, 0.07, 0.03, 6, 10);
	this.yard = new MyCylinderWithTops(this.scene, 2, 0.03, 0.03, 6, 10);
	this.top = new MyCylinderWithTops(this.scene, 0.2, 0.15, 0.2, 6, 10);
	this.wheel = new MyTorus(this.scene,0.02,0.1,10,10);
 };

MyBoat.prototype = Object.create(CGFobject.prototype);
MyBoat.prototype.constructor = MyBoat;

MyBoat.prototype.display = function () {
	// Sails
	//FM Upper Sail
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 3.5); // FM Position
		this.scene.translate(0,2,0); // Upper
		this.displaySail();
	this.scene.popMatrix();

	//FM Lower Sail
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 3.5); // FM Position
		this.scene.scale(1.3,1,1); // Lower
		this.scene.translate(0,0.5,0); // Lower
		this.displaySail();
	this.scene.popMatrix();

	//MM Upper Sail
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 2); // MM Position
		this.scene.scale(1.3,1.3,1.3); //MM scale
		this.scene.translate(0,2,0); // Upper
		this.displaySail();
	this.scene.popMatrix();

	//MM Lower Sail
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 2); // MM Position
		this.scene.scale(1.3,1.3,1.3); //MM scale
		this.scene.scale(1.3,1,1); // Lower
		this.scene.translate(0,0.5,0); // Lower
		this.displaySail();
	this.scene.popMatrix();

	//Cannons
	this.displayAllCannons();
	
	
	//Body
	this.displayBody();
	
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 5);
		this.displayWheel();
	this.scene.popMatrix();

	//Main Mast
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 2);
		this.scene.scale(1.3,1.3,1.3);
		this.displayMast();
	this.scene.popMatrix();

	//Foremast
	this.scene.pushMatrix();
		this.scene.translate(0,-0.1, 3.5);
		this.displayMast();
	this.scene.popMatrix();

};

MyBoat.prototype.displayWheel = function () {
	this.woodMaterial.apply();
	this.scene.pushMatrix();
		this.scene.scale(1, 0.05, 1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.mast.display();
	this.scene.popMatrix();
	
	this.cannonMaterial.apply();
	this.scene.pushMatrix();
		this.scene.translate(0, 0.2, -0.05);
		this.wheel.display();

		this.scene.pushMatrix();
			this.scene.translate(0, -0.15, 0);
			this.scene.scale(0.3, 0.15, 0.3);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.yard.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0, 0, 1);
			this.scene.translate(0, -0.15, 0);
			this.scene.scale(0.3, 0.15, 0.3);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.yard.display();
		this.scene.popMatrix();
	this.scene.popMatrix();


};

MyBoat.prototype.displayAllCannons = function () {
	//Left
	this.scene.pushMatrix();
		this.scene.translate(0.9,-0.1, 1.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.9,-0.1, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.85,-0.1, 2);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.8,-0.1, 2.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.72,-0.1, 3);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	//Left
	this.scene.pushMatrix();
		this.scene.translate(-0.9,-0.1, 1.5);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.9,-0.1, 1);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.85,-0.1, 2);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.8,-0.1, 2.5);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.72,-0.1, 3);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.displayCannon();
	this.scene.popMatrix();


};
MyBoat.prototype.displayBody = function () {
	this.woodMaterial.apply();
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.hull.display();
		this.frame.display();
		this.floor.display();
		this.back.display();
		this.backInside.display();
	this.scene.popMatrix();
};

MyBoat.prototype.displaySail = function () {
		this.scene.pushMatrix();
			this.sail.display();
			this.sailBack.display();
		this.scene.popMatrix();

};

MyBoat.prototype.displayMast = function () {
	this.woodMaterial.apply();

	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.mast.display();
	this.scene.popMatrix();
	//Yards
	this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		
		//Lower
		this.scene.pushMatrix();
			this.scene.translate(0,0,-1.7);
			this.scene.scale(1,1,1.7)
			this.yard.display();
		this.scene.popMatrix();
		//Middle
		this.scene.pushMatrix();
			this.scene.translate(0,1.5,-1.3);
			this.scene.scale(1,1,1.3)
			this.yard.display();
		this.scene.popMatrix();
		//Upper
		this.scene.pushMatrix();
			this.scene.translate(0,3,-1);
			this.yard.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,3.6,0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.top.display();
	this.scene.popMatrix();
};

MyBoat.prototype.displayCannon = function (){
	this.cannonMaterial.apply();
	this.scene.pushMatrix();
		this.scene.scale(0.2,0.2,0.2); 
		this.scene.translate(0,0.3,0);
		//Cannon body
		this.scene.pushMatrix();
			this.scene.translate(0,0.2,0);
			this.scene.rotate(-Math.PI/6, 1, 0, 0);
			this.cannon.display();
		this.scene.popMatrix();

		//R wheel
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.translate(0, 0, 0.2);
			this.cannonWheel.display();
		this.scene.popMatrix();

		//L wheel
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, 0, 0.2);
			this.cannonWheel.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

};

MyBoat.prototype.initCannonsParts = function (){
	this.cannonMaterial = new CGFappearance(this.scene);
	this.cannonMaterial.setDiffuse(0.02,0.02,0.02,0.02);
	this.cannonMaterial.setSpecular(0.8,0.8,0.8,0.8);
	this.cannonMaterial.setAmbient(0.02,0.02,0.02,0.02);
	this.cannonMaterial.setEmission(0.02,0.02,0.02,0.02);
	this.cannonWheel = new MyCylinderWithTops(this.scene, 0.2, 0.3, 0.3, 6, 10);
	this.cannon = new MyCylinderWithTops(this.scene, 1, 0.2, 0.15, 6, 10);
};
MyBoat.prototype.initPatches = function (){
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
	this.floor = new MyPatch(this.scene, 3, 2, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ 	0.97, 		0, 		0.1, 		1 ],
					[ 	1.15, 	3, 		0.1, 		1 ],
					[ 	0,  	6.4, 	0.1, 		1 ]		
				],
				// U = 1
				[ // V = 0..3
					[ 	1,		0, 		0.1, 		1 ],
					[ 	1.2, 	3, 		0.1, 		1],
					[ 	0,  	6.0, 	0.1, 		1 ]
				],
				// U = 2
				[ // V = 0..3							 
				 	[ 	-1, 	0,	 	0.1, 		1 ],
					[ 	-1.2,	3, 		0.1, 		1 ],
					[ 	0,  	6.0,	0.1,		1 ]
				],
				// U = 3
				[ // V = 0..3							 
					[ 	-0.97, 	0, 		0.1, 		1 ],
					[ 	-1.15, 	3, 		0.1, 		1 ],
					[ 	0,  	6.4, 	0.1, 		1 ]
				]
			]);
	this.sail = new MyPatch(this.scene, 2, 2, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ 	-1.2, 	0, 		0, 			1 ],
					[ 	-1.1, 	0.75, 	0.5, 		1 ],
					[ 	-1, 	1.5, 	0, 			1 ]		
				],
				// U = 1
				[ // V = 0..3
					[ 	0, 		0.5, 	0.2, 		1 ],
					[ 	0, 		1, 		1, 			1 ],
					[ 	0, 		1.5, 	0.2, 		1 ]		
				],
				// U = 2
				[ // V = 0..3							 
				 	[ 	1.2, 	0, 		0, 			1 ],
					[ 	1.1, 	0.75, 	0.5, 		1 ],
					[ 	1, 		1.5, 	0, 			1 ]		
				]
			]);
	this.sailBack = new MyPatch(this.scene, 2, 2, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ 	1.2, 	0, 		0, 			1 ],
					[ 	1.1, 	0.75, 	0.5, 		1 ],
					[ 	1, 	1.5, 	0, 			1 ]		
				],
				// U = 1
				[ // V = 0..3
					[ 	0, 		0.5, 	0.2, 		1 ],
					[ 	0, 		1, 		1, 			1 ],
					[ 	0, 		1.5, 	0.2, 		1 ]		
				],
				// U = 2
				[ // V = 0..3							 
				 	[ 	-1.2, 	0, 		0, 			1 ],
					[ 	-1.1, 	0.75, 	0.5, 		1 ],
					[ 	-1, 		1.5, 	0, 			1 ]		
				]
			]);

	this.back = new MyPatch(this.scene, 3, 1, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ 1, 	0, 0, 1 ],
					[ 0,  	0, 0, 1 ]			
				],
				// U = 1
				[ // V = 0..3
					 [ 1, 	0, 1, 1 ],
					 [ 0,  	0, 0.5, 1 ]
				],
				// U = 2
				[ // V = 0..3							 
				 	 [ -1, 	0, 1, 1 ],
					 [ 0,  	0, 0.5, 1 ]
				],
				// U = 3
				[ // V = 0..3							 
					[ -1, 	0, 0, 1 ],
					[ 0,  	0, 0, 1 ]
				]
			]);
	this.backInside = new MyPatch(this.scene, 3, 1, 30, 30,
			[	// U = 0
				[ // V = 0..2;
					[ -1, 	0, 0, 1 ],
					[ 0,  	0, 0, 1 ]			
				],
				// U = 1
				[ // V = 0..3
					 [- 1, 	0, 1, 1 ],
					 [ 0,  	0, 0.5, 1 ]
				],
				// U = 2
				[ // V = 0..3							 
				 	 [ 1, 	0, 1, 1 ],
					 [ 0,  	0, 0.5, 1 ]
				],
				// U = 3
				[ // V = 0..3							 
					[ 1, 	0, 0, 1 ],
					[ 0,  	0, 0, 1 ]
				]
			]);
};