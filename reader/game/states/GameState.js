/**
 * Game
 * @constructor

 TurnStart, PieceSelected, SpaceSelected,TurnEnd,End
 */
function GameState(player, board) {
    this.player = player;
    this.board = board;
    this.scene = this.board.scene;
    this.done = false; //True if state completed, else false
};

GameState.prototype.constructor = GameState;