import { useState, useEffect } from 'react';
import { getRandomWord, checkGuess } from '../utils/wordUtils';
import WordLengthSelector from './WordLengthSelector';
import GuessGrid from './GuessGrid';
import Keyboard from './Keyboard';
import { useToast } from './ui/use-toast';

const WordGuesser = () => {
  const [wordLength, setWordLength] = useState(5);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<{[key: string]: 'correct' | 'wrong-position' | 'incorrect'}>({});
  const { toast } = useToast();

  useEffect(() => {
    startNewGame(wordLength);
  }, [wordLength]);

  const startNewGame = (length: number) => {
    console.log("Starting new game with length:", length);
    const newWord = getRandomWord(length);
    console.log("Target word:", newWord);
    setTargetWord(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setUsedLetters({});
    
    // Set the word length state
    setWordLength(length);
  };

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length !== wordLength) {
        toast({
          title: "Word too short",
          description: `Please enter a ${wordLength}-letter word`,
          variant: "destructive"
        });
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      // Update used letters
      const result = checkGuess(currentGuess, targetWord);
      const newUsedLetters = { ...usedLetters };
      currentGuess.split('').forEach((letter, i) => {
        const currentState = newUsedLetters[letter];
        const newState = result[i];
        if (!currentState || (currentState === 'incorrect' && newState !== 'incorrect')) {
          newUsedLetters[letter] = newState;
        }
      });
      setUsedLetters(newUsedLetters);

      if (currentGuess === targetWord) {
        setGameOver(true);
        toast({
          title: "Congratulations!",
          description: "You've won! Click the word length to start a new game.",
        });
      } else if (newGuesses.length >= 6) {
        setGameOver(true);
        toast({
          title: "Game Over",
          description: `The word was: ${targetWord}`,
          variant: "destructive"
        });
      }

      setCurrentGuess('');
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < wordLength && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      } else if (e.key === 'Enter' || e.key === 'Backspace') {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver, wordLength]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Word Guesser</h1>
        <WordLengthSelector onSelect={startNewGame} currentLength={wordLength} />
        <GuessGrid
          guesses={guesses}
          currentGuess={currentGuess}
          wordLength={wordLength}
          targetWord={targetWord}
        />
        <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />
      </div>
    </div>
  );
};

export default WordGuesser;
