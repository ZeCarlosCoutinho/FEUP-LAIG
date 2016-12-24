/**
 * Player
 * @constructor

 */
function Player(name, color, type, difficulty) {
    this.name = name;
    this.color = color;
    this.type = type;
    this.difficulty = difficulty || 0; //True if state completed, else false

    //Default Camera position for player
    this.cameraPosition = vec3.fromValues(15, 15, 15);
    this.points = 0;
};

Player.prototype.constructor = Player;

Player.prototype.setCamera = function(x, y, z)
{
    this.cameraPosition = vec3.fromValues(x, y, z);
}