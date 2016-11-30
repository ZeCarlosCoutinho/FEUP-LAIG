/**
 * TurnStart
 * @constructor
 */

TurnStart.prototype = new GameState();

function TurnStart() {
    this.pieceChosen; //Piece passed to the next state
};

TurnStart.prototype.display = function()
{
   this.board.display();

   //TODO EXTRA Highlight às peças
};

TurnStart.prototype.next = function(){
    return new PieceSelected(player, board, this.pieceChosen);
}


TurnStart.prototype.logPicking = function()
{
    if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					this.pieceChosen = this.board.getPieceByPickedID(customId); //TODO 
					this.done = true;
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
};