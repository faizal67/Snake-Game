import { useState, useEffect } from 'react'
import Playground from './Playground'
import StartCard from './Cards/StartCard'
import EndCard from './Cards/EndCard'


const Button = ({ text, handler, style = '' }) => {
  return <button className={`text-white font-bold border-sky-400 border-2 p-2 ${style}`} onClick={handler}>{text}</button>
}



function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [gameStatus, setGameStatus] = useState(false)
  const [score, setScore] = useState(0);
  const [isPause, setPause] = useState(false);
  const pauseHandler = () => {
    setGameStatus(false)
    setPause(true)
  }

  const resumeHandler = () =>{
    setGameStatus(true)
    setPause(false)
  }
  const startHandler = () => {
    setGameStatus(true)
    setPause(false)
  }

  const endHandler = () => {
    setGameStatus(false)
  }

  const reStartHandler = () => {
    setScore(0);
    setPause(false)
    setGameStatus(true);
  }

  
  if(gameStatus == false && score == 0 && isPause == false)
  return  <StartCard  startHandler={startHandler} />
  else if(gameStatus == false && score != 0 && isPause == false)
    return <EndCard reStartHandler={reStartHandler} score={score} />
  else
  return (
    
    <div className='py-5 px-2'>
      <div className='border-8 border-green-200 overflow-hi'>
      <Playground gameStatus={gameStatus} endHandler={endHandler} setScore={setScore} isPause={isPause} score ={score} resumeHandler={resumeHandler} reStartHandler={reStartHandler}/>
      </div>
      
      <div className='flex flex-row justify-center content-center'>
          <Button text={'Pause'} handler={pauseHandler} style='mr-5'/>
        <div className='font-bold text-white text-4xl'>Score :{score}</div>
      </div>

    </div>
  )
}

export default App
