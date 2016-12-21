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

GameState.prototype.remakeMove2 = function()
{
	var movesDone = this.board.movesDone;
	this.board.playersTypes = [];
	this.board.playersTypes["red"] = this.scene.players["red"].type;//Save players defs
	this.board.playersTypes["white"] = this.scene.players["white"].type;
	if (movesDone.length > 0){
		//nOW DOES THE MOVIE

		/*var lastmove = movesDone.pop();
		if(lastmove.player.type == "pc")
		{
			movesDone.pop();
		}*/
	
		//Board Reset
		this.board.initializePieces();
		//this.board.movesDone = [];
		this.board.turn = 0;
	
		this.scene.players["red"].type = "auto";
		this.scene.players["white"].type = "auto";

		this.board.state = new AutoTurnStart(this.player, this.board);
	}
}

GameState.prototype.remakeMove = function()
{
	var movesDone = this.board.movesDone;
	if (movesDone.length > 0){
		var lastmove = movesDone.pop();
		if(lastmove.player.type == "pc")
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
}