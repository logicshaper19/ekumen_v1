import { useState } from 'react';
import { Send, Bot, Loader, FileText } from 'lucide-react';
import { auditReportSuggestions, documentOrganizationSuggestions } from '../../data/documentSuggestions';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isThinking?: boolean;
  suggestions?: typeof auditReportSuggestions;
}

interface AIChatProps {
  activeTab: 'my-docs' | 'shared' | 'audit';
}

export default function AIChat({ activeTab }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: getInitialMessage(activeTab),
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  function getInitialMessage(tab: 'my-docs' | 'shared' | 'audit') {
    switch (tab) {
      case 'my-docs':
        return "I can help you organize and analyze your farm documents. What would you like to know?";
      case 'shared':
        return "I can help you manage shared documents and partner collaborations. What do you need?";
      case 'audit':
        return "I can assist with audit report preparation and compliance documentation. How can I help?";
      default:
        return "How can I assist you today?";
    }
  }

  function getPlaceholder(tab: 'my-docs' | 'shared' | 'audit') {
    switch (tab) {
      case 'my-docs':
        return "Ask about document organization...";
      case 'shared':
        return "Ask about partner documents...";
      case 'audit':
        return "Ask about report preparation...";
      default:
        return "Type your message...";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Add thinking message
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Analyzing your request...",
      sender: 'ai',
      timestamp: new Date(),
      isThinking: true
    };
    setMessages(prev => [...prev, thinkingMessage]);

    // Simulate analysis and response
    setTimeout(() => {
      let suggestions = [];
      if (activeTab === 'audit' && input.toLowerCase().includes('report')) {
        suggestions = auditReportSuggestions;
      } else if (activeTab === 'my-docs' && input.toLowerCase().includes('organize')) {
        suggestions = documentOrganizationSuggestions;
      }
      
      // Remove thinking message and add response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isThinking);
        return [...filtered, {
          id: Date.now().toString(),
          content: suggestions.length > 0 
            ? "Here are some suggestions based on your request:"
            : "I'll help you with that. What specific information do you need?",
          sender: 'ai',
          timestamp: new Date(),
          suggestions: suggestions.length > 0 ? suggestions : undefined
        }];
      });
    }, 2000);
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-[calc(100vh-12rem)]">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Farm Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.isThinking ? (
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span className="text-sm">{message.content}</span>
                </div>
              ) : (
                <>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </>
              )}
            </div>
            {message.suggestions && (
              <div className="mt-4 w-full space-y-3">
                {message.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    className="w-full text-left p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-indigo-600 mr-2" />
                      <p className="text-sm font-medium text-indigo-900">{suggestion.title}</p>
                    </div>
                    <p className="text-sm text-indigo-700 mt-1">{suggestion.description}</p>
                    <div className="mt-2 space-y-1">
                      {suggestion.steps.map((step, index) => (
                        <p key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-5 text-indigo-600">{index + 1}.</span>
                          {step}
                        </p>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder(activeTab)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}