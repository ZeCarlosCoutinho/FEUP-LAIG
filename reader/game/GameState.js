/**
 * Game
 * @constructor

 TurnStart, PieceSelected, SpaceSelected,TurnEnd,End
 */
function GameState(player, board) {
    this.player = player;
    this.board = board;
    this.done = false; //True if state completed, else false
};
