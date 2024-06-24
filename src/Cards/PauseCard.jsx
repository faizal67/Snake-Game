const PauseCard = ({resumeHandler, reStartHandler, score, setSnake}) => {

    const reStart = ()=> {
      setSnake([{ row: 0, col: 0 }, { row: 1, col: 1 }]);
      reStartHandler();
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg   w-96  h-56 bg-opacity-50">
          <h2 className="text-5xl font-bold mb-4 text-white">Snake Game</h2>
          <div className='text-2xl font-bold mb-4 text-white text-center'>Your Score : {score}</div>
          <div className='flex flex-row justify-between bg-white  bg-opacity-0 '>
          <button
            onClick={resumeHandler}
            className="px-4 py-2 bg-green-500 text-rgb(15 23 42) text-2xl bold rounded hover:bg-green-700 transition"
          >
            Resume
          </button>
          <button
            onClick={reStart}
            className="px-4 py-2 bg-green-500 text-rgb(15 23 42) text-2xl bold rounded hover:bg-green-700 transition"
          >
            Restart
          </button>
          </div>
        </div>
      </div>
    );
  }
export default PauseCard  