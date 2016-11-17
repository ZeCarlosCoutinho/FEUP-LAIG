/**
 * Component
 * @constructor
 */
function Component(id) {
	this.id = id;
	
	this.transformation_id;
	this.transformation_matrix = [];
	this.animationList = [];
	
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
	var animation = this.createAnimation();
	this.componentObject = new MyComponent(scene, this.transformation_matrix, animation, this.material_ids, this.texture_id, this.component_refs, this.primitive_refs);
	return this.componentObject;
};

/**
 * Creates a new MyComponent object
 * @return {MyComponent}
 */
Component.prototype.createAnimation = function() {
	switch(this.animationList.length ){
	case 0:
		return null;
		break;
	case 1:
		return this.animationList[0].create();
		break;
	default:
		var animationList = [];
		for (var a in this.animationList)
		animationList.push(this.animationList[a].create());
		return new CompoundAnimation("compound", animationList);
		
	}
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