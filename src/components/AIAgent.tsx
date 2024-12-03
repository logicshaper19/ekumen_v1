import { useState } from 'react';
import { Bot, Send, Loader } from 'lucide-react';

interface AIAgentProps {
  context: 'parcel' | 'crop' | 'transformation' | 'task' | 'regulatory';
  data: any;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isThinking?: boolean;
}

export default function AIAgent({ context, data }: AIAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: getInitialMessage(context, data),
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  function getInitialMessage(context: string, data: any) {
    switch (context) {
      case 'parcel':
        return `I can help optimize ${data.name}. Ask about soil health, irrigation needs, or crop recommendations based on current conditions.`;
      case 'crop':
        return `I can help maximize your ${data.name} yield. Ask about optimal growing conditions, pest management, or market trends.`;
      case 'transformation':
        return `I can help evaluate this transformation plan. Ask about potential impacts, implementation steps, or optimization opportunities.`;
      case 'task':
        return `I can help manage farm tasks efficiently. Ask about task prioritization, resource allocation, or best practices.`;
      case 'regulatory':
        return `I can help with regulatory compliance and documentation. Ask about requirements, deadlines, or missing information.`;
      default:
        return "How can I assist you today?";
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

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isThinking);
        return [...filtered, {
          id: Date.now().toString(),
          content: generateResponse(input, context, data),
          sender: 'ai',
          timestamp: new Date()
        }];
      });
    }, 1500);
  };

  function generateResponse(input: string, context: string, data: any) {
    const lowercaseInput = input.toLowerCase();
    
    if (context === 'parcel') {
      if (lowercaseInput.includes('soil')) {
        return `The soil in ${data.name} is ${data.soilData.type} with a pH of ${data.soilData.ph}. The organic matter content is ${data.soilData.organicMatter}%.`;
      } else if (lowercaseInput.includes('crop') || lowercaseInput.includes('plant')) {
        const currentCrop = data.cropRotation[data.cropRotation.length - 1];
        return `Currently growing ${currentCrop.crop} with an expected yield of ${currentCrop.yield || 'TBD'} t/ha. Based on soil conditions and rotation history, recommended next crops are wheat or barley.`;
      } else if (lowercaseInput.includes('irrigation')) {
        return `This parcel uses a ${data.irrigation.type} irrigation system, maintained on ${new Date(data.irrigation.lastMaintenance).toLocaleDateString()}. The current schedule is ${data.irrigation.schedule}.`;
      }
    } else if (context === 'crop') {
      if (lowercaseInput.includes('pest') || lowercaseInput.includes('disease')) {
        return `For ${data.name}, common pest management strategies include crop rotation, biological control, and targeted pesticide application when necessary. Monitor regularly for early detection.`;
      } else if (lowercaseInput.includes('yield') || lowercaseInput.includes('production')) {
        return `To optimize ${data.name} yield, focus on proper spacing, timely irrigation, and nutrient management. Current average yield is ${data.parcels[0]?.expectedYield || 0} t/ha.`;
      }
    } else if (context === 'transformation') {
      if (lowercaseInput.includes('impact') || lowercaseInput.includes('effect')) {
        return `This transformation plan aims to ${data.objective}. Expected impacts include improved soil health, reduced input costs, and potential yield increases.`;
      } else if (lowercaseInput.includes('implement') || lowercaseInput.includes('start')) {
        return `Implementation should begin with soil testing and baseline measurements. Key steps include adjusting irrigation systems, introducing new crop varieties, and monitoring progress.`;
      }
    } else if (context === 'task') {
      if (lowercaseInput.includes('priority') || lowercaseInput.includes('urgent')) {
        return `Based on current conditions and timing, focus on soil preparation and planting tasks first. Weather forecasts suggest optimal conditions in the next week.`;
      } else if (lowercaseInput.includes('schedule') || lowercaseInput.includes('when')) {
        return `Consider scheduling intensive tasks during moderate weather conditions. Group similar tasks together for efficiency.`;
      }
    } else if (context === 'regulatory') {
      if (lowercaseInput.includes('deadline') || lowercaseInput.includes('due')) {
        const upcomingDocs = data.documents.filter(d => new Date(d.dueDate) > new Date());
        return `The next deadline is for ${upcomingDocs[0]?.title} due on ${new Date(upcomingDocs[0]?.dueDate).toLocaleDateString()}. Focus on completing the missing requirements to meet compliance standards.`;
      } else if (lowercaseInput.includes('missing') || lowercaseInput.includes('incomplete')) {
        const incomplete = data.documents.filter(d => d.completionRate < 100);
        return `For ${incomplete[0]?.title}, you still need to complete: ${incomplete[0]?.requirements.filter(r => !r.completed).map(r => r.title).join(', ')}.`;
      }
    }
    
    return `I understand you're asking about ${input}. To provide better guidance, could you specify what aspect of ${context} you'd like to know more about?`;
  }

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-[calc(100vh-12rem)]">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Assistant agricole</h2>
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
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez vos questions sur les optimisations..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}