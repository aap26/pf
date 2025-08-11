import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const renderMessageWithLinks = (message: string) => {
  // Parse **text** (url) format into clickable links
  const linkPattern = /\*\*(.*?)\*\*\s*\((https?:\/\/[^\)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(message)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(message.slice(lastIndex, match.index));
    }
    
    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors"
      >
        {match[1]}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < message.length) {
    parts.push(message.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : [message];
};

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  const messageContent = renderMessageWithLinks(message);
  
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm",
          isUser
            ? "bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-md"
            : "bg-chat-bubble-assistant text-chat-bubble-assistant-foreground border rounded-bl-md"
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {messageContent}
        </div>
        {timestamp && (
          <div className="mt-1 text-xs opacity-60">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};