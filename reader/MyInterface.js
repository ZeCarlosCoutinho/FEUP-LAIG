/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	CGFinterface.prototype.init.call(this, application);
	
	this.gui = new dat.GUI();


	this.omniLights = this.gui.addFolder("Omni Lights");
	this.omniLights.open();

	this.spotLights = this.gui.addFolder("Spot Lights");
	this.spotLights.open();
	/*// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	group.add(this.scene, 'LightZero');
	group.add(this.scene, 'LightOne');
	group.add(this.scene, 'LightTwo');
	group.add(this.scene, 'LightThree');
	group.add(this.scene, 'LightFour');

	//this.gui.add(this.scene, 'speed', -5, 5);
	this.gui.add(this.scene, 'speed', -10, 10);

	//this.gui.add(this.scene, 'currDroneAppearance', {A: 0, B: 1});
	this.gui.add(this.scene, 'currDroneAppearance', this.scene.droneAppearancesList);
	*/

	//this.gui.add(this.scene, 'helixSpeed', 0.1, 2);
	return true;
};

MyInterface.prototype.addOmniLight = function(id , i) {
	this.omniLights.add(this.scene.lightsStatus, i , this.scene.lightsStatus[i]).name(id);
}

MyInterface.prototype.addSpotLight = function(id , i) {
	this.spotLights.add(this.scene.lightsStatus, i , this.scene.lightsStatus[i]).name(id);
}

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// A
			this.scene.drone.angularSpeed = this.scene.speed;
			break;
		case (97):	// a
			this.scene.drone.angularSpeed = this.scene.speed;
			break;

		case (68):	// D
			this.scene.drone.angularSpeed = -this.scene.speed;
			break;
		case (100):	// d
			this.scene.drone.angularSpeed = -this.scene.speed;
			break;

		case (87):	// W
			this.scene.drone.frontalSpeed = this.scene.speed;
			break;
		case (119):	// w
			this.scene.drone.frontalSpeed = this.scene.speed;
			break;
		
		case (83):	// S
			this.scene.drone.frontalSpeed = -this.scene.speed;
			break;
		case (115):	// s
			this.scene.drone.frontalSpeed = -this.scene.speed;
			break;
		
		case (73):	// I
			this.scene.drone.verticalSpeed = this.scene.speed;
			break;
		case (105):	// I
			this.scene.drone.verticalSpeed = this.scene.speed;
			break;

		case (74):	// I
			this.scene.drone.verticalSpeed = -this.scene.speed;
			break;
		case (106):	// I
			this.scene.drone.verticalSpeed = -this.scene.speed;
			break;

		case (80):	// P
			this.scene.drone.retractHook();
			break;
		case (112):	// p
			this.scene.drone.retractHook();
			break;

		case (76):	// L
			this.scene.drone.extendHook();
			break;
		case (108):	// l
			this.scene.drone.extendHook();
			break;
	};
};
