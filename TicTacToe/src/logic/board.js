import { WINNER_COMBOS } from "../constants";

// Método para saber el ganador revisando todas las combinaciones ganadoras
export const checkWinnerFrom = (boardToCheck) => {
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

// Función para comprobar si hay empate en el tablero (se han hecho todos los movimientos y no hay ganador)
export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate si no hay más espacios vacíos en el tablero
  // (todas las posiciones son distintas de null)
  return newBoard.every((square) => square !== null);
};
