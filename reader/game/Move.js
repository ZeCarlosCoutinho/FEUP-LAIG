/**
 * dYove
 * @constructor
 */
function Move(coordinates, direction, distance) {
    this.coordinates = coordinates;
    
    this.direction = direction;
    this.directionVector;
    switch(this.direction){
    case "north":
        this.directionVector = [0,-1];
        break;
    case "south":
        this.directionVector = [0,1];
        break;
    case "west":
        this.directionVector = [-1,0];
        break;
    case "east":
        this.directionVector = [1,0];
        break;
    default:
        this.directionVector = null;
    }

    this.distance = distance;
    this.difference = scaleVec(this.directionVector, distance);
    this.destination = sumVec(coordinates, this.difference);

};

Move.prototype = Object.create(CGFobject.prototype);
Move.prototype.constructor = Move;

Move.prototype.apply = function(board){
    var Xi = this.coordinates[0];
    var Zi = this.coordinates[1];
    var Xf = this.destination[0];
    var Zf = this.destination[1];
    if (isOutOfBoard(Xf, Zf))
    {
        board.destroyedPieces.push(board.pieces[Xi][Zi]);
        //board.almostDestroyedPieces.push(board.pieces[Xi][Zi]);

        //Inserts the piece in the auxiliary Board
        board.auxiliarBoard.insertPiece(board.pieces[Xi][Zi]);
    }
    else
        board.pieces[Xf][Zf] = board.pieces[Xi][Zi];
    board.pieces[Xi][Zi] = undefined;
}

Move.prototype.getImplication = function(board, stack){
    stack = stack || [];
    stack.push(this);

    var currCoord = [];
    currCoord[0] = this.coordinates[0];
    currCoord[1] = this.coordinates[1];
    var i = 0;
    do{
        currCoord = sumVec(currCoord, this.directionVector);
        if (isOutOfBoard(currCoord[0], currCoord[1])){
            break;
        }
        if (typeof board.pieces[currCoord[0]][currCoord[1]] != "undefined"){
            (new Move(currCoord, this.direction, this.distance - i)).getImplication(board, stack);
            break;
        }
        i++;
    }while(i < this.distance)
    return stack;
}


Move.prototype.isGoingOutOfBoard = function()
{
    var Xf = this.destination[0];
    var Zf = this.destination[1];
    return isOutOfBoard(Xf, Zf);
}

isOutOfBoard = function(Xf, Zf){
    return Xf > 9 || Xf < 1 || Zf > 9 || Zf < 1;
}

sumVec = function(vec1, vec2){
    if (vec1.length != vec2.length)
        return;
    
    var res = [];
    for(var i = 0; i < vec1.length; i++){
        res[i] = vec1[i] + vec2[i];
    }
    return res;
}


multVec = function(vec1, vec2){
    if (vec1.length != vec2.length)
        return;
    
    var res = [];
    for(var i = 0; i < vec1.length; i++){
        res[i] = vec1[i] * vec2[i];
    }
    return res;
}

scaleVec = function(vec1, scale){
    var res = [];
    for(var i = 0; i < vec1.length; i++){
        res[i] = vec1[i] * scale;
    }
    return res;
}

