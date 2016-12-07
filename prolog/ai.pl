/** <module> Artificial Intelligence Module

This module discovers the best move possible that one of the players can
do in given state of the board.
*/
:- module(ai, [thinkMove/4, getAllValidMoves/3]).

:- use_module(library(random)).
:- use_module(library(lists)).
:- use_module(score).
:- use_module(logic).

/** thinkMove(+Board, +Player, +Difficulty, -Move)

Gets the best move the player can make, attending do difficulty.
Difficulty < 1: fails
Difficulty = 0: random viable move
Difficulty > 1: uses a MinMax like algorithm with depth = Difficulty
*/
thinkMove(Board, Player, 0, Move):-
	getAllValidMoves(Board, Player, ListMoves),
	length(ListMoves, L),
	random(1, L, R),
	nth1(R, ListMoves, Move), !.	
thinkMove(Board, Player, Difficulty, Move):-
	Difficulty > 0,
	predictBestMove(Board, Player, Difficulty, Move, _).




/** getAllValidMoves(+Board, +Player, -ListMoves)

Gets all valid moves the player can make.
*/
getAllValidMoves(Board, Player, ListMoves):-
	findall(	Row-Col-Dir-Spaces,
				(member(Spaces,[1,2,3]), movePiece(Board, Row-Col, Dir, Spaces, Player, _NewBoard, _NextPlayer)),
				ListMoves).



/** getBestMove(+Board, +Player, +ListMoves, +Move)

Gets the best move from a list of moves by comparing the scores of the resulting boards.
Results are compared using predicate better/3 of module "score".
*/
getBestMove(Board, Player, ListMoves, Move):-
	getBestMoveAux(Board, Player, ListMoves, MoveList, (-1)-(-1), _),
	random_member(Move, MoveList).
	
% If Score is better than last BestScore
getBestMoveAux(Board, Player, [FMove|OthMoves], MoveList, BestScore, _BestMoveList):-
	getMoveScore(Board, Player, FMove, Score),
	better(Score, BestScore, Player),
	getBestMoveAux(Board, Player, OthMoves, MoveList, Score, [FMove]).
	
% If Score is  equal to last BestScore	
getBestMoveAux(Board, Player, [FMove|OthMoves], MoveList, BestScore, BestMoveList):-
	getMoveScore(Board, Player, FMove, Score),
	equalScore(Score, BestScore),	
	getBestMoveAux(Board, Player, OthMoves, MoveList, BestScore, [FMove|BestMoveList]).
	
% If Score is worse or equal to last BestScore	
getBestMoveAux(Board, Player, [_|OthMoves], MoveList, BestScore, BestMoveList):-
	getBestMoveAux(Board, Player, OthMoves, MoveList, BestScore, BestMoveList).

% End of list	
getBestMoveAux(_, _, [], MoveList, _, MoveList).
	


/** getMoveScore(+Board, +Player, +Move, -Score)

Gets the score after a move is made.
*/
getMoveScore(Board, Player, Row-Col-Dir-Spaces, Score):-
	movePiece(Board, Row-Col, Dir, Spaces, Player, NewBoard, _),
	getScore(NewBoard, Score).


/** predictBestMove(+Board, +Player, +Turns, -Move, -Score)

Applies MinMax algorithm with depth Turns.
Saves the best move and the score after all the predicted moves.
When depth is 1, uses getBestMove/4
*/
predictBestMove(Board, Player, Turns, Move, Score):-
	getAllValidMoves(Board, Player, ListMoves),
	T is Turns - 1,
	predictBestMoveAux(Board, Player, ListMoves, T, MoveList, Score, _BestMove, (-1)-(-1)), 
	random_member(Move, MoveList), !.

% Depth 1	
predictBestMoveAux(Board, Player, ListMoves, 0, [Row-Col-Dir-Spaces], Score, _BestMoveList, _BestScore):-
	getBestMove(Board, Player, ListMoves, Row-Col-Dir-Spaces),
	getMoveScore(Board, Player, Row-Col-Dir-Spaces, Score).

% Depth > 1
predictBestMoveAux(Board, Player, [Row-Col-Dir-Spaces|OthMoves], Turns, MoveList, Score, BestMoveList, BestScore):-
	movePiece(Board, Row-Col, Dir, Spaces, Player, NewBoard, NP),
	predictBestMove(NewBoard, NP, Turns, _, NewScore),
	updateBestMoveList(Player, Row-Col-Dir-Spaces, NewScore, BestMoveList, BestScore, NewBestMoveList, NewBestScore),
	predictBestMoveAux(Board, Player, OthMoves, Turns, MoveList, Score, NewBestMoveList, NewBestScore).

% End of list	
predictBestMoveAux(_, _, [], _, MoveList, Score, MoveList, Score).
	

updateBestMoveList(Player, Move, Score, _, BestScore, [Move], Score):-
	better(Score, BestScore, Player).
updateBestMoveList(_, Move, Score, BestMoveList, BestScore, [Move|BestMoveList], BestScore):-
	equalScore(Score, BestScore).
updateBestMoveList(_, _, _, BestMoveList, BestScore, BestMoveList, BestScore).
	
	