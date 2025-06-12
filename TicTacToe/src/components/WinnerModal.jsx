import Square from "./Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null; // si no hay ganador no devuelve nada

  const winnerText = winner === false ? "Empate" : "Ganó";

  return (
    // Si es diferente a null (estado inicial) significa que hay un ganador o un empate, hay que mostrarlo
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Volver a empezar</button>
        </footer>
      </div>
    </section>
  );
}
