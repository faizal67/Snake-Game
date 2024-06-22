import { useState } from 'react'
import Playground from './Playground'


const Button = ({ text, handler, style = '' }) => {
  return <button className={`text-white font-bold border-sky-400 border-2 p-2 ${style}`} onClick={handler}>{text}</button>
}

const StartCard = ({  startHandler }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg   w-96  h-56 bg-opacity-50">
        <h2 className="text-5xl font-bold mb-4 text-white">Snake Game</h2>
        <button
          onClick={startHandler}
          className="px-4 py-2 bg-green-500 text-rgb(15 23 42) text-2xl bold rounded hover:bg-green-700 transition"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};


function App() {
  const [gameStatus, setGameStatus] = useState(false)
  const [score, setScore] = useState(0);
  const pauseHandler = () => {
    setGameStatus(false)
  }
  const startHandler = () => {
    setGameStatus(true)
  }

  const endHandler = () => {
    setGameStatus(false)
  }

  const reStartHandler = () => {
    setScore(0);
    setGameStatus(true);
  }
  if(gameStatus == false)
  return  <StartCard reStartHandler={reStartHandler} startHandler={startHandler} score={score} />
  return (
    
    <div className='m-5'>
      <Playground gameStatus={gameStatus} endHandler={endHandler} setScore={setScore} />
      <div className='flex flex-row justify-center content-center'>
        <div className='mr-5'>
          <Button text='Start' handler={startHandler} style='mr-5' />
          <Button text={'Pause'} handler={pauseHandler} />
        </div>
        <div className='font-bold text-white'>Score :{score}</div>
      </div>

    </div>
  )
}

export default App
