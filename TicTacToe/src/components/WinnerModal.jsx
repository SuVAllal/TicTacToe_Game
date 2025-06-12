export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null; // si no hay ganador no devuelve nada

  const esEmpate = winner === false;
  const winnerText = esEmpate ? "Empate" : "¡Ganó!";

  // Definir la clase según el ganador
  const winnerClass = winner === 'x' ? 'cat-winner' : winner === 'o' ? 'mouse-winner' : '';

  return (
    // Si es diferente a null (estado inicial) significa que hay un ganador o un empate, hay que mostrarlo
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">
            {esEmpate ? (
                <div className="empate">😅</div>
            ) : (
                <div className={winnerClass}></div>
            )}
        </header>

        <footer>
          <button onClick={resetGame}>Volver a empezar</button>
        </footer>
      </div>
    </section>
  );
}
