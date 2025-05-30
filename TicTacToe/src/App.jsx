import Square from "./components/Square";
import "./css/index.css";
import "./css/board.css";
import { useState } from "react";

// Constante para los turnos
const TURNS = {
  X: "x",
  O: "o",
};

function App() {
  // El tablero es un array de 9 posiciones inicialmente vacío
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado para saber de quién es el turno, inicialmente empiezan las X
  const [turn, setTurn] = useState(TURNS.X);

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          // Usamos el índice ya que es lo que vamos a renderizar (posición 0, 1, 2...)
          return (
            <Square
              key={index}
              index={index} // Consideramos el índice como id único ya que las posiciones nunca van a cambiar
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
    // Cambiamos el estado a través del estado de un componente padre 
  );
}

export default App;
