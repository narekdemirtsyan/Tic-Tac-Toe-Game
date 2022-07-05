import Board from "./Tic Tac/Board";
import {useState} from "react";
import Answer from "./Tic Tac/Answer";
import './App.css';

function App() {
    const [squares, setSquares] = useState(["","","","","","","","",""])
    const [rightAnswer, setRightAnswer] = useState("")
    const [disable, setDisable] = useState(true)

    const restartGame = () => {
        setSquares(["","","","","","","","",""])
        setRightAnswer("")
        setDisable(true)
    }
    console.log(5)
  return (
    <div className="App">
        <h1>Tic tac toe Game</h1>
        <Board
            squares={squares}
            setSquares={setSquares}
            setRightAnswer={setRightAnswer}
            disable={disable}
            setDisable={setDisable}
            />
        <Answer rightAnswer={rightAnswer}/>
        <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}

export default App;
