/**
 * TurnEnd
 * @constructor
 */

TurnEnd.prototype = new GameState();

function TurnEnd() {
};

TurnEnd.prototype.display = function()
{
   this.board.display();

   //TODO EXTRA Highlight às peças
};

TurnEnd.prototype.next = function(){
	if(someoneWon())
    	return new End(player, board);
    else
    	return new Start(nextPlayer(), board);
};