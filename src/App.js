import Die from "./Die";
import { useState, useEffect } from "react"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenziz, setTenziz] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenziz(true)
      console.log("You Won!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 1; i <= 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (tenziz) {
      setDice(allNewDice())
      setTenziz(false)
    }
    else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
  }

  function handleHold(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const diceElements = dice.map(die => <Die
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    handleHold={() => handleHold(die.id)}
  />)

  return (
    <div className="App">
      <main>
        {tenziz && <Confetti />}
        <h1 className="title">Tenziz</h1>
        <p className="instructions">Roll until dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button type="button" className="dice-roll-button" onClick={rollDice}>{tenziz ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
