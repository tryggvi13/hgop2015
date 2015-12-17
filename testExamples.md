Test Examples for TicTacToe
===========

Failure

Player 1 places in 1.1

[x][-][-]
[-][-][-]
[-][-][-]

Player 2 tries to place O in same place (place 1.1).

Player 2 receives message: Place 1.1 is not avalable. Choose another place.


Player 2 tries to make a move when it is player 1 turn.

Move is not made



Winning Scenarios

Horizontal Win

Eather player wins by placeing 3 X's or 3 O's in the same row horizontally

Example
[x][x][x]
[o][o][-]
[-][-][-]

Vertical Win

Eather player wins by placeing 3 X's or 3 O's in the same column vertically

Example
[x][o][-]
[x][o][-]
[x][-][-]

Diagonal Win

Eather player wins by placeing 3 X's or 3 O's in diagonally

Example
[x][o][o]
[-][x][-]
[-][-][x]


Draw Scenarios

Player 2 can not make a move because the entire board has been filled with out a winning scenario appearing

Example
[x][o][x]
[x][o][o]
[o][x][x]