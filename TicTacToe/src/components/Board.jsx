import Square from "./Square";
import { useState } from "react";
import "../css/board.css";
import "../css/square.css";
import confetti from "canvas-confetti";
import { TURNS, WINNER_COMBOS } from "../constants";

function Board() {
  // El tablero es un array de 9 posiciones inicialmente vacío
  const [board, setBoard] = useState(Array(9).fill(null));
  // Estado para saber a quién le toca el turno, inicialmente empieza la X
  const [turn, setTurn] = useState(TURNS.X);
  // Estado del ganador: null (no hay ganador) o false (hay empate)
  const [winner, setWinner] = useState(null);

  // Método para saber el ganador revisando todas las combinaciones ganadoras
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo; // Recuperamos las posiciones a chequear
      if (
        boardToCheck[a] && // miramos si hay una X o una O en la posición 'a'
        boardToCheck[a] === boardToCheck[b] && // miramos si tanto en 'a' como en 'b' hay el mismo símbolo
        boardToCheck[a] === boardToCheck[c] // lo mismo para la tercera posición
      ) {
        return boardToCheck[a]; // devolvemos el símbolo del ganador
      }
    }

    // si no hay ganador devolvemos null
    return null;
  };


  // Función para resetear el juego a su estado inicial
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  // Función para comprobar si hay empate en el tablero (se han hecho todos los movimientos y no hay ganador)
  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate si no hay más espacios vacíos en el tablero 
    // (todas las posiciones son distintas de null)
    return newBoard.every((square) => square !== null)
  }


  // Función para actualizar el tablero al hacer clic
  const updateBoard = (index) => {
    // No actualizamos la posición si ya está marcada o si ya hay un ganador (evitamos que se permita seguir jugando)
    if (board[index] || winner) return;

    const newBoard = [...board]; // Creamos una nueva versión del tablero, mantenemos los objetos INMUTABLES
    newBoard[index] = turn; // En la casilla donde se hizo clic guardamos el valor del turno actual (el que hizo clic)
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Cambiamos el turno
    setTurn(newTurn);

    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard); // le pasamos el newBoard ya que board puede no estar actualizado aún (el estado es ASÍNCRONO)
    if (newWinner) {
      // si hay un nuevo ganador
      confetti(); // Lanzamos confetti
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) { // si hay empate
        setWinner(false)
    }
  };


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((square, index) => {
          // Usamos el índice ya que es lo que vamos a renderizar (la posición)
          return (
            <Square
              key={index}
              index={index} // Consideramo el índice como id único ya que las posiciones nunca van a cambiar
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        // Si es diferente a null (estado inicial) significa que hay un ganador o un empate, hay que mostrarlo
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                    winner === false
                        ? 'Empate'
                        : 'Ganó: ' + winner
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Volver a empezar</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default Board;
