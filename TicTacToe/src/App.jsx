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
  const [board, setBoard] = useState(['x', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'x'])

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
    </main>
  );
}

export default App;
