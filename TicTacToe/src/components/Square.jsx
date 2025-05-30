import '../css/Square.css'


function Square({ children, isSelected, updateBoard, index }) {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index) // Le pasamos el índice para que sepa en qué casilla se hizo clic
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

export default Square;