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
	
	this.animation = this.gui.addFolder("Animations");
	this.animation.add(this.scene, "animationSpeed", 0.1, 5).name("Animation Speed");

	this.sound = this.gui.addFolder("Sounds");

	this.gameplay = this.gui.addFolder("Gameplay");
	this.gameplay.add(this.scene, "timer").min(0).step(1).name("Timer");
	
	this.lights = this.gui.addFolder("Lights");
	this.omniLights = this.lights.addFolder("Omni Lights");
	this.spotLights = this.lights.addFolder("Spot Lights");


	return true;
};


/**
 * Adds a new Volume Option to Sounds folder
 * @param {String} id
 * @param {Number} i
 */
MyInterface.prototype.addPlayerOptions = function() {
	this.redPlayer = this.gameplay.addFolder(this.scene.players["red"].name);
	this.redPlayer.add(this.scene.players["red"], "type", ["pc", "human"]);
	this.redPlayer.add(this.scene.players["red"], "difficulty", [0, 1, 2, 3]);

	this.whitePlayer = this.gameplay.addFolder(this.scene.players["white"].name);
	this.whitePlayer.add(this.scene.players["white"], "type", ["pc", "human"]);
	this.whitePlayer.add(this.scene.players["white"], "difficulty", [0, 1, 2, 3]);
}

/**
 * Adds a new Volume Option to Sounds folder
 * @param {String} id
 * @param {Number} i
 */
MyInterface.prototype.addVolume = function(id, name) {
	this.sound.add(this.scene.gameSounds[id], "volume", 0, 1).name(name);
}


/**
 * Adds a new light to Omni Lights folder
 * @param {String} id
 * @param {Number} i
 */
MyInterface.prototype.addOmniLight = function(id , i) {
	this.omniLights.add(this.scene.lightsStatus, i , this.scene.lightsStatus[i]).name(id);
}

/**
 * Adds a new light to Spot Lights folder
 * @param {String} id
 * @param {Number} i
 */
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
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (86):
        case (118): // V/v
        	this.scene.viewIndex++;
     		this.scene.camera = this.scene.views[this.scene.viewIndex % this.scene.views.length];
            this.setActiveCamera(this.scene.views[this.scene.viewIndex % this.scene.views.length]);
            break;
		case (77):
        case (109):	// M/m
			if (this.scene.rootObject != null){
				this.scene.materialIndex++;
				this.scene.rootObject.updateMaterial(this.scene.materialIndex);
			}
			break;
		case (85):
		case (117): // U/u
			if(this.scene.game.state instanceof TurnStart || this.scene.game.state instanceof PieceSelected)
			{
				this.scene.game.state.remakeMove();
			}
			break;
		case (65):
		case (97): // A/a
			{
				this.scene.game.animation_on = !this.scene.game.animation_on;
			}
			break;
		case(67):
		case(99): // C/c
			//this.scene.setGameCam(this.scene.game.state.player.name);
			//this.scene.setGameCam();
			this.scene.game.camRotating = true;
			break;
		case(83):
		case(115): // S/s
			if(this.scene.game.state instanceof Start)
				this.scene.game.state.next();
			break;
	};
};
