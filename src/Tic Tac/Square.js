import "./Square.css"


const Square = ({value, handleClick, disabled}) => {

    return (
        <div className="SquareDiv" onClick={disabled ? handleClick: ()=>{}} >
            {value}
        </div>
    )
}

export default Square
