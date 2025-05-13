import '../css/Square.css'


function Square({ children, updateBoard, index }) {
    
    return (
        <div className="square">
            {children}
        </div>
    )
}

export default Square;