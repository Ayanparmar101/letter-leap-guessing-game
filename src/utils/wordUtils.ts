// Simple word list for different lengths
const wordLists: { [key: number]: string[] } = {
  4: [
    "hate", "love", "life", "code", "game", "play", "time", "word", "home", "data",
    "mind", "bold", "care", "dark", "east", "fire", "gain", "help", "idea", "jump",
    "king", "lamp", "moon", "note", "open", "park", "quit", "rain", "star", "tree",
    "rock", "wave", "wind", "wind", "cold", "hot", "soft", "hard", "fast", "slow", 
    "blue", "red", "gold", "wild", "calm", "pure", "rich", "poor", "wise", "kind",
    "hope", "free", "cute", "tall", "dark", "moon", "rose", "fire", "wolf", "bird",
    "cool", "epic", "calm", "wild", "bold", "true", "nice", "peak", "flow", "glow"
  ],
  5: [
    "happy", "laugh", "smile", "world", "dream", "peace", "music", "dance", "learn", "share",
    "adopt", "beach", "cloud", "drink", "earth", "flash", "grand", "heart", "ivory", "japan",
    "knife", "light", "magic", "noble", "ocean", "pixel", "queen", "river", "shine", "tiger",
    "steam", "burst", "spark", "gleam", "swirl", "chase", "drive", "bloom", "glide", "shine", 
    "prime", "elite", "lunar", "solar", "noble", "rapid", "sonic", "urban", "sonic", "viral",
    "brave", "quiet", "swift", "fierce", "calm", "clear", "sharp", "smart", "wild", "royal",
    "quick", "alive", "alert", "eager", "vivid", "prime", "lucid", "jolly", "sleek", "crisp"
  ],
  6: [
    "wonder", "divine", "create", "simple", "beauty", "nature", "spring", "summer", "winter", "autumn",
    "action", "bridge", "castle", "dragon", "energy", "forest", "golden", "harbor", "island", "jungle",
    "knight", "laptop", "marvel", "native", "orange", "planet", "rhythm", "silver", "sunset", "temple",
    "breath", "spirit", "wonder", "legend", "mystic", "radiant", "cosmic", "primal", "rhythm", "silent", 
    "wisdom", "sacred", "gentle", "fierce", "brave", "serene", "bright", "nimble", "smooth", "tender",
    "active", "global", "mighty", "lucent", "future", "vision", "spark", "prime", "rising", "beyond",
    "rocket", "unique", "classic", "modern", "bright", "silent", "clever", "gentle", "moment", "driven"
  ],
  7: [
    "amazing", "perfect", "harmony", "courage", "freedom", "journey", "mystery", "sunrise", "success", "wisdom",
    "achieve", "balance", "cascade", "diamond", "eclipse", "forever", "glowing", "horizon", "inspire", "justice",
    "kingdom", "legend", "miracle", "natural", "odyssey", "phoenix", "rainbow", "silence", "triumph", "victory",
    "harmony", "whisper", "dreamer", "serenity", "passion", "courage", "blossom", "radiance", "sublime", "infinite", 
    "sincere", "essence", "vivacity", "freedom", "primeval", "tranquil", "elegant", "vibrant", "dynamic", "pristine",
    "genuine", "evolved", "inspire", "crystal", "eternal", "patient", "gracious", "nimble", "valiant", "zenith",
    "explore", "imagine", "resolve", "marvel", "aspire", "wisdom", "unbound", "delight", "insight", "spirit"
  ],
  8: [
    "diameter", "manifest", "absolute", "graceful", "pleasant", "timeless", "eternity", "blessing", "gratitude", "serenity",
    "abundant", "beautiful", "celestial", "delicate", "emerald", "fantastic", "glorious", "harmonic", "infinite", "jubilant",
    "kindness", "luminous", "majestic", "nobility", "optimist", "precious", "radiance", "splendid", "twilight", "universe",
    "timeless", "celestial", "adventure", "brilliance", "wildflower", "illuminate", "spiraling", "dreamscape", "luminosity", "resonance", 
    "infinity", "ephemeral", "majestic", "tranquil", "radiance", "breathless", "integrity", "harmonize", "resilient", "sanctuary",
    "authentic", "passionate", "serendipity", "eloquence", "vibration", "evolution", "boundless", "spectacular", "tenacious", "watershed",
    "visionary", "ephemeral", "inspiring", "mystical", "harmonic", "resilient", "authentic", "delightful", "profound", "glimmering"
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
