
// Simple word list for different lengths
const wordLists: { [key: number]: string[] } = {
  4: ["hate", "love", "life", "code", "game", "play", "time", "word", "home", "data"],
  5: ["happy", "laugh", "smile", "world", "dream", "peace", "music", "dance", "learn", "share"],
  6: ["wonder", "divine", "create", "simple", "beauty", "nature", "spring", "summer", "winter", "autumn"],
  7: ["amazing", "perfect", "harmony", "courage", "freedom", "journey", "mystery", "sunrise", "success", "wisdom"],
  8: ["diameter", "manifest", "absolute", "graceful", "pleasant", "timeless", "eternity", "blessing", "gratitude", "serenity"]
};

export const getRandomWord = (length: number): string => {
  const words = wordLists[length] || wordLists[5];
  return words[Math.floor(Math.random() * words.length)];
};

export const checkGuess = (guess: string, target: string): ('correct' | 'wrong-position' | 'incorrect')[] => {
  const result: ('correct' | 'wrong-position' | 'incorrect')[] = new Array(guess.length).fill('incorrect');
  const targetChars = target.split('');
  
  // First pass: mark correct letters
  guess.split('').forEach((char, i) => {
    if (char === targetChars[i]) {
      result[i] = 'correct';
      targetChars[i] = '*';
    }
  });
  
  // Second pass: mark wrong positions
  guess.split('').forEach((char, i) => {
    if (result[i] !== 'correct') {
      const targetIndex = targetChars.indexOf(char);
      if (targetIndex !== -1) {
        result[i] = 'wrong-position';
        targetChars[targetIndex] = '*';
      }
    }
  });
  
  return result;
};
