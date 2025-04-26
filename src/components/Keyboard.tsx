
import { Keyboard as KeyboardIcon } from "lucide-react";

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: {
    [key: string]: 'correct' | 'wrong-position' | 'incorrect' | undefined;
  };
}

const Keyboard = ({ onKeyPress, usedLetters }: KeyboardProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map((key) => {
            const state = usedLetters[key.toLowerCase()];
            const bgColor = state === 'correct' ? 'bg-green-500' :
                          state === 'wrong-position' ? 'bg-yellow-500' :
                          state === 'incorrect' ? 'bg-gray-400' : 'bg-purple-100';
            
            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`${bgColor} ${key.length > 1 ? 'px-4' : 'px-2'} py-4 rounded font-semibold text-sm transition-colors hover:opacity-90
                  ${state ? 'text-white' : 'text-purple-800'}`}
              >
                {key === 'Backspace' ? (
                  <KeyboardIcon size={20} className="mx-auto" />
                ) : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
