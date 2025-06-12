import '../css/Square.css'


function Square({ children, isSelected, updateBoard, index }) {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        if (updateBoard) updateBoard(index) // Le pasamos el índice para que sepa en qué casilla se hizo clic
    }

    return ( // Solo mostramos el div con clase si hay contenido
        <div onClick={handleClick} className={className}>
            {children && <div className={children}></div>}
        </div>
    )
}

export default Square;