/** <module> Board Analysis Module

This module analyzes the board.
*/
:- module(score, [getScore/2, equalScore/2, better/3, gameOver/2]).

:- use_module(library(random)).

/** getScore(+Board, -Score)

	Calculates the Score of the board.
	Result is in a Red(right side) - White(left side) format
*/
getScore(Board, Score):-
	getScoreAux(Board, 14-14, Score).
getScoreAux([Row|Res], Ri-Wi, R-W):-
	getScoreRow(Row, Ri-Wi, Rf-Wf),
	getScoreAux(Res, Rf-Wf, R-W).
getScoreAux([], X, X).

/** getScoreRow(+Row, +InitialScore, -FinalScore)

	Calculates and adds the score of a row.
	Result is in a Red(right side) - White(left side) format
*/
getScoreRow([Cell|Res], Ri-Wi, R-W):-
	getScoreCell(Cell, Ri-Wi, Rf-Wf),
	getScoreRow(Res, Rf-Wf, R-W).
getScoreRow([], X, X).

/** getScoreCell(+Cell, +InitialScore, -FinalScore)

	Calculates and adds the score of a cell.
	Result is in a Red(right side) - White(left side) format
*/
getScoreCell(X-white, Ri-Wi, R-W):-
	R is Ri - X,
	W is Wi.	
getScoreCell(X-red, Ri-Wi, R-W):-
	R is Ri,
	W is Wi - X.
getScoreCell(empty, X,X).



/** equalScore(Score1, Score2)

True if Score1 equal to Score2.
Scores are in a Red(right side) - White(left side) format
*/
equalScore(R1-W1, R2-W2):-
	R1==R2,
	W1==W2.
	

/** better(Score1, Score2, Player)

Analizes and decides which is the best score for a player.
True if Score1 is better.
Scores are in a Red(right side) - White(left side) format
*/
better(S1, S2, red):-
	better(S1, S2).
better(R1-W1, R2-W2, white):-
	better(W1-R1, W2-R2).

better(R1-W1, R2-W2):-
	R1 > R2,
	W1 == W2.
better(R1-W1, R2-_W2):-
	R1 > R2,
	W1 < 7.
better(R1-W1, R2-W2):-
	R1 == R2,
	W1 < W2.
	
	
/** gameOver(Board, Winner)

	True if theres a winner or draw, false if no one has won yet.
*/
gameOver(Board, draw):-
	getScore(Board, R-W),
	R >= 7,
	W >= 7.
gameOver(Board, red):-
	getScore(Board, R-_W),
	R >= 7.
gameOver(Board, white):-
	getScore(Board, _R-W),
	W >= 7.
