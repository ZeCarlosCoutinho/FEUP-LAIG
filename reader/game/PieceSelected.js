/**
 * PieceSelected
 * @constructor
 */

PieceSelected.prototype = new GameState();

function PieceSelected(pieceChosen) {
    this.pieceChosen = pieceChosen; //Piece passed to the from the previous state
    this.tileChosen;
};

PieceSelected.prototype.display = function()
{
   this.board.display();

   //TODO EXTRA Highlight aos tiles possiveis
};

PieceSelected.prototype.next = function(){
    return new TileSelected(player, board, this.pieceChosen,  this.tileChosen);
}


PieceSelected.prototype.logPicking = function()
{
    if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];
					if(this.board.getPieceByPickedID(customId) > 0)				
						this.pieceChosen = this.board.getPieceByPickedID(customId); //TODO 
					else{
						this.tileChosen = this.board.getTileByPickedID(customId); //TODO 
						this.done = true;
					}
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
};