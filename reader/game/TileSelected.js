/**
 * TileSelected
 * @constructor
 */

TileSelected.prototype = new GameState();

function TileSelected(pieceChosen, tileChosen) {
    this.pieceChosen = pieceChosen; //Piece passed to the from the previous state
    this.tileChosen = tileChosen;
};

TileSelected.prototype.display = function()
{
   this.board.display();

   //TODO EXTRA Animaçoes
};

TileSelected.prototype.next = function(){
    return new TurnEnd(player, board);
}
