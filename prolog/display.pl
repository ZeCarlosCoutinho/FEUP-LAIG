:- module( display, [board/2, displayBoard/1]).

:- use_module(score).

board([
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty]], vazio
).

board([
[3-red, empty, empty, empty, empty, empty, empty, empty, 3-white],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, 2-red, empty, empty, empty, empty, empty, 2-white, empty],
[empty, 1-red, empty, empty, empty, empty, empty, 1-white, empty],
[empty, 1-red, 1-red, empty, empty, empty, 1-white, 1-white, empty],
[empty, 1-red, empty, empty, empty, empty, empty, 1-white, empty],
[empty, 2-red, empty, empty, empty, empty, empty, 2-white, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[3-red, empty, empty, empty, empty, empty, empty, empty, 3-white]], inicial
).

board([
[empty, empty, empty, empty, 3-red, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, 2-white, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, 1-red, 1-white, empty],
[empty, 2-red, empty, empty, empty, 1-red, 1-white, empty, empty],
[empty, empty, empty, empty, empty, 1-red, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[3-white, empty, empty, empty, empty, empty, empty, empty, empty]], fim
).

board([
[empty, empty, empty, empty, 3-white, empty, empty, empty, empty],
[empty, empty, empty, empty, 3-red, empty, empty, empty, empty],
[empty, empty, empty, empty, 2-white, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, 1-red, 1-white, empty],
[empty, 2-red, empty, empty, empty, 1-red, 1-white, empty, empty],
[empty, empty, empty, empty, 1-red, 1-white, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, empty, empty],
[3-white, empty, empty, empty, empty, empty, empty, empty, empty]], meio
).




/** displayHeader(+Board)
	
	Prints the board header.
*/
displayHeader(Board):-
	getScore(Board, R-W),
	write( 'Current Score:                                                     N   '),
	nl,
	write( '                 Red(Right Side) '),
	write(R),
	write(' - '),
	write(W),
	write(' White(Left Side)           W+E' ),
	nl,
	write( '                                                                   S' ),
	nl.


/** displayBoard(+Board)

	Prints the board.
*/
displayBoard(Board):-
	displayHeader(Board),
	displayBoard(Board,0).
displayBoard([A|B],N):-
	N1 is N+1,
	displayLine(A,N1),
	nl,
	displayBoard(B,N1).
displayBoard([],_):-
	write( '   1       2       3       4       5       6       7       8       9   ' ),
	nl.


/** displayLine(+Line, +LineNumber)

	Prints a board row.
*/
displayLine(A, N):-
	write(' '), displayLineBorder(A), nl,
	write(' '), displayLineSpace(A), nl,
	write(N), displayLineUpper(A), nl,
	write(' '), displayLineLower(A), nl,
	write(' '), displayLineSpace(A), nl,
	write(' '), displayLineBorder(A).

displayLineBorder([A|B]):-
	translateBorder(A,Border),
	write(Border),
	displayLineBorder(B).
displayLineBorder([]).

displayLineSpace([A|B]):-
	translateSpace(A,Space),
	write(Space),
	displayLineSpace(B).
displayLineSpace([]).

displayLineUpper([A|B]):-
	translateUpper(A,Upper),
	write('|'),
	write(Upper),
	write('|'),
	displayLineUpper(B).
displayLineUpper([]).

displayLineLower([]).
displayLineLower([A|B]):-
	translateLower(A,Lower),
	write('|'),
	write(Lower),
	write('|'),
	displayLineLower(B).



/** translateXXXX (+Piece, -String)

	Translates a piece to a string.
*/
translateBorder(_, '|------|').
translateSpace(_, '|      |').

translateUpper(empty, '      ').
translateUpper(1-red, '|\\    ').
translateUpper(2-red, '|\\|\\  ').
translateUpper(3-red, '|\\|\\|\\').
translateUpper(1-white, '    /|').
translateUpper(2-white, '  /|/|').
translateUpper(3-white, '/|/|/|').

translateLower(1-red, '|/    ').
translateLower(2-red, '|/|/  ').
translateLower(3-red, '|/|/|/').
translateLower(empty, '      ').
translateLower(1-white, '    \\|').
translateLower(2-white, '  \\|\\|').
translateLower(3-white, '\\|\\|\\|').
