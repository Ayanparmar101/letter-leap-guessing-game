
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface WordLengthSelectorProps {
  onSelect: (length: number) => void;
  currentLength: number;
}

const WordLengthSelector = ({ onSelect, currentLength }: WordLengthSelectorProps) => {
  // Track when the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: string) => {
    const length = parseInt(value);
    console.log("Word length selected:", length);
    onSelect(length);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Select Word Length</h2>
      <Select 
        value={currentLength.toString()} 
        onValueChange={handleValueChange}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="w-[180px] bg-white focus:ring-2 focus:ring-purple-500">
          <SelectValue placeholder="Select length" />
        </SelectTrigger>
        <SelectContent>
          {[4, 5, 6, 7, 8].map((length) => (
            <SelectItem 
              key={length} 
              value={length.toString()}
              className="cursor-pointer hover:bg-purple-100"
            >
              {length} characters
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WordLengthSelector;
