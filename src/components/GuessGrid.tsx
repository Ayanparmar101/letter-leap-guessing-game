
import { motion } from "framer-motion";

interface GuessGridProps {
  guesses: string[];
  currentGuess: string;
  wordLength: number;
  targetWord: string;
}

const GuessGrid = ({ guesses, currentGuess, wordLength, targetWord }: GuessGridProps) => {
  const emptyRows = Array(6 - (guesses.length + 1)).fill('');
  
  return (
    <div className="grid gap-2 mb-8">
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-2 justify-center">
          {guess.split('').map((letter, j) => {
            const state = targetWord[j] === letter ? 'correct' : 
                         targetWord.includes(letter) ? 'wrong-position' : 'incorrect';
            const bgColor = state === 'correct' ? 'bg-green-500' : 
                          state === 'wrong-position' ? 'bg-yellow-500' : 'bg-red-400';
            
            return (
              <motion.div
                key={j}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-12 h-12 ${bgColor} flex items-center justify-center text-white font-bold text-2xl rounded`}
              >
                {letter}
              </motion.div>
            );
          })}
        </div>
      ))}
      
      {/* Current guess row */}
      <div className="flex gap-2 justify-center">
        {Array(wordLength).fill('').map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-12 h-12 border-2 border-purple-300 flex items-center justify-center text-purple-800 font-bold text-2xl rounded ${
              i < currentGuess.length ? 'bg-purple-100' : 'bg-white'
            }`}
          >
            {currentGuess[i] || ''}
          </motion.div>
        ))}
      </div>
      
      {/* Empty rows */}
      {emptyRows.map((_, i) => (
        <div key={i} className="flex gap-2 justify-center">
          {Array(wordLength).fill('').map((_, j) => (
            <div
              key={j}
              className="w-12 h-12 border-2 border-gray-200 rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GuessGrid;
