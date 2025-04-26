
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WordLengthSelectorProps {
  onSelect: (length: number) => void;
  currentLength: number;
}

const WordLengthSelector = ({ onSelect, currentLength }: WordLengthSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Select Word Length</h2>
      <Select value={currentLength.toString()} onValueChange={(value) => onSelect(parseInt(value))}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select length" />
        </SelectTrigger>
        <SelectContent>
          {[4, 5, 6, 7, 8].map((length) => (
            <SelectItem key={length} value={length.toString()}>
              {length} characters
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WordLengthSelector;
