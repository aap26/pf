import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import DarkModeToggle from './DarkModeToggle';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your AI assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const chatOptions = [
  "Who are you?",
  "How far did you study?",
  "Any experience in Tech?",
  "Any interesting work?",
  "Any hobbies?",
  "May I contact you?",
  "Online Presence"
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionSelect = (option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Who are you?": "Hi! I'm Aashay — just a human who spends more time with code than sunlight. Glad you dropped by today!",
        "How far did you study?": "I recently wrapped up my Master's in Information Systems at Northeastern University, Boston.\n\nBefore that, I earned my Bachelor's in Electronics & Telecom from the University of Pune, India — and somewhere in between, I learned that caffeine and code are a great combo.",
        "Any experience in Tech?": "Yep! I've primarily worked as a Software Engineer, starting out as an intern and gradually leveling up with each role.\n\nAlong the way, I've built everything from websites to Android apps.\n\nI'm happiest when I'm turning ideas into something people can actually click, tap, or swipe.",
        "Any interesting work?": "Sure! A few of my favorites:\n\n**BookIt** (https://aap26.github.io/bookit/) – A ride-fare comparison app that lets you see Uber & Lyft prices side-by-side before booking.\n**NearBy** (https://aap26.github.io/nearby/) – A social map that shows who's around you in real-time.\n**TripMate** (https://aap26.github.io/tripmate/) – A trip planning tools.\n\nBasically… if it has a map, an API, and a fun challenge, I'm in.",
        "Any hobbies?": "Yea, I do. I love flying. For me its recreational.",
        "May I contact you?": "Definitely! \nEmail: aashaypawar@outlook.com \nCall: 617-238-4119\n\n**Coffee?** (https://www.google.com/maps/place/32+McGreevey+Way+c,+Mission+Hill,+MA+02120/@42.3346513,-71.097367,17z/data=!3m1!4b1!4m5!3m4!1s0x89e37a2757e0bd07:0x9bdb5f1886d718a8!8m2!3d42.3346513!4d-71.097367?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D)",
        "Online Presence": "**GeeksforGeeks** (https://auth.geeksforgeeks.org/user/aashaypawar)  \n**GitHub** (https://github.com/aap26)  \n**LeetCode** (https://leetcode.com/aashaypawar)  \n**HackerRank** (https://www.hackerrank.com/profile/aashay_pawar)  \n**Google Scholar** (https://scholar.google.com/citations?user=9UwnRSgAAAAJ&hl=en)"

      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[option] || "That's an interesting question! I'll do my best to help you with that.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
   <div className="flex flex-col h-screen bg-gradient-subtle">
  {/* Header */}
  <header className="bg-card border-b px-6 py-4 shadow-sm flex items-center justify-between">
    <h1
      className="text-xl italic text-foreground"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      Chat with me!
    </h1>
    <DarkModeToggle />
  </header>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-chat-bubble-assistant border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-chat-input-area border-t px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <ChatInput options={chatOptions} onOptionSelect={handleOptionSelect} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};
