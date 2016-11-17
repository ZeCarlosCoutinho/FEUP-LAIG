/**
 * MyComponent
 * @constructor
 */
function MyComponent(scene, transformation_matrix, animation, material_ids, texture_id, component_refs, primitive_refs) {
 	CGFobject.call(this,scene);
	
// Matrix of transformations applied to the component
	this.transformation_matrix = transformation_matrix;
	this.animation = animation;

// Saves a list of Materials of the component
// All Materials are applied later, when the object is drawn on screen
	this.materials = [];
	for(var i = 0; i <  material_ids.length; i++){
		var key =  material_ids[i];
		if (key == "inherit") 			// Inherited materials are attributed later, only stores the string
			this.materials[i] = "inherit";
		else if (key == "none") 		// None material is the scene's default material
			this.materials[i] = this.scene.defaultAppearance;
		else
			this.materials[i] = this.scene.materials[key];
	}
	
// The first material applied is the first one on the list
	this.currentMaterial = this.materials[0];

// Saves the textures of the component
	this.texture;
	if (texture_id == "inherit")
		this.texture = "inherit";
	else if (texture_id == "none")
		this.texture = null;
	else
		this.texture = this.scene.textures[texture_id];

//Saves the references to the components/primitives which form this component
	this.components = [];
	for(var i = 0; i <  component_refs.length; i++){
		var key =  component_refs[i];
		this.components.push(getComponent(this.scene, key)); //Component.js
	}
	for(var i = 0; i <  primitive_refs.length; i++){
		var key =  primitive_refs[i];
		this.components.push(this.scene.primitives[key]); //Component.js
	}
};

MyComponent.prototype = Object.create(CGFobject.prototype);
MyComponent.prototype.constructor = MyComponent;

// Changes the material applied to the component, according to the index chosen
MyComponent.prototype.updateMaterial = function (currentMaterialIndex){
	this.currentMaterial = this.materials[currentMaterialIndex % this.materials.length];
	for(var component of this.components)
		if(component instanceof MyComponent)
			component.updateMaterial(currentMaterialIndex);
}

MyComponent.prototype.updateAnimation = function (currTime){
	if (this.animation != null)
		this.animation.updateMatrix(currTime);
	for(var component of this.components)
		if(component instanceof MyComponent)
			component.updateAnimation(currTime);
}

MyComponent.prototype.display = function (material, texture) {
	var drawingMaterial = this.currentMaterial;
	if (this.currentMaterial == "inherit")
		drawingMaterial = material;		
	if (this.texture == "inherit")
		this.texture = texture; 
	

	this.scene.pushMatrix();
		this.scene.multMatrix(this.transformation_matrix);
		if (this.animation != null)
			this.scene.multMatrix(this.animation.matrix);
		for(var component of this.components){
			if(component instanceof MyComponent)
				component.display(drawingMaterial, this.texture); //Recursively, calls the display for each of the child components
			else{
				//Sets texture
				if (this.texture != null){
					drawingMaterial.setTexture(this.texture.text);
					//Length ST
					if (component.setTextureCoords != null)
						component.setTextureCoords(this.texture.lengthS, this.texture.lengthT);
				}
				else 
					drawingMaterial.setTexture(null);

				//Apply Material
				drawingMaterial.apply();

				//Display
				component.display();

				//Resets texture
				drawingMaterial.setTexture(null);
			}
		}
	this.scene.popMatrix();

 };
