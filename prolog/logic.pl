/** <module> Movement Logic Module

This module validates and moves a piece if the movement is valid.
*/
:- module(move, [movePiece/7, movePiece/5]).

:- use_module(library(lists)).

/** movePiece(+InitialBoard, +Move, +Player, -FinalBoard, -NextPlayer)

	Validates and makes a move.
	Move is a term with a Row-Col-Direction-Spaces structure
	Sets FinalBoard and NextPlayer
*/
movePiece(InitialBoard, Row-Col-Dir-Spaces, Player, FinalBoard, NextPlayer):-
	movePiece(InitialBoard, Row-Col, Dir, Spaces, Player, FinalBoard, NextPlayer).




/** movePiece(+InitialBoard, +Move, +Player, -FinalBoard, -NextPlayer)

	Validates and makes a move.
	Sets FinalBoard and NextPlayer
*/
movePiece(InitialBoard, Row-Col, Dir, Spaces, Player, FinalBoard, NextPlayer):-
	getPiece(InitialBoard, Row-Col, Size-Team),
	checkPlayer(Player, Team),
	checkMovement(Row-Col, Dir, Spaces, Size),
	move(InitialBoard, Row-Col, Dir, Spaces, FinalBoard),
	getNextPlayer(Player, NextPlayer).






/** getPiece(+Board, +Coords, -Res)
	
	Gets the piece in the selected coordinates.
	Coords is a term with Row-Col structure
	True if there is a piece, false if empty or invalid coordinates.
*/
getPiece(Board, Row-Col, Res):-
	nth1(Row, Board, BoardRow),
	nth1(Col, BoardRow, Res),
	Res \== empty.




/** checkPlayer(?Player, ?Team)

	True if the color of the player and the piece are the same.
*/
checkPlayer(Player, Team):-
	Player == Team.






/**  checkMovement(?Coords, ?Dir, ?Spaces, ?Size)
	
	Checks if the movement is valid.
	Coords is a term with Row-Col structure.
	True if it is.
*/
checkMovement(Row-Col, Dir, Spaces, Size):-
	Spaces =< Size,
	getNewPosition(Row-Col, Dir, Spaces, X-Y),
	\+outOfBounds(X-Y).





/** getNextPlayer(?Player, ?NextPlayer)

	Gets the next player.
*/
getNextPlayer(white, red).
getNextPlayer(red, white).




/** move(+InitialBoard, +Coords, +Dir, +Spaces, -FinalBoard)

	Moves a piece in one direction X spaces.
	Coords is a term with Row-Col structure.
*/
move(InitialBoard, _, _, 0, InitialBoard).
move(InitialBoard, Row-Col, Dir, Spaces, FinalBoard):-
	getNewPosition(Row-Col, Dir, 1, X-Y),
	push(InitialBoard, Row-Col, Dir, NewBoard),
	N is Spaces - 1,
	move(NewBoard, X-Y, Dir, N, FinalBoard).






/** push(+InitialBoard, +Coords, +Dir, -FinalBoard)

	Pushes a piece in one direction.
	Coords is a term with Row-Col structure.
*/
push(InitialBoard, Row-Col, Dir, FinalBoard):-
	getPiece(InitialBoard, Row-Col, Size-Team),
	setPiece(InitialBoard, empty, Row-Col, NewBoard),
	getNewPosition(Row-Col, Dir, 1, X-Y),
	push_aux(NewBoard, Size-Team, X-Y, Dir, Size, FinalBoard).

%Piece goes out of bounds	
push_aux(InitialBoard, _, Row-Col, _, _, InitialBoard):-
	\+getPiece(InitialBoard, Row-Col, _PushedPiece),
	outOfBounds(Row-Col).

%Piece goes to empty space
push_aux(InitialBoard, Piece, Row-Col, _, _, FinalBoard):-
	\+getPiece(InitialBoard, Row-Col, _PushedPiece),
	setPiece(InitialBoard, Piece, Row-Col, FinalBoard).

%Normal case
push_aux(InitialBoard, Piece, Row-Col, Dir, Strength, FinalBoard):-
	Strength > 0,
	getPiece(InitialBoard, Row-Col, PushedPiece),
	setPiece(InitialBoard, Piece, Row-Col, NewBoard),
	getNewPosition(Row-Col, Dir, 1, X-Y),
	S is Strength - 1,
	push_aux(NewBoard, PushedPiece, X-Y, Dir, S, FinalBoard).
	
	
	
/** getNewPosition(?Coords, ?Direction, ?Distance, ?NewCoords)

Gets a new position.
Coords and NewCoords are terms with Row-Col structure.
*/	
getNewPosition(Row-Col, north, N, X-Y):-
	X is Row - N,
	Y is Col.
getNewPosition(Row-Col, south, N, X-Y):-
	X is Row + N,
	Y is Col.
getNewPosition(Row-Col, west, N, X-Y):-
	X is Row,
	Y is Col - N.
getNewPosition(Row-Col, east, N, X-Y):-
	X is Row,
	Y is Col + N.

/**	setPiece(+InitialBoard, +Piece, +Coords, -NewBoard)

	Puts Piece in the indicated position of the board.
*/
setPiece(InitialBoard, Piece, Row-Col, NewBoard):-
	setMatrixElem(InitialBoard, Piece, Row, Col, NewBoard).

setLineElem([_|B], Elem, 1, [Elem|B]).
setLineElem([A|B], Elem, Col, [A|NewB]):-
	C is Col-1,
	setLineElem(B, Elem, C, NewB).
setMatrixElem([A|B], Elem, 1, Col, [NewA|B]):-
	setLineElem(A, Elem, Col, NewA).
setMatrixElem([A|B], Elem, Row, Col, [A|NewB]):-
	R is Row-1,
	setMatrixElem(B, Elem, R, Col, NewB).

/** outOfBounds(Coords)

Checks if is out of bounds.
Coords is a term with Row-Col structure.
*/	
outOfBounds(_Row-Col):- Col < 1.
outOfBounds(Row-_Col):- Row < 1.
outOfBounds(_Row-Col):- Col > 9.
outOfBounds(Row-_Col):- Row > 9.

/** direction(Direction)

	Checks if it is a valid direction.
*/
direction(north).
direction(south).
direction(east).
direction(west).