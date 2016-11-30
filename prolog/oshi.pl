:- use_module(ai).
:- use_module(display).
:- use_module(interface).
:- use_module(score).
:- use_module(logic).


/** settings (+Player, -Difficulty )

	AI's difficulty for the player.
	-1 - Human
	0 to 3 - AI
*/
% settings ( Player, Difficulty )
:- dynamic settings/2.
settings(red, -1).
settings(white, 1).





/** game

	Start's the game, showing the main menu.I
*/
game:- 
	getMainMenuOption(Option),
	processMainMenuOption(Option).





/** processMainMenuOption(+Option)

	Option=1, starts the game.
	Option=2, goes to settings menu.
	Option=3, exits.
*/
processMainMenuOption(1):-
	!,
	board(InitialBoard, inicial),
	takeTurn(InitialBoard, red).
processMainMenuOption(2):-
	settingsMenu,
	game.
processMainMenuOption(3).







/** takeTurn(Board, Player)

	Shows the current Board.
	If the game has ended, shows the winner.
	Else, asks the user about the next move (or computes it if it is AI's turn).
	Makes the move and goes to the next turn.
*/
takeTurn(Board, _Player):-
	gameOver(Board, Winner),
	clearScreen,
	displayBoard(Board),
	showWinner(Winner).
	
% Player
takeTurn(Board, Player):-
	settings(Player, -1),
	repeat,
	clearScreen,
	displayBoard(Board),
	showTurn(Player),
	askMove(Move),
	movePiece(Board, Move, Player, NextBoard, NextPlayer),
	takeTurn(NextBoard, NextPlayer).
% PC
takeTurn(Board, Player):-
	settings(Player, Difficulty),
	clearScreen,
	displayBoard(Board),
	showTurn(Player),
	Difficulty >= 0,
	showWait,
	thinkMove(Board, Player, Difficulty, Move),
	movePiece(Board, Move, Player, NextBoard, NextPlayer),
	showReady,
	takeTurn(NextBoard, NextPlayer).



	
/** settingsMenu

	Shows the settings menu.
*/	
settingsMenu:-
	getDifficulty(red, D1),
	retract(settings(red, _)),
	assert(settings(red, D1)),
	getDifficulty(white, D2),
	retract(settings(white, _)),
	assert(settings(white, D2)).