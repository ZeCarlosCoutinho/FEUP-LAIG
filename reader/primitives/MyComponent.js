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

MyComponent.prototype.updateMaterial = function (currentMaterialIndex, fatherMaterial){
	this.currentMaterial = this.materials[currentMaterialIndex % this.materials.length];
	if (this.currentMaterial == "inherit")
		this.currentMaterial = fatherMaterial;
	
	for(var component of this.components)
		if(component instanceof MyComponent)
			component.updateMaterial(currentMaterialIndex, this.currentMaterial)
}

MyComponent.prototype.updateTexture = function (fatherTexture){
	if (this.texture == "inherit")
		this.texture = fatherTexture;
	for(var component of this.components)
		if(component instanceof MyComponent)
			component.updateTexture(this.texture)
}

MyComponent.prototype.display = function () {
	if (this.texture != null)
		this.currentMaterial.setTexture(this.texture);
	this.currentMaterial.apply();
	this.scene.pushMatrix();
		this.scene.multMatrix(this.transformation_matrix);
		for(var component of this.components){
			component.display();
		}
	this.scene.popMatrix();
	this.currentMaterial.setTexture(null);
 };
