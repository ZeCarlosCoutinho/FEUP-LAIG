
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.interface = null;
	this.views = [];
	this.viewIndex = 0;
	this.lightsStatus = [];
	this.textures = [];
	this.materials = [];
	this.primitives = [];
	this.materialIndex = 0;
	this.rootObject == null;

	this.defaultAppearance = new CGFappearance(this);

	this.enableTextures(true); //È necessário para texturas
	this.testAppearance = new CGFappearance(this);
	this.testAppearance.loadTexture("../reader/resources/images/sauroneye.jpg");
	this.testAppearance2 = new CGFappearance(this);
	this.testAppearance2.loadTexture("../reader/primitives/carrotsPattern.png");
	
	/*this.test = new MyTorus(this, 1, 2, 10, 10);//*/
	/*this.test = new MySphere(this, 3, 10, 10);//*/
	/*this.test = new MyCylinder(this, 2, 2, 1, 3, 6);//*/
	/*this.test = new MyCylinderWithTops(this, 2, 2, 1, 3, 12);//*/
/*	this.test = new MyCircle(this, 4);
//*/
/*	this.test = new MyRectangle(this, 	0,0,
    									1,1);//*/
/*
    this.test = new MyTriangle(this, 	1,1,0,
    									0,0,0,
    									2,0,0);//*/

	this.axis=new CGFaxis(this);
};

XMLscene.prototype.setInterface= function (interface) {
	this.interface = interface;
};

XMLscene.prototype.updateLights = function () {
	for(var i = 0; i < this.lights.length; i++){
		if (this.lightsStatus[i])
			this.lights[i].enable();
		else
			this.lights[i].disable();
		this.lights[i].update();
	}
};

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.axis = new CGFaxis(this, this.graph.axis_length);
	this.createIllumination();
	this.createViews();
	this.camera = this.views[this.viewIndex % this.views.length];
	this.interface.setActiveCamera(this.views[this.viewIndex % this.views.length]);
	this.createLights();
	this.loadTextures();
	this.createMaterials();
	this.createPrimitives();
	this.rootObject = this.graph.components[this.graph.root].create(this);
	this.rootObject.updateMaterial(this.materialIndex, null);
	this.rootObject.updateTexture( null);
	/*this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);*/
	/*this.lights[0].setVisible(true);
    this.lights[0].enable();*/
};

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		this.updateLights();
		this.rootObject.display();
	};	
	
	this.pushMatrix();
		this.testAppearance.apply();
		//this.test.display();
	this.popMatrix();
	

};

XMLscene.prototype.createIllumination = function (){
	this.setGlobalAmbientLight(
		this.graph.illumination.ambient[0],
		this.graph.illumination.ambient[1],
		this.graph.illumination.ambient[2],
		this.graph.illumination.ambient[3]);
	this.gl.clearColor(
		this.graph.illumination.background[0],
		this.graph.illumination.background[1],
		this.graph.illumination.background[2],
		this.graph.illumination.background[3]);

	
}

XMLscene.prototype.createViews = function (){
	var i = 0;
	for(key in this.graph.viewsList){
		if (this.graph.defaultView == key)
			this.viewIndex = i;
		this.views[i] = this.graph.viewsList[key].create();
		i++;
	}
	
}

XMLscene.prototype.createLights = function (){
	var i = 0;
	for(key in this.graph.omniLights){
		this.lights[i].setPosition(
			this.graph.omniLights[key].location[0], 
			this.graph.omniLights[key].location[1], 
			this.graph.omniLights[key].location[2],
			this.graph.omniLights[key].location[3]);
    	this.lights[i].setDiffuse(
    		this.graph.omniLights[key].diffuse[0],
    		this.graph.omniLights[key].diffuse[1],
    		this.graph.omniLights[key].diffuse[2],
    		this.graph.omniLights[key].diffuse[3]);
    	this.lights[i].setAmbient(
    		this.graph.omniLights[key].ambient[0],
    		this.graph.omniLights[key].ambient[1],
    		this.graph.omniLights[key].ambient[2],
    		this.graph.omniLights[key].ambient[3]);
    	this.lights[i].setSpecular(
    		this.graph.omniLights[key].specular[0],
    		this.graph.omniLights[key].specular[1],
    		this.graph.omniLights[key].specular[2],
    		this.graph.omniLights[key].specular[3]);
    	this.lights[i].setVisible(true);

    	this.lightsStatus[i] = this.graph.omniLights[key].enabled;
    	this.interface.addOmniLight(key, i);
    	i++;
	}

	for(key in this.graph.spotLights){
		this.lights[i].setSpotDirection(
			this.graph.spotLights[key].target[0] - this.graph.spotLights[key].location[0], 
			this.graph.spotLights[key].target[1] - this.graph.spotLights[key].location[1], 
			this.graph.spotLights[key].target[2] - this.graph.spotLights[key].location[2]);
		this.lights[i].setPosition(
			this.graph.spotLights[key].location[0], 
			this.graph.spotLights[key].location[1], 
			this.graph.spotLights[key].location[2]);
    	this.lights[i].setDiffuse(
    		this.graph.spotLights[key].diffuse[0],
    		this.graph.spotLights[key].diffuse[1],
    		this.graph.spotLights[key].diffuse[2],
    		this.graph.spotLights[key].diffuse[3]);
    	this.lights[i].setAmbient(
    		this.graph.spotLights[key].ambient[0],
    		this.graph.spotLights[key].ambient[1],
    		this.graph.spotLights[key].ambient[2],
    		this.graph.spotLights[key].ambient[3]);
    	this.lights[i].setSpecular(
    		this.graph.spotLights[key].specular[0],
    		this.graph.spotLights[key].specular[1],
    		this.graph.spotLights[key].specular[2],
    		this.graph.spotLights[key].specular[3]);
    	this.lights[i].setVisible(true);

    	this.lightsStatus[i] = this.graph.spotLights[key].enabled;
    	this.interface.addSpotLight(key, i);
    	i++;
	}

}

XMLscene.prototype.loadTextures = function (){
	for(key in this.graph.textures){
		this.textures[key] = new CGFappearance(this);
		this.textures[key].loadTexture(this.graph.textures[key].file);
	}
}

XMLscene.prototype.createMaterials = function (){
	for(key in this.graph.materials){
		this.materials[key] = new CGFappearance(this);
		this.materials[key].setAmbient(
				this.graph.materials[key].ambient[0],
			    this.graph.materials[key].ambient[1],
			    this.graph.materials[key].ambient[2],
			    this.graph.materials[key].ambient[3]);
		this.materials[key].setEmission(
				this.graph.materials[key].emission[0],
			    this.graph.materials[key].emission[1],
			    this.graph.materials[key].emission[2],
			    this.graph.materials[key].emission[3]);
		this.materials[key].setDiffuse(
				this.graph.materials[key].diffuse[0],
			    this.graph.materials[key].diffuse[1],
			    this.graph.materials[key].diffuse[2],
			    this.graph.materials[key].diffuse[3]);
		this.materials[key].setSpecular(
				this.graph.materials[key].specular[0],
			    this.graph.materials[key].specular[1],
			    this.graph.materials[key].specular[2],
			    this.graph.materials[key].specular[3]);
		this.materials[key].setShininess = this.graph.materials[key].shininess;
		this.materials[key].setTextureWrap('REPEAT', 'REPEAT');
	}
}

XMLscene.prototype.createPrimitives = function (){
	for(key in this.graph.primitives){
		this.primitives[key] =this.graph.primitives[key] .create(this);
	}
}