
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

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
	console.log("ola");
	var errorPrimitives = this.parsePrimitives(rootElement);
	
	if (errorScene != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}

	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};

};


MySceneGraph.prototype.parseScene= function(rootElement) {

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

	// Creates Data Structure
	this.viewsList=[];

	// iterate over every element
	var nnodes=views.children.length;

	if (nnodes == 0)
		return "no views were found.";
	for (var i=0; i< nnodes; i++)
	{
		var perspective = views.children[i];
		var perspective_id = this.reader.getString(perspective, 'id');
		
		// Verify if the id already exists
		var existentView = this.viewsList[perspective_id];
		if (existentView != null)
		{
			
			//Returns error and doesnt read the remaining lights
			
			return "ID ERROR: view[" + i + "] already exists";
			
			
			// OR
			
			/*
			* Shows the error, ignores it, and processes de remaining lights
			
			console.log("light[" + i + "] already exists");
			continue;*/
		}
		
		// process each perspective and store its information
		this.viewsList[perspective_id] = new MyView(perspective_id);
		this.viewsList[perspective_id].near = this.reader.getFloat(perspective, 'near');
		this.viewsList[perspective_id].far = this.reader.getFloat(perspective, 'far');
		this.viewsList[perspective_id].angle = this.reader.getFloat(perspective, 'angle');

		//Reads "from" data
		var perspective_from = perspective.children[0];
		this.viewsList[perspective_id].fromX = this.reader.getFloat(perspective_from, 'x');
		this.viewsList[perspective_id].fromY = this.reader.getFloat(perspective_from, 'y');
		this.viewsList[perspective_id].fromZ = this.reader.getFloat(perspective_from, 'z');

		//Reads "to" data
		var perspective_to = perspective.children[1];
		this.viewsList[perspective_id].toX = this.reader.getFloat(perspective_to, 'x');
		this.viewsList[perspective_id].toY = this.reader.getFloat(perspective_to, 'y');
		this.viewsList[perspective_id].toZ = this.reader.getFloat(perspective_to, 'z');

		//this.viewsList[perspective_id].loaded = true;

		//console.log("Read views item id "+ perspective_id +" with near value " + this.viewsList[perspective_id].near );
		console.log(this.viewsList[perspective_id].toString());
	};

	//Checks if all
	for (var i in this.viewsList){
		if (!i.loaded)
			return "error";
	}

};

MySceneGraph.prototype.parseIllumination= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('illumination');
	if (elems == null) {
		return "illumination element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'illumination' element found.";
	}

	// Create Illumination Data Structure
	var illumination = elems[0];
	this.illumination = new Illumination();

	this.illumination.doublesided = this.reader.getBoolean(illumination, 'doublesided');
	this.illumination.local = this.reader.getBoolean(illumination, 'local');

	var ambient =  illumination.children[0];
	this.illumination.ambient[0] = this.reader.getFloat(ambient, 'r');
	this.illumination.ambient[1] = this.reader.getFloat(ambient, 'g');
	this.illumination.ambient[2] = this.reader.getFloat(ambient, 'b');
	this.illumination.ambient[3] = this.reader.getFloat(ambient, 'a');

	var background =  illumination.children[1];
	this.illumination.background[0] = this.reader.getFloat(background, 'r');
	this.illumination.background[1] = this.reader.getFloat(background, 'g');
	this.illumination.background[2] = this.reader.getFloat(background, 'b');
	this.illumination.background[3] = this.reader.getFloat(background, 'a');


	console.log(this.illumination.toString());

};

MySceneGraph.prototype.parseLights= function(rootElement) {
	var elems =  rootElement.getElementsByTagName('lights');
	if (elems == null) {
		return "lights element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'lights' element found.";
	}

	// Create LightsData Structure
	var lights = elems[0];

	var omniLights = lights.getElementsByTagName('omni');
	this.omniLights = [];
	var spotLights = lights.getElementsByTagName('spot');
	this.spotLights = [];

	// iterate over every element
	var nOmniLights = omniLights.length;
	//var nSpotLights = spotLights.children.length;
	var nSpotLights = spotLights.length;
	
	if (nOmniLights + nSpotLights == 0)
		return "no lights were found.";


	//Omni Lights
	for (var i=0; i< nOmniLights; i++)
	{
		
		/*
		 * FALTA VERIFICAR IDS IGUAIS
		 * IMPORTANTE
		 * TO DO
		 
		 * EDIT1: FEITO MAIS ABAIXO
		 * ATENCAO QUE REPETE NO SPOTLIGHT
		 * QUALQUER ALTERACAO TEM DE SER FEITA LA TAMBEM
		 */
		
		//Initiate Light
		var currentLight = omniLights[i];
		var currentLight_id = this.reader.getString(currentLight, 'id');
		
		var existentLight = this.omniLights[currentLight_id];
		if (existentLight != null)
		{ 
			// Returns error and doesnt read the remaining lights
			
			return "ID ERROR: light[" + i + "] already exists";
			
			// OR
			
			/*
			* Shows the error, ignores it, and processes de remaining lights
			
			console.log("light[" + i + "] already exists");
			continue;*/
		}
		
		this.omniLights[currentLight_id] = new OmniLight(currentLight_id);

		//Get attributes
		this.omniLights[currentLight_id].enabled = this.reader.getBoolean(currentLight, 'enabled');

		var location = currentLight.children[0];
		this.omniLights[currentLight_id].location[0] = this.reader.getFloat(location, 'x');
		this.omniLights[currentLight_id].location[1] = this.reader.getFloat(location, 'y');
		this.omniLights[currentLight_id].location[2] = this.reader.getFloat(location, 'z');
		this.omniLights[currentLight_id].location[3] = this.reader.getFloat(location, 'w');

		var ambient = currentLight.children[1];
		this.omniLights[currentLight_id].ambient[0] = this.reader.getFloat(ambient, 'r');
		this.omniLights[currentLight_id].ambient[1] = this.reader.getFloat(ambient, 'g');
		this.omniLights[currentLight_id].ambient[2] = this.reader.getFloat(ambient, 'b');
		this.omniLights[currentLight_id].ambient[3] = this.reader.getFloat(ambient, 'a');

		var diffuse = currentLight.children[2];
		this.omniLights[currentLight_id].diffuse[0] = this.reader.getFloat(diffuse, 'r');
		this.omniLights[currentLight_id].diffuse[1] = this.reader.getFloat(diffuse, 'g');
		this.omniLights[currentLight_id].diffuse[2] = this.reader.getFloat(diffuse, 'b');
		this.omniLights[currentLight_id].diffuse[3] = this.reader.getFloat(diffuse, 'a');

		var specular = currentLight.children[3];
		this.omniLights[currentLight_id].specular[0] = this.reader.getFloat(specular, 'r');
		this.omniLights[currentLight_id].specular[1] = this.reader.getFloat(specular, 'g');
		this.omniLights[currentLight_id].specular[2] = this.reader.getFloat(specular, 'b');
		this.omniLights[currentLight_id].specular[3] = this.reader.getFloat(specular, 'a');

		this.omniLights[currentLight_id].loaded = true;
		
		console.log(this.omniLights[currentLight_id].toString());
	}

	//Spot Lights
	for (var i=0; i< nSpotLights; i++)
	{
		//Initiate Light
		var currentLight = spotLights[i];
		var currentLight_id = this.reader.getString(currentLight, 'id');
		
		var existentLight = this.omniLights[currentLight_id];
		if(existentLight != null)
		{
			return "ID ERROR: light[" + i + "] already exists";
		}

		this.spotLights[currentLight_id] = new SpotLight(currentLight_id);

		//Get attributes
		this.spotLights[currentLight_id].enabled = this.reader.getBoolean(currentLight, 'enabled');
		this.spotLights[currentLight_id].angle = this.reader.getFloat(currentLight, 'angle');
		this.spotLights[currentLight_id].exponent = this.reader.getFloat(currentLight, 'exponent');

		var target = currentLight.children[0];
		this.spotLights[currentLight_id].target[0] = this.reader.getFloat(target, 'x');
		this.spotLights[currentLight_id].target[1] = this.reader.getFloat(target, 'y');
		this.spotLights[currentLight_id].target[2] = this.reader.getFloat(target, 'z');

		var location = currentLight.children[1];
		this.spotLights[currentLight_id].location[0] = this.reader.getFloat(location, 'x');
		this.spotLights[currentLight_id].location[1] = this.reader.getFloat(location, 'y');
		this.spotLights[currentLight_id].location[2] = this.reader.getFloat(location, 'z');

		var ambient = currentLight.children[2];
		this.spotLights[currentLight_id].ambient[0] = this.reader.getFloat(ambient, 'r');
		this.spotLights[currentLight_id].ambient[1] = this.reader.getFloat(ambient, 'g');
		this.spotLights[currentLight_id].ambient[2] = this.reader.getFloat(ambient, 'b');
		this.spotLights[currentLight_id].ambient[3] = this.reader.getFloat(ambient, 'a');

		var diffuse = currentLight.children[3];
		this.spotLights[currentLight_id].diffuse[0] = this.reader.getFloat(diffuse, 'r');
		this.spotLights[currentLight_id].diffuse[1] = this.reader.getFloat(diffuse, 'g');
		this.spotLights[currentLight_id].diffuse[2] = this.reader.getFloat(diffuse, 'b');
		this.spotLights[currentLight_id].diffuse[3] = this.reader.getFloat(diffuse, 'a');

		var specular = currentLight.children[4];
		this.spotLights[currentLight_id].specular[0] = this.reader.getFloat(specular, 'r');
		this.spotLights[currentLight_id].specular[1] = this.reader.getFloat(specular, 'g');
		this.spotLights[currentLight_id].specular[2] = this.reader.getFloat(specular, 'b');
		this.spotLights[currentLight_id].specular[3] = this.reader.getFloat(specular, 'a');

		this.spotLights[currentLight_id].loaded = true;
		
		console.log(this.spotLights[currentLight_id].toString());
	}

};

MySceneGraph.prototype.parseTextures= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('textures');
	if (elems == null) {
		return "textures element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'textures' element found.";
	}

	// Create Textures Data Structure
	var textures = elems[0].getElementsByTagName('texture');
	this.textures = [];
	
	// iterate over every element
	var nTextures = textures.length;

	if (nTextures == 0)
		return "no textures were found.";

	//Textures
	for (var i=0; i < nTextures; i++)
	{
		/*
		 * FALTA VERIFICAR IDS IGUAIS
		 * IMPORTANTE
		 * TO DO
		 */
		
		//Initiate Texture
		var currentTexture = textures[i];
		var currentTexture_id = this.reader.getString(currentTexture, 'id');
		
		//Verify the id of the Texture
		var existentTexture = this.textures[currentTexture_id];
		if(existentTexture != null)
		{
			return "ID ERROR: texture[" + i + "] already exists";
		}
		
		this.textures[currentTexture_id] = new Texture(currentTexture_id);

		//Get attributes
		this.textures[currentTexture_id].file = this.reader.getString(currentTexture, 'file');
		this.textures[currentTexture_id].length_s = this.reader.getFloat(currentTexture, 'length_s');
		this.textures[currentTexture_id].length_t = this.reader.getFloat(currentTexture, 'length_t');

		this.textures[currentTexture_id].loaded = true;
		
		console.log(this.textures[currentTexture_id].toString());
	}



};

MySceneGraph.prototype.parseMaterials= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('materials');
	if (elems == null) {
		return "materials element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'materials' element found.";
	}

	// Create Materials Data Structure
	var materials = elems[0].getElementsByTagName('material');
	this.materials = [];
	
	// iterate over every element
	var nMaterials = materials.length;

	if (nMaterials == 0)
		return "no materials were found.";

	//Materials
	for (var i=0; i < nMaterials; i++)
	{
		/*
		 * FALTA VERIFICAR IDS IGUAIS
		 * IMPORTANTE
		 * TO DO
		 */
		
		//Initiate Materials
		var currentMaterial = materials[i];
		var currentMaterial_id = this.reader.getString(currentMaterial, 'id');
		
		var existentMaterial = this.materials[currentMaterial_id];
		if(existentMaterial != null)
		{
			return "ID ERROR: materials[" + i + "] already exists";
		}
		
		this.materials[currentMaterial_id] = new Material(currentMaterial_id);

		//Get attributes
		var emission = currentMaterial.children[0];
		this.materials[currentMaterial_id].emission[0] = this.reader.getFloat(emission, 'r');
		this.materials[currentMaterial_id].emission[1] = this.reader.getFloat(emission, 'g');
		this.materials[currentMaterial_id].emission[2] = this.reader.getFloat(emission, 'b');
		this.materials[currentMaterial_id].emission[3] = this.reader.getFloat(emission, 'a');

		var ambient = currentMaterial.children[1];
		this.materials[currentMaterial_id].ambient[0] = this.reader.getFloat(ambient, 'r');
		this.materials[currentMaterial_id].ambient[1] = this.reader.getFloat(ambient, 'g');
		this.materials[currentMaterial_id].ambient[2] = this.reader.getFloat(ambient, 'b');
		this.materials[currentMaterial_id].ambient[3] = this.reader.getFloat(ambient, 'a');

		var diffuse = currentMaterial.children[2];
		this.materials[currentMaterial_id].diffuse[0] = this.reader.getFloat(diffuse, 'r');
		this.materials[currentMaterial_id].diffuse[1] = this.reader.getFloat(diffuse, 'g');
		this.materials[currentMaterial_id].diffuse[2] = this.reader.getFloat(diffuse, 'b');
		this.materials[currentMaterial_id].diffuse[3] = this.reader.getFloat(diffuse, 'a');

		var specular = currentMaterial.children[3];
		this.materials[currentMaterial_id].specular[0] = this.reader.getFloat(specular, 'r');
		this.materials[currentMaterial_id].specular[1] = this.reader.getFloat(specular, 'g');
		this.materials[currentMaterial_id].specular[2] = this.reader.getFloat(specular, 'b');
		this.materials[currentMaterial_id].specular[3] = this.reader.getFloat(specular, 'a');
		
		var shininess = currentMaterial.children[4];
		this.materials[currentMaterial_id].shininess = this.reader.getFloat(shininess, 'value');

		this.materials[currentMaterial_id].loaded = true;
		
		console.log(this.materials[currentMaterial_id].toString());
	}



};

MySceneGraph.prototype.parseTransformations= function(rootElement) {
	console.log("Ola 2");
	var elems =  rootElement.getElementsByTagName('transformations');
	if (elems == null) {
		return "transformations element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'transformations' element found.";
	}
	console.log("Ola 3");
	var transformations = elems[0].getElementsByTagName('transformation');
	this.transformations = [];
	console.log(transformations);
	var nTransformations = transformations.length;
	console.log("nTransformations = " + nTransformations);
	if(nTransformations == 0)
		return "no transformations were found.";
	
	for(var i = 0; i < nTransformations; i++)
	{
		console.log("This is the transformation " + i);
		var currentTransformation = transformations[i];
		var currentTransformation_id = this.reader.getString(currentTransformation, 'id');
		
		//Verify if id is valid
		var existentTransformation = this.transformations[currentTransformation_id];
		console.log("Existent Transformation [" + i + "] :" + existentTransformation);
		if(existentTransformation != null)
		{
			console.log("DETECTED COPY");
			return "ID ERROR: transformations[" + i + "] already exists";
		}
		
		var currentTransformationElements = currentTransformation.getElementsByTagName('*');
		console.log(currentTransformation);
		this.scene.loadIdentity();
		
		var transformationLength = currentTransformationElements.length;
		console.log(transformationLength);
		for(var j = 0; j < transformationLength; j++)
		{
			var transformationType = currentTransformationElements[j].tagName;
			var matrix = [];
			console.log("Transformation type : " + transformationType);
			
			if(transformationType == "translate")
			{
				var x = this.reader.getFloat(currentTransformationElements[j], 'x');
				var y = this.reader.getFloat(currentTransformationElements[j], 'y');
				var z = this.reader.getFloat(currentTransformationElements[j], 'z');
				/*matrix = this.buildMatrixTranslation(x, y, z);*/
				console.log(x);
				console.log(y);
				console.log(z);
				this.scene.translate(x, y, z);
			}
			else if(transformationType == "scale")
			{
				var x = this.reader.getFloat(currentTransformationElements[j], 'x');
				var y = this.reader.getFloat(currentTransformationElements[j], 'y');
				var z = this.reader.getFloat(currentTransformationElements[j], 'z');
				/*matrix = this.buildMatrixScaling(x, y, z);*/
				this.scene.scale(x, y, z);
				console.log(this.scene.getMatrix());
			}
			else if(transformationType == "rotate")
			{
				var axis = this.reader.getString(currentTransformationElements[j], 'axis');
				var angle = this.reader.getFloat(currentTransformationElements[j], 'angle');
				/*matrix = this.buildMatrixRotation(axis, angle);*/
				if(axis == 'x')
				{
					this.scene.rotate(rtoa(angle), 1, 0, 0);
				}
				else if(axis == 'y')
				{
					this.scene.rotate(rtoa(angle), 0, 1, 0);
				}
				else if(axis == 'z')
				{
					this.scene.rotate(rtoa(angle), 0,0, 1);
				}
				else
				{
					return "Error: invalid axis";
				}
			}
			else
			{
				return "Error: invalid transformation";
			}
			
			//multMatrix(matrix);
		}
		
		//Puts the transformation matrix in the list
		this.transformations[currentTransformation_id] = new Transformation(currentTransformation_id);
		this.transformations[currentTransformation_id].matrix = this.scene.getMatrix();
		
		console.log(this.scene.getMatrix());
		console.log(this.transformations[i]);
	/*
		//Cleans the transformation matrix
		this.scene.popMatrix();*/
	}

	console.log(this.transformations);
}

MySceneGraph.prototype.parsePrimitives= function(rootElement) {
	
	var elems =  rootElement.getElementsByTagName('primitives');
	if (elems == null) {
		return "primitives element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'primitives' element found.";
	}

	// Create Primitive Data Structure
	var primitives = elems[0].getElementsByTagName('primitive');
	/*
	this.rectangles = [];
	this.triangles = [];
	this.cylinders = [];
	this.spheres = [];
	this.thoruses = [];
	*/
	this.primitives = [];
	// iterate over every element
	var nPrimitives = primitives.length;

	if (nPrimitives == 0)
		return "no primitives were found.";

	//Primitives
	for (var i=0; i < nPrimitives; i++)
	{
		/*
		 * FALTA VERIFICAR IDS IGUAIS
		 * IMPORTANTE
		 * TO DO
		 */
		
		//Initiate Primitive
		var currentPrimitive = primitives[i];
		var currentPrimitive_id = this.reader.getString(currentPrimitive, 'id');
		
		var existingPrimitive = this.primitives[currentPrimitive_id];
		if(existingPrimitive != null)
		{
			return "ID ERROR: primitives[" + i + "] already exists";
		}
		
		/*
		* ------------------------------------------------------
		* TODO
		* Da para ter objetos de diferentes tipos na mesma lista?
		* Seria necessario, porque temos 5 tipos de primitivas diferentes
		* ------------------------------------------------------
		*/	
		

		//Get attributes
		//There should only be 1 primitive type
		/*
		*----------------------------------------------------------
		* Nao sei se sera a maneira mais eficiente de fazer isto
		* Leio so a primeira tag, e ignoro as restantes
		*----------------------------------------------------------
		*/
		var primitive_param = currentPrimitive.getElementsByTagName('rectangle');
		if(primitive_param.length > 0)
		{
			var primitive_type = currentPrimitive.children[0];
			this.primitives[currentPrimitive_id] = new Prim_Rectangle(currentPrimitive_id);
			this.primitives[currentPrimitive_id].x1 = this.reader.getFloat(primitive_type, 'x1');
			this.primitives[currentPrimitive_id].y1 = this.reader.getFloat(primitive_type, 'y1');
			this.primitives[currentPrimitive_id].x2 = this.reader.getFloat(primitive_type, 'x2');
			this.primitives[currentPrimitive_id].y2 = this.reader.getFloat(primitive_type, 'y2');
			console.log(this.primitives[currentPrimitive_id].toString());
			continue;
		}
		
		console.log("primitives[" + i + "]: no rectangle tag found");
		primitive_param = currentPrimitive.getElementsByTagName('triangle');
		if(primitive_param.length > 0)
		{
			var primitive_type = currentPrimitive.children[0];
			this.primitives[currentPrimitive_id] = new Prim_Triangle(currentPrimitive_id);
			this.primitives[currentPrimitive_id].x1 = this.reader.getFloat(primitive_type, 'x1');
			this.primitives[currentPrimitive_id].y1 = this.reader.getFloat(primitive_type, 'y1');
			this.primitives[currentPrimitive_id].z1 = this.reader.getFloat(primitive_type, 'z1');
			this.primitives[currentPrimitive_id].x2 = this.reader.getFloat(primitive_type, 'x2');
			this.primitives[currentPrimitive_id].y2 = this.reader.getFloat(primitive_type, 'y2');
			this.primitives[currentPrimitive_id].z2 = this.reader.getFloat(primitive_type, 'z2');
			this.primitives[currentPrimitive_id].x3 = this.reader.getFloat(primitive_type, 'x3');
			this.primitives[currentPrimitive_id].y3 = this.reader.getFloat(primitive_type, 'y3');
			this.primitives[currentPrimitive_id].z3 = this.reader.getFloat(primitive_type, 'z3');
			console.log(this.primitives[currentPrimitive_id].toString());
			continue;
		}
		
		console.log("primitives[" + i + "]: no triangle tag found");
		primitive_param = currentPrimitive.getElementsByTagName('cylinder');
		if(primitive_param.length > 0)
		{
			var primitive_type = currentPrimitive.children[0];
			this.primitives[currentPrimitive_id] = new Prim_Cylinder(currentPrimitive_id);
			this.primitives[currentPrimitive_id].base = this.reader.getFloat(primitive_type, 'base');
			this.primitives[currentPrimitive_id].top = this.reader.getFloat(primitive_type, 'top');
			this.primitives[currentPrimitive_id].height = this.reader.getFloat(primitive_type, 'height');
			this.primitives[currentPrimitive_id].slices = this.reader.getInteger(primitive_type, 'slices');
			this.primitives[currentPrimitive_id].stacks = this.reader.getInteger(primitive_type, 'stacks');
			console.log(this.primitives[currentPrimitive_id].toString());
			continue;
		}
		
		console.log("primitives[" + i + "]: no cylinder tag found");
		primitive_param = currentPrimitive.getElementsByTagName('sphere');
		if(primitive_param.length > 0)
		{
			var primitive_type = currentPrimitive.children[0];
			this.primitives[currentPrimitive_id] = new Prim_Sphere(currentPrimitive_id);
			this.primitives[currentPrimitive_id].radius = this.reader.getFloat(primitive_type, 'radius');
			this.primitives[currentPrimitive_id].slices = this.reader.getInteger(primitive_type, 'slices');
			this.primitives[currentPrimitive_id].stacks = this.reader.getInteger(primitive_type, 'stacks');
			console.log(this.primitives[currentPrimitive_id].toString());
			continue;
		}
		
		console.log("primitives[" + i + "]: no sphere tag found");
		primitive_param = currentPrimitive.getElementsByTagName('thorus');
		if(primitive_param.length > 0)
		{
			var primitive_type = currentPrimitive.children[0];
			this.primitives[currentPrimitive_id] = new Prim_Thorus(currentPrimitive_id);
			this.primitives[currentPrimitive_id].inner = this.reader.getFloat(primitive_type, 'inner');
			this.primitives[currentPrimitive_id].outer = this.reader.getFloat(primitive_type, 'outer');
			this.primitives[currentPrimitive_id].slices = this.reader.getInteger(primitive_type, 'slices');
			this.primitives[currentPrimitive_id].stacks = this.reader.getInteger(primitive_type, 'stacks');
			console.log(this.primitives[currentPrimitive_id].toString());
			continue;
		}
		
		console.log("primitives[" + i + "]: no thorus tag found");
		
		console.log("primitives[" + i + "]: no primitive type found");
	}
	
}

MySceneGraph.prototype.parseComponents= function(rootElement) {

	var elems =  rootElement.getElementsByTagName('components');
	if (elems == null) {
		return "components element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'components' element found.";
	}

	// Create Materials Data Structure
	var components = elems[0].getElementsByTagName('component');
	this.components = [];
	
	// iterate over every element
	var nComponents = components.length;

	if (nComponents == 0)
		return "no components were found.";

	//Components
	for (var i=0; i < nComponents; i++)
	{
		/*
		 * FALTA VERIFICAR IDS IGUAIS
		 * IMPORTANTE
		 * TO DO
		 */
		
		//Initiate Materials
		var currentComponent = components[i];
		var currentComponent_id = this.reader.getString(currentComponent, 'id');
		var currentComponentTransformation = currentComponent.children[0];
		var currentComponentMaterials = currentComponent.children[1];
		var currentComponentTexture = currentComponent.children[2];
		var currentComponentChildren = currentComponent.children[3];

		var existentComponent = this.materials[currentComponent_id];
		if(existentComponent != null)
		{
			return "ID ERROR: components[" + i + "] already exists";
		}
		
		this.components[currentComponent_id] = new Component(currentComponent_id);
		
	//Parse the transformations

		var transformationref = this.reader.getString(currentComponentTransformation.children[0], 'id');
		this.components[currentComponent_id].transformation_id = transformationref;
		//If there's no reference to a transformation
		if(transformationref == null)
		{
			this.components[currentComponent_id].transformation_matrix = readTransformations(currentComponentTransformation);
		}
		

	//Parse the material
		var currentComponentMaterialsElements = currentComponentMaterials.getElementsByTagName('*');
		var materialsElementsLength = currentComponentMaterialsElements.length;

		if(materialsElementsLength == 0)
			return "Component material in component[" + currentComponent_id + "] missing";

		for(var j = 0; j < materialsElementsLength; j++)
		{
			var currentMaterial = currentComponentMaterialsElements[j];
			this.components[currentComponent_id].material_ids[j] = this.reader.getString(currentMaterial, 'id');
		}

		
	//Parse the texture
		 var currentTexture = this.reader.getString(currentComponentTexture, 'id');
		 if(currentTexture == null)
		 	return "Component texture in component[" + currentComponent_id + "] missing";

		 this.components[currentComponent_id].texture_id = currentTexture;

	
	//Parse the children
		 var currentComponentChildrenElements = currentComponentChildren.getElementsByTagName('*');
		 var childrenLength = currentComponentChildrenElements.length;
		 for(var j = 0; j < childrenLength; i++)
		 {
		 	var currentChild = currentComponentChildrenElements[j];
			if(currentChild.tagName == "componentref")
			{
				this.components[currentComponent_id].component_refs.push(this.reader.getString(currentChild, 'id'));
			}
			else if(currentChild.tagName == "primitiveref")
			{
				this.components[currentComponent_id].primitive_refs.push(this.reader.getString(currentChild, 'id'));
			}
			else
			{
				return "Invalid tag in child[" + j + "]"; 
			}
		 }

	//Verify id's


	}



};

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
	//TODO resto dos erros
}

MySceneGraph.prototype.transformationIdVerification = function(component)
{
	var existingTranformation = this.transformations[component.transformation_id];
	if(existingTranformation == null)
		return "Transformation ID " + component.transformation_id + " non existent";
}