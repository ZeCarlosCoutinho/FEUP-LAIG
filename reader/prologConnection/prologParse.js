function parseListMoves(string)
{
    var str = string.slice(1,string.length-1);
	var listMoves = str.split(',');
	var res = [];
	for (move in listMoves)
	   res.push(parseMove(listMoves[move]).destination);
    return res;
}

function parseMove(string){
    var res = string.split('-');
    var coord = [];
    coord[0] = Number(res[1]);
    coord[1] =  Number(res[0]);
    direction = res[2];
    distance =  Number(res[3]);
    return new Move(coord, direction, distance);
}