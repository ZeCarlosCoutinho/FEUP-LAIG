/**
 * MyComponent
 * @constructor
 */
function MyComponent(scene, transformation_matrix, material_ids, texture_id, component_refs, primitive_refs) {
 	CGFobject.call(this,scene);
	
	this.transformation_matrix = transformation_matrix;
	
	this.materials = [];
	for(var i = 0; i <  material_ids.length; i++){
		var key =  material_ids[i];
		if (key == "inherit")
			this.materials[i] = "inherit";
		else if (key == "none")
			this.materials[i] = this.scene.defaultAppearance;
		else
			this.materials[i] = this.scene.materials[key];
	}
	this.currentMaterial = this.materials[0];

	this.texture;
	if (texture_id == "inherit")
		this.texture = "inherit";
	else if (texture_id == "none")
		this.texture = null;
	else
		this.texture = this.scene.textures[texture_id];

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

MyComponent.prototype.updateMaterial = function (currentMaterialIndex){
	this.currentMaterial = this.materials[currentMaterialIndex % this.materials.length];
	for(var component of this.components)
		if(component instanceof MyComponent)
			component.updateMaterial(currentMaterialIndex)
}

MyComponent.prototype.display = function (material, texture) {
	var drawingMaterial = this.currentMaterial;
	if (this.currentMaterial == "inherit")
		drawingMaterial = material;		
	if (this.texture == "inherit")
		this.texture = texture; 
	

	this.scene.pushMatrix();
		this.scene.multMatrix(this.transformation_matrix);
		for(var component of this.components){
			if(component instanceof MyComponent)
				component.display(drawingMaterial, this.texture);
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
