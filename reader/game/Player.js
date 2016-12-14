/**
 * Player
 * @constructor

 */
function Player(name, color, type, difficulty) {
    this.name = name;
    this.color = color;
    this.type = type;
    this.difficulty = difficulty || 0; //True if state completed, else false
};

Player.prototype.constructor = Player;