/**
 * dYove
 * @constructor
 */
function Move(coordinates, direction, distance) {
    this.coordinates = coordinates;
    this.direction = direction;
    this.distance = distance;
};

Move.prototype = Object.create(CGFobject.prototype);
Move.prototype.constructor = Move;

Move.prototype.destination = function(){
    this.destination = [];
    this.destination[0] = this.coordinates[0];
    this.destination[1] = this.coordinates[1];
    
    switch(this.direction){
        case "north":
            this.destination[1] -= this.distance;
            break;
        case "south":
            this.destination[1] += this.distance;
            break;
        case "west":
            this.destination[0] -= this.distance;
            break;
        case "east":
            this.destination[0] += this.distance;
            break;
        default:
            break;
    }
    return this.destination;
}
