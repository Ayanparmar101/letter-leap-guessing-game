// Simple word list for different lengths
const wordLists: { [key: number]: string[] } = {
  4: [
    "hate", "love", "life", "code", "game", "play", "time", "word", "home", "data",
    "mind", "bold", "care", "dark", "east", "fire", "gain", "help", "idea", "jump",
    "king", "lamp", "moon", "note", "open", "park", "quit", "rain", "star", "tree"
  ],
  5: [
    "happy", "laugh", "smile", "world", "dream", "peace", "music", "dance", "learn", "share",
    "adopt", "beach", "cloud", "drink", "earth", "flash", "grand", "heart", "ivory", "japan",
    "knife", "light", "magic", "noble", "ocean", "pixel", "queen", "river", "shine", "tiger"
  ],
  6: [
    "wonder", "divine", "create", "simple", "beauty", "nature", "spring", "summer", "winter", "autumn",
    "action", "bridge", "castle", "dragon", "energy", "forest", "golden", "harbor", "island", "jungle",
    "knight", "laptop", "marvel", "native", "orange", "planet", "rhythm", "silver", "sunset", "temple"
  ],
  7: [
    "amazing", "perfect", "harmony", "courage", "freedom", "journey", "mystery", "sunrise", "success", "wisdom",
    "achieve", "balance", "cascade", "diamond", "eclipse", "forever", "glowing", "horizon", "inspire", "justice",
    "kingdom", "legend", "miracle", "natural", "odyssey", "phoenix", "rainbow", "silence", "triumph", "victory"
  ],
  8: [
    "diameter", "manifest", "absolute", "graceful", "pleasant", "timeless", "eternity", "blessing", "gratitude", "serenity",
    "abundant", "beautiful", "celestial", "delicate", "emerald", "fantastic", "glorious", "harmonic", "infinite", "jubilant",
    "kindness", "luminous", "majestic", "nobility", "optimist", "precious", "radiance", "splendid", "twilight", "universe"
  ]
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
