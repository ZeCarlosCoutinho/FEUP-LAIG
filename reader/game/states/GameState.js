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

GameState.prototype.remakeMove = function()
{
	var movesDone = this.board.movesDone;
	var lastmove = movesDone.pop();
	if(lastmove.player == "pc")
	{
		movesDone.pop();
	}

	//Board Reset
	this.board.initializePieces();
	this.board.movesDone = [];

	for(var i = 0; i < movesDone.length; i++)
	{
		var move = new MoveSelected(movesDone[i].player, this.board, movesDone[i].move);
		move.next();
	}
}