const EndCard = ({reStartHandler, score}) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg   w-96  h-56 bg-opacity-50">
          <h2 className="text-5xl font-bold mb-4 text-white">Snake Game</h2>
          <h2 className="text-3xl font-bold mb-4 text-white">Game Over</h2>
          <div className='text-2xl font-bold mb-4 text-white text-center'>Your Score : {score}</div>
          <button
            onClick={reStartHandler}
            className="px-4 py-2 bg-green-500 text-rgb(15 23 42) text-2xl bold rounded hover:bg-green-700 transition"
          >
            Restart Game
          </button>
          
        </div>
      </div>
    );
  }
export default EndCard