// ---------------------------------------------------------
// Particle (Replaced with Boid) Render Prototype Methods


Boid.prototype.set_hue  = function(){ this.hue = 180 * Math.random(); }
Boid.prototype.set_radius = function(){ this.radius = Math.random() * 40; }
Boid.prototype.set_rotation = function(){ 
    this.rotation   = new THREE.Vector3();
    this.rotation.x = this.rotation.y = this.rotation.z = 0;

    this.rotation_v = new THREE.Vector3();
    this.rotation_v.x = Math.random()/10;
    this.rotation_v.y = Math.random()/10;
    this.rotation_v.z = Math.random()/10;
 }

Boid.prototype.set_parameters = function() {
    /**
        * Action Required: add a radius and hue parameter such that:
            * the radius is randomly initialized between 0 and 40
        * These are parameters required to implant properties into the boids
    **/
    b.set_hue();
    b.set_radius();
    b.set_rotation();
    b.init_mesh_obj();
 

    /**
        * No Action Required
        * these parameters are used in calulating the color as a function of momentum
    **/

    this.max_momentum = 0;
    this.min_momentum = 4; 
    this.range_momentum = 0;
}

Boid.prototype.create_geometry = function() {
    /** 
        * Action Required: fill this in using a box geometry
        * see http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry
    **/
    this.geometry = new THREE.BoxGeometry( this.radius, this.radius, this.radius);
    
}

Boid.prototype.create_material = function() {
    // assign a random color from HSL space
    this.color = new THREE.Color(); // http://threejs.org/docs/#Reference/Math/Color
    this.color.setHSL(Math.random(), .85, .5);

    this.material = new THREE.MeshPhongMaterial({
        color: this.color,
        specular: 0x333333,
        shininess: .9
    });
    this.material.transparent = true;
    this.material.opacity = .75;

    /**
        * Action Required: fill this in using some material with specular + diffuse lighting
        * make it transparent
        * see http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial
        * hint: the following properties may be useful when instantiating your material
            {
                "color": this.color,
                "specular": 0x333333,
                "shininess": .9,
                "transparent": true,
                "opacity": 0.75
            }
    **/

    

    if(typeof(this.material) == "undefined") console.log("Action Required: You need to set a boid material.") // delete this line
}

Boid.prototype.create_mesh = function() {
    /**
        * Action Required: create your mesh
        * think of a mesh as a backpacker's tent, where you bind geometry (tent poles) and material (tent canvas)
        * see http://threejs.org/docs/#Reference/Objects/Mesh
    **/
    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );
    
    

    /**
        * Action Required: set the position of the mesh to the position of the boid in xyz space
        * hint: this.position.x is the current x location of the boid
    **/
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    

    if(typeof(this.mesh) != "undefined" && this.mesh.position.x == 0 && this.mesh.position.y == 0 && this.mesh.position.z == 0) console.log("Action Required: You need to set the mesh position.") // delete this line
}

Boid.prototype.init_mesh_obj = function() {
    /**
        * No Action Required
        * This is a convenience procedure for making a mesh, so we only need to call this one function instead of all 3
    **/

    this.create_geometry();
    this.create_material();
    this.create_mesh();
}

Boid.prototype.update_mesh = function() {  
    /**
        * Action Required: update the new position of the mesh to the current position of the boid in xyz space
        * this is the data --> visual binding step
        * hence you bind the position of the boids (data) to the position of the mesh (visual)
        * hint: this.position.x is the current x location of the boid
    **/

    // update rotation ( rotation is a vector of type Euler http://threejs.org/docs/#Reference/Math/Euler )
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.rotation.setFromVector3(new THREE.Vector3(this.rx, this.ry, this.rz));

    // calculate momentum and apply it to the color
    

    if(typeof(this.mesh) != "undefined" && this.mesh.position.x == 0 && this.mesh.position.y == 0 && this.mesh.position.z == 0) console.log("Action Required: You need to update the mesh position.") // delete this line

    /** bonus points:
        * No Action Required
        * calculate momentum and map it to color in HSL space
        * try adjusting the 1.1 and 0.4 scaling to see how that affects the color as a function of momentum
        * hook these two parameters into a dat.gui slider
    **/
    var momentum = this.velocity.length() * this.radius;
    var intensity = momentum/200;
    if(intensity < 0) intensity = 0;
    if(intensity > 1) intensity = 1;
    this.mesh.material.color.setHSL( intensity, .1 + intensity * .85, .2 + intensity * .4);

}