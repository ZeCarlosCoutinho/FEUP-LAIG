function Component(id) {
	this.id = id;
	this.loaded = false;
	
	this.transformation_id;
	this.transformation_matrix = [];
	
	this.material_ids = [];
	
	this.texture_id;
	
	this.component_refs = [];
	this.primitive_refs = [];
}

Component.prototype.isLoaded=function(){
	return this.loaded;
}

Component.prototype.toString=function(){
	return "Component Item " + this.id + "    Loaded? " + this.loaded + "\n"
	+ "Transformation id: " + this.transformation_id + "\n"
	+ "Matrix: " + this.transformation_matrix + "\n"
	+ "Materials: " + this.material_ids + "\n"
	+ "Texture: " + this.texture_id + "\n"
	+ "ComponentRefs: " + this.component_refs + "\n"
	+ "PrimitiveRefs: " + this.primitive_refs;
}

