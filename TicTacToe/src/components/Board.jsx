import Square from "./Square";
import { useState } from "react";
import "../css/board.css";

// Turnos
const TURNS = {
  X: "x",
  O: "o",
};

function Board() {
  // El tablero es un array de 9 posiciones inicialmente vacío
  const [board, setBoard] = useState(Array(9).fill(null));
  // Estado para saber a quién le toca el turno, inicialmente empieza la X
  const [turn, setTurn] = useState(TURNS.X);

  // Función para actualizar el tablero al hacer clic
  const updateBoard = (index) => {
    const newBoard = [...board]; // Creamos una nueva versión del tablero
    newBoard[index] = turn; // En la casilla donde se hizo clic guardamos el valor del turno actual (el que hizo clic)
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Cambiamos el turno
    setTurn(newTurn);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          // Usamos el índice ya que es lo que vamos a renderizar (la posición)
          return (
            <Square
              key={index}
              index={index} // Consideramo el índice como id único ya que las posiciones nunca van a cambiar
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default Board;
