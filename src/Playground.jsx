import { useState, useEffect } from 'react';
import PauseCard from './Cards/PauseCard';

const numRows = 20; // Number of rows 15
const numCols = 47; // Number of columns 34

const initialFood = { row: Math.floor(Math.random() * numRows), col: Math.floor(Math.random() * numCols) };
const initialBlocks = new Array(numRows).fill(null).map(() => new Array(numCols).fill({ type: 'grass' }));


const Playground = ({ gameStatus, score, setScore, endHandler, isPause, resumeHandler, reStartHandler }) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [food, setFood] = useState(initialFood);
  const [snake, setSnake] = useState([{ row: 0, col: 0 }, { row: 1, col: 1 }]);
  const [currDir, setCurrDir] = useState('right');

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchX, setTouchX] = useState(null);
  const [touchY, setTouchY] = useState(null);



  const newFood = () => {
    setFood({ row: Math.floor(Math.random() * numRows), col: Math.floor(Math.random() * numCols) })
  }
  //control direction
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (currDir === 'up' || currDir === 'down')
            setCurrDir('left');
          break;
        case 'ArrowRight':
          if (currDir === 'up' || currDir === 'down')
            setCurrDir('right');
          break;
        case 'ArrowUp':
          if (currDir === 'left' || currDir === 'right')
            setCurrDir('up');
          break;
        case 'ArrowDown':
          if (currDir === 'left' || currDir === 'right')
            setCurrDir('down');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currDir]);


  
  // Handle touch start
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  // Handle touch move
  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setTouchX(touch.clientX);
    setTouchY(touch.clientY);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX && touchStartY && touchX && touchY) {
      const deltaX = touchX - touchStartX;
      const deltaY = touchY - touchStartY;

      // Determine the predominant direction of movement
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement
        if (deltaX > 0) setCurrDir('right');
        else setCurrDir('left');
      } else {
        // Vertical movement
        if (deltaY > 0) setCurrDir('down');
        else setCurrDir('up');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);


  // movement
  useEffect(() => {
    if (gameStatus === false)
      return
    const intervalId = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        let newHead = { ...newSnake[0] }; // Create a copy of the current head

        // Update the coordinates of the new head based on currDir
        switch (currDir) {
          case 'left':
            newHead.col = newHead.col > 0 ? newHead.col - 1 : numCols - 1; // Wrap around to the rightmost column if at left boundary
            break;
          case 'right':
            newHead.col = newHead.col < numCols - 1 ? newHead.col + 1 : 0; // Wrap around to the leftmost column if at right boundary
            break;
          case 'up':
            newHead.row = newHead.row > 0 ? newHead.row - 1 : numRows - 1; // Wrap around to the bottom row if at top boundary
            break;
          case 'down':
            newHead.row = newHead.row < numRows - 1 ? newHead.row + 1 : 0; // Wrap around to the top row if at bottom boundary
            break;
          default:
            break;
        }

        // Update the rest of the snake's body segments
        for (let i = newSnake.length - 1; i > 0; i--) {
          newSnake[i] = { ...newSnake[i - 1] };
        }
        newSnake[0] = newHead; // Assign the updated head to the first segment

        return newSnake;
      });
    }, 200); // Interval time set to 500 milliseconds for slower animation

    return () => clearInterval(intervalId);
  }, [currDir, gameStatus]);

  useEffect(() => {
    const snakeHead = { ...snake[0] }
    if (food.row === snakeHead.row && food.col === snakeHead.col) {
      setScore(prev => prev + 1)
      const newHead = food;
      newFood()
      setSnake((prevSnake) => [...prevSnake, newHead]);
    }
    snake.forEach((part) => {
      if (part != snake[0] && part != snake[snake.length - 1] && part.row === snakeHead.row && part.col === snakeHead.col)
        endHandler();
    })
  }, [snake, food])


  //control frame and block
  useEffect(() => {
    const updatedBlocks = initialBlocks.map((row, rowIndex) =>
      row.map((block, colIndex) => {
        let updatedBlock = { ...block }; // Create a copy of the original block
        if (food.row === rowIndex && food.col === colIndex) {
          updatedBlock.type = 'food';
        }
        snake.forEach((part) => {
          if (part.row === rowIndex && part.col === colIndex) {
            updatedBlock.type = 'snake';
          }
        });
        const snakeHead = { ...snake[0] }
        if(snakeHead.row === rowIndex && snakeHead.col === colIndex)
          updatedBlock.type = 'snakeHead'
        return updatedBlock;
      })
    );
    setBlocks(updatedBlocks);
  }, [snake, food]);



  return (
    <div className='grid grid-flow-row '>
      {isPause == true && <PauseCard resumeHandler={resumeHandler} reStartHandler={reStartHandler} score={score} setSnake={setSnake} />}
      {blocks.map((row, rowIndex) => (
        <div key={rowIndex} className='grid grid-flow-col '>
          {row.map((block, colIndex) => (
            block.type === 'snakeHead' ? (
              <div key={`${rowIndex}-${colIndex}`} className='w-8 h-8 bg-green-800'>
                <div className='w-8 h-8 rounded-full bg-red-800 z-10 text-3xl shadow-md  '></div>
              </div>
              
            ) : block.type === 'snake' ? (
              <div key={`${rowIndex}-${colIndex}`} className='w-8 h-8 bg-green-800'>
                <div className='w-8 h-8 rounded-full bg-red-400 z-10 text-3xl shadow-md '></div>
              </div>
            ) : block.type === 'food' ? (
              <div key={`${rowIndex}-${colIndex}`} className='w-8 h-8 bg-green-800'>
                <div className='w-8 h-8 rounded-full bg-yellow-300 z-10 text-3xl'></div>
              </div>
            ) : (
              <div key={`${rowIndex}-${colIndex}`} className='w-8 h-8 bg-green-800'></div>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

export default Playground;


// {/* <span
//   key={`${rowIndex}-${colIndex}`}
//   className={`w-8 h-8 ${block.type === 'snake' ? 'bg-red-400' : block.type === 'food' ? 'bg-orange-400' : block.type === 'snakeHead' ? 'bg-red-800 border-4 border-red-600' : 'bg-green-800'} transition-colors  duration-300 ease-in-out `}
// >
//   {/* Displaying coordinates for debugging */}
//   {/* {rowIndex}-{colIndex} */}
// </span> */}
