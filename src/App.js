
import Die from './Die';
import React from 'react';
import { nanoid } from "nanoid"

function App() {


  const [die, setDie] = React.useState(generateGame())
  const [gameover, setGameOver] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  //const [highscore, setHighScore] = React.useState(0)
  

  const [highscore, setHighScore] = React.useState(JSON.parse(localStorage.getItem("highscore")) || 0)
  React.useEffect(() => {
    localStorage.setItem("highscore", JSON.stringify(highscore))
  }, [highscore])
  

  React.useEffect( function() {

    //Checks if the game has been Won
    //Runs this every time the die get rerolled
    const compareNumber = die[0].number
    let isSame = true
    let i = 0
    while (isSame && i < die.length) {
      if (compareNumber === die[i].number)
        isSame = true
      else
        isSame = false;
      i++;
    }
    setGameOver(isSame) 
  }, [die])

  function generateGame() {
    const dieArray = []
    
    for (let i = 0; i < 10; i++) {
      const dieObject = {
        id: nanoid(),
        number: Math.floor((Math.random() * 6) + 1),
        //number: 4,
        isLocked: false
      }
      dieArray.push(dieObject)
    }

    return dieArray
  }
  function newGame() {
    setDie(generateGame())
    setGameOver(false)
    if(highscore === 0)
      setHighScore(rolls)     
    if(rolls < highscore)
      setHighScore(rolls)
    setRolls(0)
  }

  function toggleLocked(id) {
    setDie( prevArray => {
      return prevArray.map((die) => {
        return die.id === id ? {...die, isLocked:!die.isLocked} : die
      })
    })
  }
  function reroll() {
    setDie(prevArray => {
      return prevArray.map(die => {
        return die.isLocked ? die : { ...die, number: Math.floor((Math.random() * 6) + 1)}
      })
    })

    setRolls(prevRolls => prevRolls + 1)
    
  }
  
  const dieData = die.map(die => {
    return <Die
      className="die{$die.id}"
      key={die.id}
      id = {die.id}
      number={die.number}
      isLocked={die.isLocked}
      toggleLocked={toggleLocked}
    />
  }) 

  return (
    <div className='background'>
      <div className="tenziesContainer">
        <h1 className='title'>Tenzies</h1>
        <h2 className='instructions'> Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
        <div className='diceContainer'>
          {dieData}
        </div>
        <button
          className='rollbutton'
          onClick={gameover ? newGame : reroll}
        >
          {gameover ? "Play Again" : "Reroll"}
        </button> 
      </div>
      <div className='rolls'>
        <h2>
          Rolls: {rolls}
        </h2>
        <h2>
          HighScore: {highscore}
        </h2>
      </div>
    </div>
  );
}

export default App;
