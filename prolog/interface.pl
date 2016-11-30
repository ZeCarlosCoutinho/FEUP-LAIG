:- module(interface, [getMainMenuOption/1, clearScreen/0, getDifficulty/2, showWinner/1, askMove/1, showTurn/1, showReady/0, showWait/0]).


/** clearScreen

	Clears the screen.
*/
clearScreen :-
	write('\33\[2J').
	
	
	
	
/** player(Player, String)

	Links a player to a string representing it.
*/
player(red, 'Red').
player(white, 'White').
		
		
		
		
		
/** getMainMenuOption(Option)
	
	Shows the main menu and prompts the user to choose.
*/
getMainMenuOption(Option):-
	repeat,
	clearScreen,
	write('                           ____     _____   _    _   _____     '),nl,
	write('                          / __ \\   / ____| | |  | | |_   _|   '),nl,
	write('                         | |  | | | (___   | |__| |   | |      '),nl,
	write('                         | |  | |  \\___ \\  |  __  |   | |    '),nl,
	write('                         | |__| |  ____) | | |  | |  _| |_     '),nl,
	write('                          \\____/  |_____/  |_|  |_| |_____|   '),nl,
	write('1 - Play'),nl,
	write('2 - Settings'),nl,
	write('3 - Exit'),nl,
	write('Insert option number: '),
	read(Option),
	member(Option,[1,2,3]).




/** getDifficulty(+Player, -Difficulty)
	
	Asks the user for the mode and difficulty of Player.
*/	
getDifficulty(Player, Difficulty):-
	player(Player, P),
	repeat,
	clearScreen,
	write('Player '), write(P), write(' is human? (Yes(1) or No(2))'),nl,
	read(Option),
	checkMode(Option, Difficulty).




/** checkMode(+Mode, -Difficulty).
	
	Returns -1(Human) if mode is 1.
	Asks the player for the difficulty of the AI if mode is 2.
*/	
checkMode(1, -1).
checkMode(2, Difficulty):-
	getDifficultyLevel(Difficulty).
	
	
	
	
/** getDifficultyLevel(-Difficulty).
	
	Asks the player for the difficulty of the AI.
*/	
getDifficultyLevel(Difficulty) :-
	repeat,
	clearScreen,
	write('CHOOSE DIFFICULTY'),nl,
	write('0 - Super Easy'),nl,
	write('1 - Easy'),nl,
	write('2 - Medium'),nl,
	write('3 - Difficult'),nl,
	write('Insert option number: '),
	read(Option),
	checkDifficultyLevel(Option, Difficulty).




/** checkDifficultyLevel(+Option, -Difficulty).
	
	If option is valid, difficulty becomes equal to option.
*/	
checkDifficultyLevel(Option, Option):-
	member(Option, [0,1,2,3]).
	
	
	
	
	
/** showWinner(+Player)

	Shows the game result.
*/
showWinner(draw):-
	write('END - Draw...').
showWinner(Player):-
	write('END - '), 
	player(Player, P),
	write(P),
	write(' won!').

/** askMove(-Move)

	Asks the player for the move he wants to perform.
*/
askMove(Row-Col-Dir-Spaces):-
	repeat,
	write('Row (1-9)?'),nl,
	read(Row),
	write('Column (1-9)?'),nl,
	read(Col),
	write('Direction (north, east, west, south)?'),nl,
	read(Dir),
	write('Spaces (1-3)?'),nl,
	read(Spaces),
	member(Row, [1,2,3,4,5,6,7,8,9]),
	member(Col, [1,2,3,4,5,6,7,8,9]),
	member(Dir, [north, east, west, south]),
	member(Spaces, [1,2,3]).
	
/** showTurn(+Player)

	Shows the game result.
*/
showTurn(Player):-
	player(Player, P),
	write(P),
	write('\' Turn'),
	nl.
	
	
/** showWait

	Shows the waiting message.
*/
showWait:-
	write('Thinking...'),
	nl.
	
/** showReady

	Shows the ready message.
	Prompts the user for confirmation.
*/
showReady:-
	write('Ready! Write \'ok\' to continue.'),
	nl,
	repeat,
	read('ok').