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
	return "Component Item " + this.id + "    Loaded? " + this.loaded ;
}

