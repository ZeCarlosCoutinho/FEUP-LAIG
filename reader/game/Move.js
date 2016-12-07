/**
 * MyMove
 * @constructor
 */
function MyMove(coordinates, direction, distance) {
    this.coordinates;
    this.direction;
    this.distance;
};

MyMove.prototype = Object.create(CGFobject.prototype);
MyMove.prototype.constructor = MyMove;

function parseMove(string){
    var res = string.split('-');
    var coord = [];
    coord[0] = res[0];
    coord[0] = res[1];
}