import Square from "./Square";
import { useState } from "react";
import "../css/board.css";
import "../css/square.css";
import confetti from "canvas-confetti";
import { TURNS } from "../constants";
import { checkWinnerFrom, checkEndGame, saveGameToStorage, resetGameStorage } from "../logic/board";
import { WinnerModal } from "./WinnerModal";

function Board() {
  // Tablero
  const [board, setBoard] = useState(() => {
    // Leer del local storage es MUY LENTO, por eso leemos solo una vez dentro de la función,
    // si lo pusiéramos fuera de la función se ejecutaría en cada renderizado cuando no lo necesita
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : // cargamos la partida guardada
    Array(9).fill(null) // o el valor por defecto, el tablero vacío
  });
  // Estado para saber a quién le toca el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : // La partida guardada
    TURNS.X // Inicialmente empiezan las X
  });
  // Estado del ganador: null (no hay ganador) o false (hay empate)
  const [winner, setWinner] = useState(null);


  // Función para resetear el juego a su estado inicial
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }


  // Función para actualizar el tablero al hacer clic
  const updateBoard = (index) => {
    // No actualizamos la posición si ya está marcada o si ya hay un ganador (evitamos que se permita seguir jugando)
    if (board[index] || winner) return;

    const newBoard = [...board]; // Creamos una nueva versión del tablero, mantenemos los objetos INMUTABLES
    newBoard[index] = turn; // En la casilla donde se hizo clic guardamos el valor del turno actual (el que hizo clic)
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Cambiamos el turno
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard, 
      turn: newTurn
    })

    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard); // le pasamos el newBoard ya que board puede no estar actualizado aún (el estado es ASÍNCRONO)
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
      <h1>¡Gato VS Ratón!</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((square, index) => {
          // Usamos el índice ya que es lo que vamos a renderizar (la posición)
          return (
            <Square
              key={index}
              index={index} // Consideramos el índice como id único ya que las posiciones nunca van a cambiar
              updateBoard={updateBoard}
            >
              {square === TURNS.X ? "cat" : square === TURNS.O ? "mouse" : null}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>cat</Square>
        <Square isSelected={turn === TURNS.O}>mouse</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default Board;
