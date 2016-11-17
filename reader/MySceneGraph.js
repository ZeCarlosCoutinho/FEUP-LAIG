
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	this.root;
	this.axis_length;
	this.illumination = new Illumination();
	this.omniLights = [];
	this.spotLights = [];
	this.transformations = [];
	this.textures = [];
	this.primitives = [];
	this.materials = [];
	this.viewsList=[];
	this.animations = [];
	this.components = [];

	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	var errorScene = this.parseScene(rootElement);
	var errorViews = this.parseViews(rootElement);
	var errorIllumination = this.parseIllumination(rootElement);
	var errorLights = this.parseLights(rootElement);
	var errorTextures = this.parseTextures(rootElement);
	var errorMaterials = this.parseMaterials(rootElement);
	var errorTransformations = this.parseTransformations(rootElement);
	var errorPrimitives = this.parsePrimitives(rootElement);
	var errorAnimations = this.parseAnimations(rootElement);
	var errorComponents = this.parseComponents(rootElement);
	
	if (errorScene != null) {
		this.onXMLError(errorScene);
		return;
	}	
	if (errorViews != null) {
		this.onXMLError(errorViews);
		return;
	}	
	if (errorIllumination != null) {
		this.onXMLError(errorIllumination);
		return;
	}	
	if (errorLights != null) {
		this.onXMLError(errorLights);
		return;
	}	
	if (errorTextures != null) {
		this.onXMLError(errorTextures);
		return;
	}	
	if (errorMaterials != null) {
		this.onXMLError(errorMaterials);
		return;
	}	
	if (errorTransformations != null) {
		this.onXMLError(errorTransformations);
		return;
	}	
	if (errorPrimitives != null) {
		this.onXMLError(errorPrimitives);
		return;
	}	
	if(errorAnimations != null) {
		this.onXMLError(errorAnimations);
		return;
	}
	if (errorComponents != null) {
		this.onXMLError(errorComponents);
		return;
	}

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
	this.loadedOk=true;
};

MySceneGraph.prototype.parseScene= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('scene');
	if (elems == null) {
		return "scene element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	// Read elements of scene
	var scene = elems[0];
	this.root = this.reader.getString(scene, 'root');
	this.axis_length = this.reader.getFloat(scene, 'axis_length');

	if (this.axis_length < 0)
		return "axis length is invalid.";

	console.log("Scene read from file: {root=" + this.root + ", axis_length=" + this.axis_length + "}");
};

MySceneGraph.prototype.parseViews= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('views');
	if (elems == null) {
		return "views element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'views' element found.";
	}

	// Reads the default view
	var views = elems[0];
	this.defaultView = this.reader.getString(views, 'default');
	
	//Gets all elements
	var perspectivesElements = views.getElementsByTagName('perspective');
	if (perspectivesElements.length == 0)
		return "no views were found.";


	//for each perpective tag
	for (var i = 0; i < perspectivesElements.length; i++)
	{
		//Gets Element
		var currentPerspective = perspectivesElements[i];
		var currentPerspective_id = this.reader.getString(currentPerspective, 'id');
		
		// Verify if the id already exists
		if (this.viewsList[currentPerspective_id] != null)
		{		
			return "ID ERROR: view[" + currentPerspective_id + "] already exists";
		}
		
		this.viewsList[currentPerspective_id] = new View(currentPerspective_id);
		//Get attributes
		this.viewsList[currentPerspective_id].near = this.reader.getFloat(currentPerspective, 'near');
		this.viewsList[currentPerspective_id].far = this.reader.getFloat(currentPerspective, 'far');
		this.viewsList[currentPerspective_id].angle = rtoa(this.reader.getFloat(currentPerspective, 'angle'));
		this.viewsList[currentPerspective_id].from = this.readPatternXYZ(currentPerspective.getElementsByTagName('from')[0]);
		this.viewsList[currentPerspective_id].to = this.readPatternXYZ(currentPerspective.getElementsByTagName('to')[0]);

		console.log(this.viewsList[currentPerspective_id].toString());
	}
};

MySceneGraph.prototype.parseIllumination= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('illumination');
	if (elems == null) {
		return "illumination element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'illumination' element found.";
	}

	//Gets Element
	var illumination = elems[0];

	//Get attributes
	this.illumination.doublesided = this.reader.getBoolean(illumination, 'doublesided');
	this.illumination.local = this.reader.getBoolean(illumination, 'local');
	this.illumination.ambient = this.readPatternRGBA(illumination.children[0]);
	this.illumination.background = this.readPatternRGBA(illumination.children[1]);
	
	console.log(this.illumination.toString());

};

MySceneGraph.prototype.parseLights= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('lights');
	if (elems == null) {
		return "lights element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'lights' element found.";
	}

	//Gets all elements
	var omniLightsElems = elems[0].getElementsByTagName('omni');
	var spotLightsElems = elems[0].getElementsByTagName('spot');
	if (omniLightsElems.length + spotLightsElems.length == 0)
		return "no lights were found.";


	//for each Omni Light tag
	for (var i = 0; i < omniLightsElems.length; i++)
	{
		//Gets Element
		var currentLight = omniLightsElems[i];
		var currentLight_id = this.reader.getString(currentLight, 'id');
		
		//Verify the id
		if (this.omniLights[currentLight_id] != null)
		{ 	
			return "ID ERROR: light[" + currentLight_id + "] already exists";
		}
		
		this.omniLights[currentLight_id] = new OmniLight(currentLight_id);

		//Get attributes
		this.omniLights[currentLight_id].enabled = this.reader.getBoolean(currentLight, 'enabled');
		this.omniLights[currentLight_id].location = this.readPatternXYZW(currentLight.children[0]);
		this.omniLights[currentLight_id].ambient = this.readPatternRGBA(currentLight.children[1]);
		this.omniLights[currentLight_id].diffuse = this.readPatternRGBA(currentLight.children[2]);
		this.omniLights[currentLight_id].specular = this.readPatternRGBA(currentLight.children[3]);

		console.log(this.omniLights[currentLight_id].toString());
	}

	//for each Spot Light tag
	for (var i = 0; i < spotLightsElems.length; i++)
	{
		//Gets Element
		var currentLight = spotLightsElems[i];
		var currentLight_id = this.reader.getString(currentLight, 'id');
		
		//Verify the id
		if (this.omniLights[currentLight_id] != null || this.spotLights[currentLight_id] != null)
		{
			return "ID ERROR: light[" + currentLight_id + "] already exists";
		}

		this.spotLights[currentLight_id] = new SpotLight(currentLight_id);

		//Get attributes
		this.spotLights[currentLight_id].enabled = this.reader.getBoolean(currentLight, 'enabled');
		this.spotLights[currentLight_id].angle = this.reader.getFloat(currentLight, 'angle');
		this.spotLights[currentLight_id].angle = rtoa(this.spotLights[currentLight_id].angle);
		this.spotLights[currentLight_id].exponent = this.reader.getFloat(currentLight, 'exponent');

		this.spotLights[currentLight_id].target = this.readPatternXYZ(currentLight.children[0]);
		this.spotLights[currentLight_id].location = this.readPatternXYZ(currentLight.children[1]);
		this.spotLights[currentLight_id].ambient = this.readPatternRGBA(currentLight.children[2]);
		this.spotLights[currentLight_id].diffuse = this.readPatternRGBA(currentLight.children[3]);
		this.spotLights[currentLight_id].specular = this.readPatternRGBA(currentLight.children[4]);
		
		console.log(this.spotLights[currentLight_id].toString());
	}
};

MySceneGraph.prototype.parseTextures= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('textures');
	if (elems == null) {
		return "textures element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'textures' element found.";
	}

	//Gets all elements
	var texturesElems = elems[0].getElementsByTagName('texture');
	if (texturesElems.length == 0)
		return "no textures were found.";

	// For each texture tag
	for (var i = 0; i < texturesElems.length; i++)
	{		
		//Gets Element
		var currentTexture = texturesElems[i];
		var currentTexture_id = this.reader.getString(currentTexture, 'id');
		
		//Verify the id of the Texture
		if(this.textures[currentTexture_id] != null)
		{
			return "ID ERROR: texture[" + currentTexture_id + "] already exists";
		}
		
		this.textures[currentTexture_id] = new Texture(currentTexture_id);

		//Get attributes
		this.textures[currentTexture_id].file = this.reader.getString(currentTexture, 'file');
		this.textures[currentTexture_id].length_s = this.reader.getFloat(currentTexture, 'length_s');
		this.textures[currentTexture_id].length_t = this.reader.getFloat(currentTexture, 'length_t');
		
		console.log(this.textures[currentTexture_id].toString());
	}
};

MySceneGraph.prototype.parseMaterials= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('materials');
	elems = this.mainTagFiltering(elems);
	if (elems == null) {
		return "materials element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'materials' element found.";
	}

	//Gets all elements
	var materialsElems = elems[0].getElementsByTagName('material');
	if (materialsElems.length == 0)
		return "no materials were found.";

	// For each material tag
	for (var i = 0; i < materialsElems.length; i++)
	{		
		//Gets Element
		var currentMaterial = materialsElems[i];
		var currentMaterial_id = this.reader.getString(currentMaterial, 'id');
		
		//Verify the id of the material
		if(this.materials[currentMaterial_id] != null)
		{
			return "ID ERROR: materials[" + i + "] already exists";
		}
		
		this.materials[currentMaterial_id] = new Material(currentMaterial_id);

		//Get attributes
		this.materials[currentMaterial_id].emission = this.readPatternRGBA(currentMaterial.children[0]);
		this.materials[currentMaterial_id].ambient = this.readPatternRGBA(currentMaterial.children[1]);
		this.materials[currentMaterial_id].diffuse = this.readPatternRGBA(currentMaterial.children[2]);
		this.materials[currentMaterial_id].specular = this.readPatternRGBA(currentMaterial.children[3]);
		this.materials[currentMaterial_id].shininess = this.reader.getFloat(currentMaterial.children[4], 'value');
		
		console.log(this.materials[currentMaterial_id].toString());
	}
};

MySceneGraph.prototype.parseTransformations= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('transformations');
	if (elems == null) {
		return "transformations element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'transformations' element found.";
	}
	
	//Gets all elements
	var transformationsElems = elems[0].getElementsByTagName('transformation');
	if(transformationsElems.length == 0)
		return "no transformations were found.";

	//For each transformation tag
	for(var i = 0; i < transformationsElems.length; i++)
	{
		//Gets Element
		var currentTransformation = transformationsElems[i];
		var currentTransformation_id = this.reader.getString(currentTransformation, 'id');
		
		//Verify if id is valid
		if(this.transformations[currentTransformation_id] != null)
		{
			return "ID ERROR: transformations[" + currentTransformation_id + "] already exists";
		}

		//Creates data structure
		this.transformations[currentTransformation_id] = new Transformation(currentTransformation_id);
		this.transformations[currentTransformation_id].matrix = this.readTransformations(currentTransformation);
		
		console.log(this.transformations[currentTransformation_id].toString());
	}
}

MySceneGraph.prototype.parsePrimitives= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('primitives');
	if (elems == null) {
		return "primitives element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'primitives' element found.";
	}

	//Gets all elements
	var primitivesElems = elems[0].getElementsByTagName('primitive');
	if (primitivesElems.length == 0)
		return "no primitives were found.";

	// for each primitive tag
	for (var i = 0; i < primitivesElems.length; i++)
	{
		//Gets Element
		var currentPrimitive = primitivesElems[i];
		var currentPrimitive_id = this.reader.getString(currentPrimitive, 'id');

		//Verify if id is valid
		if(this.primitives[currentPrimitive_id] != null)
		{
			return "ID ERROR: primitives[" + currentPrimitive_id + "] already exists";
		}
		
		//Check number of primitives types
		var primitive_data = currentPrimitive.getElementsByTagName('*');
		if (primitive_data.length != 1)
		{
			return "ID ERROR: primitives[" + currentPrimitive_id + "] has none or more than one primitive types";
		}
		primitive_data = primitive_data[0];

		//Gets data
		switch (primitive_data.tagName){
		case "rectangle":
			this.primitives[currentPrimitive_id] = new Prim_Rectangle(currentPrimitive_id);
			this.primitives[currentPrimitive_id].x1 = this.reader.getFloat(primitive_data, 'x1');
			this.primitives[currentPrimitive_id].y1 = this.reader.getFloat(primitive_data, 'y1');
			this.primitives[currentPrimitive_id].x2 = this.reader.getFloat(primitive_data, 'x2');
			this.primitives[currentPrimitive_id].y2 = this.reader.getFloat(primitive_data, 'y2');
			break;
		case "triangle":
			this.primitives[currentPrimitive_id] = new Prim_Triangle(currentPrimitive_id);
			this.primitives[currentPrimitive_id].x1 = this.reader.getFloat(primitive_data, 'x1');
			this.primitives[currentPrimitive_id].y1 = this.reader.getFloat(primitive_data, 'y1');
			this.primitives[currentPrimitive_id].z1 = this.reader.getFloat(primitive_data, 'z1');
			this.primitives[currentPrimitive_id].x2 = this.reader.getFloat(primitive_data, 'x2');
			this.primitives[currentPrimitive_id].y2 = this.reader.getFloat(primitive_data, 'y2');
			this.primitives[currentPrimitive_id].z2 = this.reader.getFloat(primitive_data, 'z2');
			this.primitives[currentPrimitive_id].x3 = this.reader.getFloat(primitive_data, 'x3');
			this.primitives[currentPrimitive_id].y3 = this.reader.getFloat(primitive_data, 'y3');
			this.primitives[currentPrimitive_id].z3 = this.reader.getFloat(primitive_data, 'z3');
			break;		
		case "cylinder":
			this.primitives[currentPrimitive_id] = new Prim_Cylinder(currentPrimitive_id);
			this.primitives[currentPrimitive_id].base = this.reader.getFloat(primitive_data, 'base');
			this.primitives[currentPrimitive_id].top = this.reader.getFloat(primitive_data, 'top');
			this.primitives[currentPrimitive_id].height = this.reader.getFloat(primitive_data, 'height');
			this.primitives[currentPrimitive_id].slices = this.reader.getInteger(primitive_data, 'slices');
			this.primitives[currentPrimitive_id].stacks = this.reader.getInteger(primitive_data, 'stacks');
			break;	
		case "sphere":
			this.primitives[currentPrimitive_id] = new Prim_Sphere(currentPrimitive_id);
			this.primitives[currentPrimitive_id].radius = this.reader.getFloat(primitive_data, 'radius');
			this.primitives[currentPrimitive_id].slices = this.reader.getInteger(primitive_data, 'slices');
			this.primitives[currentPrimitive_id].stacks = this.reader.getInteger(primitive_data, 'stacks');
			break;	
		case "torus":
			this.primitives[currentPrimitive_id] = new Prim_Torus(currentPrimitive_id);
			this.primitives[currentPrimitive_id].inner = this.reader.getFloat(primitive_data, 'inner');
			this.primitives[currentPrimitive_id].outer = this.reader.getFloat(primitive_data, 'outer');
			this.primitives[currentPrimitive_id].slices = this.reader.getInteger(primitive_data, 'slices');
			this.primitives[currentPrimitive_id].loops = this.reader.getInteger(primitive_data, 'loops');
			break;
			//TODO PLANE AND PATCH
		default:
			return "invalid primitive type"
		}
		
		console.log(this.primitives[currentPrimitive_id].toString());		
	}
	
}

MySceneGraph.prototype.parseComponents= function(rootElement) {
	//Check for errors
	var elems =  rootElement.getElementsByTagName('components');
	if (elems == null) {
		return "components element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'components' element found.";
	}

	//Gets all elements
	var componentsElems = elems[0].getElementsByTagName('component');
	if (componentsElems.length == 0)
		return "no components were found.";

	//for each component tag
	for (var i = 0; i < componentsElems.length; i++)
	{		
		//Gets Element
		var currentComponent = componentsElems[i];
		var index = 1;
		var currentComponent_id = this.reader.getString(currentComponent, 'id');
		var currentComponentTransformation = currentComponent.children[0];
		var currentComponentAnimations = currentComponent.children[index];
		if(currentComponentAnimations.localName != "animation") //Because animation block is optional
			currentComponentAnimations = null;
		else
			index++;
		var currentComponentMaterials = currentComponent.children[index];
		var currentComponentTexture = currentComponent.children[index+1];
		var currentComponentChildren = currentComponent.children[index+2];

		//Verify if id is valid
		if(this.components[currentComponent_id] != null)
		{
			return "ID ERROR: components[" + i + "] already exists";
		}
		
		this.components[currentComponent_id] = new Component(currentComponent_id);
		

		//  ----   Parse the TRANSFORMATIONS  -----
		var transformationref = currentComponentTransformation.getElementsByTagName("transformationref");
	
		//If there's no reference to a transformation
		if(transformationref.length == 0)
		{
			//If there is no transformation
			if(currentComponentTransformation.children.length == 0)
				this.components[currentComponent_id].transformation_matrix = mat4.create();
			
			//If there are transformations
			else
				this.components[currentComponent_id].transformation_matrix = this.readTransformations(currentComponentTransformation);
		}
		//If reference to transformation was found
		else{
			transformationref =  this.reader.getString(transformationref[0], 'id');
			this.components[currentComponent_id].transformation_matrix = this.transformations[transformationref].matrix;
		}

		//  ----   Parse the ANIMATIONS  -----
		if(currentComponentAnimations != null)
		{
			var animationList = [];
			var currentComponentAnimationRefs = currentComponentAnimations.getElementsByTagName('animationref');
			for(var j = 0; j < currentComponentAnimationRefs.length; j++)
			{
				var currentAnimation_id = this.reader.getString(currentComponentAnimationRefs[j], 'id');
				var actualAnimation = this.animations[currentAnimation_id];
				if(actualAnimation == null)
					return "In component " + currentComponent_id + ", animation id " + j + " is invalid";

				animationList.push(actualAnimation);
			}
			var compoundAnimationParsed = new CompoundAnimationParsed(currentAnimation_id);
			compoundAnimationParsed.animations = animationList;
			this.components[currentComponent_id].animation =  compoundAnimationParsed.create();
		}
		
		//  ----   Parse the MATERIALS  -----
		var currentComponentMaterialsElements = currentComponentMaterials.getElementsByTagName('material');
		if(currentComponentMaterialsElements.length == 0)
			return "No material in component[" + currentComponent_id + "] missing";

		//for each material tag
		for(var j = 0; j < currentComponentMaterialsElements.length; j++)
		{
			var currentMaterial = currentComponentMaterialsElements[j];
			this.components[currentComponent_id].material_ids[j] = this.reader.getString(currentMaterial, 'id');
		}

		
		//  ----   Parse the TEXTURE  -----
		 var currentTexture = this.reader.getString(currentComponentTexture, 'id');
		 if(currentTexture == null)
		 	return "No texture in component[" + currentComponent_id + "] missing";

		 this.components[currentComponent_id].texture_id = currentTexture;

	
		//  ----   Parse the CHILDREN  -----
		 var currentComponentChildrenElements = currentComponentChildren.getElementsByTagName('*');
		 if (currentComponentChildrenElements.length == 0)
		 		return "No children in component[" + currentComponent_id + "] missing";

		 for(var j = 0; j < currentComponentChildrenElements.length; j++)
		 {
		 	var currentChild = currentComponentChildrenElements[j];
		 	switch(currentChild.tagName){
		 	case "componentref":
				this.components[currentComponent_id].component_refs.push(this.reader.getString(currentChild, 'id'));
				break;
			case "primitiveref":
				this.components[currentComponent_id].primitive_refs.push(this.reader.getString(currentChild, 'id'));
				break;
			default:
				return "Invalid tag in child[" + j + "]"; 
				break;
			}
		 }
	}

	//Check ids
	for (var i = 0; i < componentsElems.length; i++)
	{
		var currentComponent = componentsElems[i];
		var currentComponent_id = this.reader.getString(currentComponent, 'id');
		//Verify id's
		var existingError = this.idVerification(this.components[currentComponent_id]);
		if(existingError != null)
			return existingError;
		
		console.log(this.components[currentComponent_id]);
	}
	
	


};

MySceneGraph.prototype.parseAnimations= function(rootElement)
{
	//Check for errors
	var elems = rootElement.getElementsByTagName('animations');
	if (elems == null) {
		return "animations element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'animations' element found.";
	}
	
	//Gets all elements
	var animationElems = elems[0].getElementsByTagName('animation');

	//For each animation tag
	for(var i = 0; i < animationElems.length; i++)
	{
		//Gets Element
		var currentAnimation = animationElems[i];
		var currentAnimation_id = this.reader.getString(currentAnimation, 'id');
		var currentAnimation_span = this.reader.getFloat(currentAnimation, 'span');
		

		//Verify if id and span time are valid
		if(this.animations[currentAnimation_id] != null)
		{
			return "ID ERROR: animations[" + currentAnimation_id + "] already exists";
		}
		
		if(currentAnimation_span <= 0)
		{
			return "In animation " + currentAnimation_id + ", span time invalid.";
		}


		//Get type of animation
		var currentAnimation_type = this.reader.getString(currentAnimation, 'type');
		if(currentAnimation_type == "linear")
		{
			this.animations[currentAnimation_id] = new LinearAnimationParsed(currentAnimation_id);
			var controlPointsElems = currentAnimation.getElementsByTagName('controlpoint');

			if(controlPointsElems.length < 2) //In case there are less than 2 control points
			{
				return "not enough control points";
			}

			var controlPointBuffer = [0, 0, 0];
			for(var j = 0; j < controlPointsElems.length; j++)
			{
				if(controlPointsElems[j].attributes.length != 3)
				{
					return "In Animation " + currentAnimation_id + ", controlpoint " + j + " is invalid";
				}
				controlPointBuffer[0] = this.reader.getFloat(controlPointsElems[j], 'xx');
				controlPointBuffer[1] = this.reader.getFloat(controlPointsElems[j], 'yy');
				controlPointBuffer[2] = this.reader.getFloat(controlPointsElems[j], 'zz');
				this.animations[currentAnimation_id].controlPoints.push(controlPointBuffer);
			}

		}
		else if(currentAnimation_type == "circular")
		{
			//Create animation with it's id
			this.animations[currentAnimation_id] = new CircularAnimationParsed(currentAnimation_id);

			//Gets animation attributes
			var center = [];
			center[0] = this.reader.getFloat(currentAnimation, 'centerx');
			center[1] = this.reader.getFloat(currentAnimation, 'centery');
			center[2] = this.reader.getFloat(currentAnimation, 'centerz');
			this.animations[currentAnimation_id].center = center;

			this.animations[currentAnimation_id].radius = this.reader.getFloat(currentAnimation, 'radius');
			this.animations[currentAnimation_id].initialAngle = this.reader.getFloat(currentAnimation, 'startang');
			this.animations[currentAnimation_id].rotAngle = this.reader.getFloat(currentAnimation, 'rotang');
		}
		else //Type not existent
		{
			return "Animation type not existent";
		}

		//Set animation time
		this.animations[currentAnimation_id].time = currentAnimation_span;
		
		console.log(this.animations[currentAnimation_id].toString());
	}
}

rtoa = function(degree){
	return (degree*Math.PI)/180;
}

/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};

//TODO Verificar se as tags que sao obrigatorias existem

MySceneGraph.prototype.idVerification = function(component)
{
	var transformationError = this.transformationIdVerification(component);
	var materialsError = this.materialIdVerification(component);
	var textureError = this.textureIdVerification(component);
	var childrenError = this.childrenIdVerification(component);

	if(transformationError != null || materialsError != null || textureError != null || childrenError != null)
	{
		return transformationError + materialsError + textureError + childrenError;
	}
}

MySceneGraph.prototype.transformationIdVerification = function(component)
{
	var existingTranformation = this.transformations[component.transformation_id];
	if(existingTranformation == null && component.transformation_matrix.length == 0)
		return "Transformation ID " + component.transformation_id + " non existent ";
}

MySceneGraph.prototype.materialIdVerification = function(component)
{
	for(var i = 0; i < component.material_ids.length; i++)
	{
		var existingMaterial = this.materials[component.material_ids[i]];
	if(existingMaterial == null && component.material_ids[i] != "inherit" && component.material_ids[i] != "none")
		{
				return "Material ID " + component.material_ids[i] + " non existent ";
		}
	}
}

MySceneGraph.prototype.textureIdVerification = function(component)
{
	if (component.texture_id != "inherit" && component.texture_id != "none"){
		var existingTexture = this.textures[component.texture_id];
		if(existingTexture == null)
		{
			return "Texture ID " + component.texture_id + " non existent ";
		}
	}
}

MySceneGraph.prototype.childrenIdVerification = function(component)
{
	for(var i = 0; i < component.component_refs.length; i++)
	{
		var ref = component.component_refs[i];
		var existentComponent = this.components[component.component_refs[i]];
		if(existentComponent == null)
		{
			return "Component ID " + component.component_refs[i] + " non existent ";
		}
	}

	for(var i = 0; i < component.primitive_refs.length; i++)
	{
		var existentPrimitive = this.primitives[component.primitive_refs[i]];
		if(existentPrimitive == null)
		{
			return "Primitive ID " + component.primitive_refs[i] + " non existent ";
		}
	}
}

MySceneGraph.prototype.mainTagFiltering = function(tagList)
{
	var newList = [];
	for(var i = 0; i < tagList.length; i++)
	{
		if(tagList[i].parentElement.nodeName == 'dsx')
			newList.push(tagList[i]);
	}
	
	return newList;
}

MySceneGraph.prototype.display = function()
{
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();
	
	// Update all lights used
	this.updateLights();
	
}

MySceneGraph.prototype.readTransformations = function(componentTransformations)
{
	var matrix = mat4.create();

	var transformations = componentTransformations.getElementsByTagName("*");
		
	for(var j = 0; j < transformations.length; j++)
	{
		var transformation = transformations[j];
		var transformationType = transformation.tagName;
		
		switch (transformationType)	{		
		case "translate":
				var x = this.reader.getFloat(transformation, 'x');
				var y = this.reader.getFloat(transformation, 'y');
				var z = this.reader.getFloat(transformation, 'z');
				mat4.translate(matrix, matrix, [x, y, z]);
				break;

		case "scale":
				var x = this.reader.getFloat(transformation, 'x');
				var y = this.reader.getFloat(transformation, 'y');
				var z = this.reader.getFloat(transformation, 'z');
				mat4.scale(matrix, matrix, [x, y, z]);
				break;
		case "rotate":
				var axis = this.reader.getString(transformation, 'axis');
				var angle = rtoa(this.reader.getFloat(transformation, 'angle'));
				switch (axis){
					case "x":
						mat4.rotate(matrix,matrix,angle,[1,0,0]);
						break;
					case "y":
						mat4.rotate(matrix,matrix,angle,[0,1,0]);
						break;
					case "z":
						mat4.rotate(matrix,matrix,angle,[0,0,1]);
						break;
					default:
						return "Error: invalid axis";
				}
				break;
			default:
				return "Error: invalid transformation";
				break;
		}
	}
		
	//Puts the transformation matrix in the list
	return matrix;
}

MySceneGraph.prototype.findParentTexture = function(component)
{
	var texture;
	var actualComponent = component;
	do
	{
		texture = this.textures[actualComponent.texture_id];
		actualComponent = actualComponent

	}while(texture == "inherit");
}

MySceneGraph.prototype.readPatternXYZ = function(source){
	var dest = [];
	dest[0] = this.reader.getFloat(source, 'x');
	dest[1] = this.reader.getFloat(source, 'y');
	dest[2] = this.reader.getFloat(source, 'z');
	return dest;
}


MySceneGraph.prototype.readPatternXYZW = function(source){
	var dest = [];
	dest[0] = this.reader.getFloat(source, 'x');
	dest[1] = this.reader.getFloat(source, 'y');
	dest[2] = this.reader.getFloat(source, 'z');
	dest[3] = this.reader.getFloat(source, 'w');
	return dest;
}

MySceneGraph.prototype.readPatternRGBA = function(source){
	var dest = [];
	dest[0] = this.reader.getFloat(source, 'r');
	dest[1] = this.reader.getFloat(source, 'g');
	dest[2] = this.reader.getFloat(source, 'b');
	dest[3] = this.reader.getFloat(source, 'a');
	return dest;
}