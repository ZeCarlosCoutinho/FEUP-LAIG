/**
 * Component
 * @constructor
 */
function Component(id) {
	this.id = id;
	
	this.transformation_id;
	this.transformation_matrix = [];
	this.animation;
	
	this.material_ids = [];
	
	this.texture_id;
	
	this.component_refs = [];
	this.primitive_refs = [];

	this.componentObject = null;
}

Component.prototype.toString=function(){
	return "Component Item " + this.id + "\n"
	+ "Transformation id: " + this.transformation_id + "\n"
	+ "Matrix: " + this.transformation_matrix + "\n"
	+ "Animation : " + this.animation + "\n"
	+ "Materials: " + this.material_ids + "\n"
	+ "Texture: " + this.texture_id + "\n"
	+ "ComponentRefs: " + this.component_refs + "\n"
	+ "PrimitiveRefs: " + this.primitive_refs;
}

/**
 * Creates a new MyComponent object
 * @return {MyComponent}
 */
Component.prototype.create = function(scene) {
	this.componentObject = new MyComponent(scene, this.transformation_matrix, this.animation, this.material_ids, this.texture_id, this.component_refs, this.primitive_refs);
	return this.componentObject;
};

/**
 * Returns a existing MyComponent object corresponding to key or creates a new one if there none.
 * @param {CGFscene} scene
 * @param {String} key for the component in the scene graph
 * @return {MyComponent} this.componentObject
 */
getComponent = function(scene, key) {
	var component = scene.graph.components[key];
	if (component.componentObject == null)
 		return component.create(scene);
 	return component.componentObject;
};