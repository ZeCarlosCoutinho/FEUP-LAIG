function Camera(scene, viewsList) {
    this.scene = scene;
    this.viewsList = viewsList;
    this.current_view_index = 0;
    this.current = this.viewsList[0];
    this.camera = new CGFcamera(this.current.fov, this.current.near, this.current.far, this.current.position.slice(0), this.current.target.slice(0));
    this.center_camera_on = true;
    this.speed = 2;

    this.auto_set_on = true;
};


Camera.prototype = Object.create(CGFobject.prototype);
Camera.prototype.constructor = Camera;

Camera.prototype.centerCamera = function(currTime){
    if(!this.center_camera_on)
        return;

    if(!this.time){
        this.time = currTime;
        return;
    }

    var t = (currTime - this.time) * this.speed;
    t = t / 1000;

    //Calculate camera displacement
    var fov = this.camera.fov + (this.current.fov - this.camera.fov) * t;
    var near = this.camera.near + (this.current.near - this.camera.near) * t;
    var far = this.camera.far + (this.current.far - this.camera.far) * t;

    var position = [];
    for (var i = 0; i < 4; i++)
        position[i] = this.camera.position[i] + (this.current.position[i] - this.camera.position[i]) * t;

    var target = [];
    for (var i = 0; i < 4; i++)
        target[i] = this.camera.target[i] + (this.current.target[i] - this.camera.target[i]) * t;
    
    var _up = [];
    for (var i = 0; i < 3; i++)
        _up[i] = this.camera._up[i] + (this.current._up[i] - this.camera._up[i]) * t;

    //Apply
    this.camera.fov = fov;
    this.camera.near = near;
    this.camera.far = far;
    this.camera._up = _up;
    this.camera.setPosition(position);
    this.camera.setTarget(target);

    /*//Calculate camera displacement
    var fov_d = this.current.fov - this.camera.fov;
    var near_d = this.current.near - this.camera.near;
    var far_d = this.current.far - this.camera.far;

    var position = [];
    for (var i = 0; i < 4; i++)
        position[i] = this.camera.position[i] + (this.current.position[i] - this.camera.position[i]) * t;

    var target = [];
    for (var i = 0; i < 4; i++)
        target[i] = this.camera.target[i] + (this.current.target[i] - this.camera.target[i]) * t;
    

    //Apply
    var float_max_delta = 0.01;
    if (float_max_delta < Math.abs(fov_d))
        this.camera.fov += fov_d * t;
    
    if (float_max_delta < Math.abs(near_d))
        this.camera.near += near_d * t;
    
    if (float_max_delta < Math.abs(far_d))
        this.camera.far += far_d * t;
    this.camera.setPosition(position);
    this.camera.setTarget(target);*/

    this.time = currTime;
}

Camera.prototype.next = function(){
    this.current_view_index++;
    if (this.current_view_index >= this.viewsList.length)
        this.current_view_index = 0;
    this.current = this.viewsList[this.current_view_index];
}

Camera.prototype.set = function(index){
    if(this.auto_set_on){
        if (index == "red")
            index = 0;
        if (index == "white")
            index = 1;

        this.current_view_index = index;
        if (this.current_view_index >= this.viewsList.length)
            this.current_view_index = 0;
        this.current = this.viewsList[this.current_view_index];
    }
}

Camera.prototype.reload = function(viewsList){
    this.viewsList = viewsList;

     var old = this.scene.interface.cam_com;
     this.set(old.current_view_index);
     this.center_camera_on = old.center_camera_on;
     this.speed = old.speed;
     this.auto_set_on = old.auto_set_on;
}
