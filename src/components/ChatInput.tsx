import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  options: string[];
  onOptionSelect: (option: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ options, onOptionSelect, disabled }: ChatInputProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center">
        Choose an option to continue the conversation:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "h-auto py-3 px-4 text-left justify-start whitespace-normal transition-all duration-200",
              "hover:bg-primary hover:text-primary-foreground hover:border-primary",
              "hover:shadow-md hover:scale-[1.02]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
            onClick={() => onOptionSelect(option)}
            disabled={disabled}
          >
            <span className="text-sm leading-relaxed">{option}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};