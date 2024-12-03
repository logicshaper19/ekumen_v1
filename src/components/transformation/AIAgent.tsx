import { useState } from 'react';
import { Bot, Send, Loader } from 'lucide-react';
import { waterOptimizationPlans } from '../../data/aiSuggestions';
import PartnerSelectionModal from './PartnerSelectionModal';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: typeof waterOptimizationPlans;
  isThinking?: boolean;
}

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I can help you optimize your farm operations. What would you like to improve?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof waterOptimizationPlans[0] | null>(null);

  const analyzeQuery = (query: string) => {
    if (query.toLowerCase().includes('water')) {
      return waterOptimizationPlans;
    }
    return [];
  };

  const handlePlanSelect = (plan: typeof waterOptimizationPlans[0]) => {
    setSelectedPlan(plan);
    const response: Message = {
      id: Date.now().toString(),
      content: `Here's a detailed analysis of the ${plan.title} plan:

• Expected Savings: ${plan.estimatedSavings}
• ROI Period: ${plan.roi}

Implementation Steps:
${plan.implementation.map(step => `• ${step}`).join('\n')} 

Would you like me to save this transformation plan for your consideration?`,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, response]);
  };

  const handleSaveTransformation = () => {
    const response: Message = {
      id: Date.now().toString(),
      content: `I've saved the ${selectedPlan?.title} plan to your transformations.
 
You can find it in the "Under Consideration" section of your Transformation dashboard where you can review and refine it further.`,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (input.toLowerCase() === 'yes' && selectedPlan) {
      handleSaveTransformation();
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
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
      const suggestions = analyzeQuery(input);
      
      // Remove thinking message and add response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isThinking);
        return [...filtered, {
          id: Date.now().toString(),
          content: suggestions.length > 0 
            ? "Based on your farm's profile, I've identified these potential solutions:"
            : "I couldn't find specific optimizations for that query. Could you provide more details about what you'd like to improve?",
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
          <h2 className="text-lg font-semibold text-gray-900">Farm Improvement Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
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
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </>
              )}
            </div>
            {message.suggestions && (
              <div className="mt-4 w-full space-y-3">
                {message.suggestions.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full text-left p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    <p className="text-sm font-medium text-indigo-900">{plan.title}</p>
                    <p className="text-sm text-indigo-700 mt-1">{plan.description}</p>
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
            placeholder="Ask about optimizations..."
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
      {showPartnerModal && (
        <PartnerSelectionModal
          onClose={() => setShowPartnerModal(false)}
          onSubmit={handlePartnerSubmit}
        />
      )}
    </div>
  );
}