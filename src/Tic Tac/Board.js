import Square from "./Square";
import "./Board.css";
import {useState} from "react";


const Board = ({squares, setSquares, disable, setDisable, setRightAnswer}) => {
    const [obj, setObj] = useState({})

    const accessMovements = (squares) => {
        const movements = [];
        squares.forEach((square, i) => {
            !square && movements.push(i);
        });
        return movements;
    };

    const Empty = (squares) => {
        return squares.every((item) => !item);
    };

    const Full = (squares) => {
        return squares.every((item) => item);
    };


    const handleClick = (i) => {

        if (squares[i] !== "") return;

        const newSquares = [...squares];
        newSquares[i] = "X";

        setSquares(newSquares);

        if (isChecked(newSquares).victory === "X") {
            setRightAnswer("X winner")
            setDisable(false)
            return;
        }

        let randomNumber = minimax(newSquares, 0, false);
        if (newSquares[randomNumber] === "") {
            newSquares[randomNumber] = "O";
        }

        if (isChecked(newSquares).victory === "O") {
            setRightAnswer("0 winner")
            setDisable(false)
            return;
        }

        if (isChecked(newSquares).victory === "vochvoqi") {
            setRightAnswer("Draw")
            setDisable(false)
        }

    };


    const isChecked = (squares) => {
        if (Empty(squares)) return false;

        if (squares[0] === squares[1] && squares[0] === squares[2] && squares[0]) {
            return { victory: squares[0]};
        }
        if (squares[3] === squares[4] && squares[3] === squares[5] && squares[3]) {
            return { victory: squares[3]};
        }
        if (squares[6] === squares[7] && squares[6] === squares[8] && squares[6]) {
            return { victory: squares[6]};
        }

        if (squares[0] === squares[3] && squares[0] === squares[6] && squares[0]) {
            return { victory: squares[0]};
        }
        if (squares[1] === squares[4] && squares[1] === squares[7] && squares[1]) {
            return { victory: squares[1]};
        }
        if (squares[2] === squares[5] && squares[2] === squares[8] && squares[2]) {
            return { victory: squares[2]};
        }

        if (squares[0] === squares[4] && squares[0] === squares[8] && squares[0]) {
            return { victory: squares[0]};
        }
        if (squares[2] === squares[4] && squares[2] === squares[6] && squares[2]) {
            return { victory: squares[2]};
        }

        if (Full(squares)) {
            return { victory: "vochvoqi" };
        }

        return false;
    };


    const minimax = (newSquares, depth, isMaximizing) => {
            if (depth === 0) setObj({});

            if (isChecked(newSquares) || depth === -1) {
                if (isChecked(newSquares).victory === "X") {
                    return 10 - depth;
                } else if (isChecked(newSquares).victory === "O") {
                    return -10 + depth;
                }
                return 0;
            }
        if (isMaximizing) {
                let bestMax = -10;

                accessMovements(newSquares).forEach((i) => {
                    const copySquare = [...newSquares];
                    copySquare[i] = "X";

                    let score = minimax(copySquare, depth + 1, false);
                    bestMax = Math.max(bestMax, score);
                });

                return bestMax;
            }

            if (!isMaximizing) {
                let bestMax = 10;

                accessMovements(newSquares).forEach((i) => {
                    const copySquare = [...newSquares];
                    copySquare[i] = "O";

                    const score = minimax(copySquare, depth + 1, true);
                    bestMax = Math.min(bestMax, score);

                    if (depth === 0) {
                        obj[score] = obj[score] ? `${obj[score]},${i}` : i;
                    }
                });
                if (depth === 0) {
                    let returnValue;

                    if (typeof obj[bestMax] === "string") {
                        const arr = obj[bestMax].split(",");
                        const randomNumber = Math.floor(Math.random() * arr.length);
                        returnValue = arr[randomNumber];
                    } else {
                        returnValue = obj[bestMax];
                    }

                    return returnValue;
                }
                return bestMax;
            }
    }


    return (
        <div className="Board">
            {squares.map((square, i) => {
                return (
                    <Square
                        key={i}
                        value={square}
                        handleClick={() => handleClick(i)}
                        disabled={disable}
                    />
                );
            })}
        </div>
    )
}

export default Board




//
// let isStep = false
//
// while (!isStep) {
//     let randomNumber = Math.floor(Math.random() * 9)
//     if( accessMovements(newSquares).includes(randomNumber ) && accessMovements(newSquares).length !== 1) {
//         newSquares[randomNumber] = "O"
//         isStep = true
//         setSquares(newSquares)
//     }
//     if (accessMovements(newSquares).length === 0) {
//         setSquares(newSquares)
//         newSquares[i] = "X"
//         // resetGame()
//         break;
//     }
// }



