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

	this.graphics  = this.gui.addFolder("Graphics");
	this.dsx = this.graphics.addFolder("Scene");
	this.camera = this.graphics.addFolder("Camera");
	this.filename = "game.dsx";

	this.animation = this.gui.addFolder("Animations");
	this.animation.add(this.scene, "animationSpeed", 0.1, 5).name("Animation Speed");

	this.sound = this.gui.addFolder("Sounds");

	this.gameplay = this.gui.addFolder("Gameplay");
	this.gameplay.add(this.scene, "timer").min(0).step(1).name("Timer");
	this.redPlayer = this.gameplay.addFolder("Red");
	this.whitePlayer = this.gameplay.addFolder("White");
	
	this.lights = this.gui.addFolder("Lights");
	this.omniLights = this.lights.addFolder("Omni Lights");
	this.spotLights = this.lights.addFolder("Spot Lights");

	this.controls = this.gui.addFolder("Controls");
	this.controls.open();

	return true;
};


/**
 * Adds a new Volume Option to Sounds folder
 * @param {String} id
 * @param {Number} i
 */
MyInterface.prototype.addGameOptions = function() {
	this.graphics.add(this, "handleToggleLights").name("Show Lights");
	this.graphics.add(this, "handleToggleAxis").name("Show Axis");

	this.animation.add(this.scene.game, "animation_on").name("Animation ON/OFF").listen();

	this.camera.add(this.scene.camera_controller, "speed", 0.1, 5).name("Camera Speed");
	this.camera.add(this.scene.camera_controller, "center_camera_on").name("Camera Lock");
	this.camera.add(this.scene.camera_controller, "auto_set_on").name("Camera Auto Set");
	
	//this.redPlayer = this.gameplay.addFolder(this.scene.players["red"].name);
	this.redPlayer.add(this.scene.players["red"], "type", ["pc", "human"]).name("Type");
	this.redPlayer.add(this.scene.players["red"], "difficulty", [0, 1, 2, 3]).name("Difficulty");

	//this.whitePlayer = this.gameplay.addFolder(this.scene.players["white"].name);
	this.whitePlayer.add(this.scene.players["white"], "type", ["pc", "human"]).name("Type");
	this.whitePlayer.add(this.scene.players["white"], "difficulty", [0, 1, 2, 3]).name("Difficulty");

	this.controls.add(this, "handlePlay").name("Play");
	this.controls.add(this, "handleReplay").name("Replay");
	this.controls.add(this, "handleUndo").name("Undo");

	var filenames = ["sea.dsx", "space.dsx", "game.dsx"];
	this.dsx.add(this, "filename", filenames).name("File");
	this.dsx.add(this, "handleSceneChange").name("Change");
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
	
	console.log(this.scene.game.animation_on );
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (86):
        case (118): // V/v
     		this.scene.camera_controller.next();
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
			this.handleUndo();
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
			this.handlePlay();
			break;
		
		case(82):
		case(114): // R/r
			if(this.scene.game.state instanceof TurnStart || this.scene.game.state instanceof End)
			this.handleReplay();
			break;
	};
};



/*
* -------------------------------  HANDLERS -------------------------------
*/
MyInterface.prototype.handlePlay= function(){
	if(this.scene.game.state instanceof Start)
		this.scene.game.state.next();		
}

MyInterface.prototype.handleReplay= function(){
	if(this.scene.game.state instanceof TurnStart || this.scene.game.state instanceof End){
		this.scene.game.state.replay();
	}
}

MyInterface.prototype.handleUndo= function(){
	if(this.scene.game.state instanceof TurnStart || this.scene.game.state instanceof PieceSelected){
		this.scene.game.state.remakeMove();
	}		
}

MyInterface.prototype.handleToggleLights= function(){
	for(var i in this.scene.lights)
		this.scene.lights[i].visible = !this.scene.lights[i].visible;		
}

MyInterface.prototype.handleToggleAxis= function(){
	this.scene.axis_on = !this.scene.axis_on;		
}

MyInterface.prototype.handleSceneChange = function(){
	this.game = this.scene.game;
	this.scene.gameSounds["background"].pause();
	
	var myGraph = new MySceneGraph(this.filename, this.scene);
}