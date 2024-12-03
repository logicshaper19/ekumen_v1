import { useState } from 'react';
import { Bot, Send, Loader } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { 
  AIContext, 
  AIContextData,
  ParcelContext,
  CropContext,
  TransformationContext,
  TaskContext,
  RegulatoryContext
} from '../types/aiTypes';
import { knowledgeBase } from '../data/aiKnowledgeBase';

interface AIAgentProps {
  context: AIContext;
  data: AIContextData;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isThinking?: boolean;
}

// Type guards
function isParcelContext(data: AIContextData): data is { type: 'parcel'; data: ParcelContext } {
  return data.type === 'parcel';
}

function isCropContext(data: AIContextData): data is { type: 'crop'; data: CropContext } {
  return data.type === 'crop';
}

function isTransformationContext(data: AIContextData): data is { type: 'transformation'; data: TransformationContext } {
  return data.type === 'transformation';
}

function isTaskContext(data: AIContextData): data is { type: 'task'; data: TaskContext } {
  return data.type === 'task';
}

function isRegulatoryContext(data: AIContextData): data is { type: 'regulatory'; data: RegulatoryContext } {
  return data.type === 'regulatory';
}

export default function AIAgent({ context, data }: AIAgentProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: getInitialMessage(context, data),
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  function getInitialMessage(context: AIContext, data: AIContextData): string {
    const message = t.workBench.assistant.contextMessages[context];
    
    switch (context) {
      case 'parcel':
        if (isParcelContext(data)) {
          return message.replace('%s', data.data.name) + 
            ` La parcelle fait ${data.data.area} hectares avec un sol de type ${data.data.soilType}.`;
        }
        break;
      case 'crop':
        if (isCropContext(data)) {
          return message.replace('%s', data.data.name) +
            ` Variété: ${data.data.variety}, Période de plantation: ${data.data.plantingPeriod.start} à ${data.data.plantingPeriod.end}.`;
        }
        break;
      case 'transformation':
        if (isTransformationContext(data)) {
          return message.replace('%s', data.data.title) +
            ` Objectif principal: ${data.data.objective}`;
        }
        break;
      case 'task':
        if (isTaskContext(data)) {
          return message +
            ` Priorité: ${data.data.priority}, Échéance: ${data.data.dueDate}`;
        }
        break;
      case 'regulatory':
        if (isRegulatoryContext(data)) {
          const nextDeadline = data.data.requirements
            .filter((r: { status: string; deadline: string }) => r.status !== 'compliant')
            .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0]?.deadline;
          return message +
            ` Score de conformité actuel: ${data.data.compliance.score}%. Prochaine échéance: ${nextDeadline || 'aucune'}`;
        }
        break;
    }
    return message;
  }

  function generateResponse(context: AIContext, data: AIContextData): string {
    switch (context) {
      case 'parcel': {
        if (!isParcelContext(data)) return defaultResponse();
        const { soilHealth } = data.data;
        const kb = knowledgeBase.parcel;
        let recommendations: string[] = [];

        if (soilHealth.ph < kb.soilHealth.ph.optimal.min) {
          recommendations.push(...kb.soilHealth.ph.recommendations.low);
        } else if (soilHealth.ph > kb.soilHealth.ph.optimal.max) {
          recommendations.push(...kb.soilHealth.ph.recommendations.high);
        }

        if (soilHealth.organicMatter < kb.soilHealth.organicMatter.optimal.min) {
          recommendations.push(...kb.soilHealth.organicMatter.recommendations);
        }

        return `Analyse de la parcelle ${data.data.name}:
- pH du sol: ${soilHealth.ph} (optimal: ${kb.soilHealth.ph.optimal.min}-${kb.soilHealth.ph.optimal.max})
- Matière organique: ${soilHealth.organicMatter}% (optimal: ${kb.soilHealth.organicMatter.optimal.min}-${kb.soilHealth.organicMatter.optimal.max}%)

Recommandations:
${recommendations.map(r => `- ${r}`).join('\n')}`;
      }

      case 'transformation': {
        if (!isTransformationContext(data)) return defaultResponse();
        const { currentState, targetState, timeline } = data.data;
        const currentPhase = timeline.find(p => p.activities.some(a => !a.includes('completed')));

        return `Plan de transformation "${data.data.title}":
État actuel:
${currentState.practices.map(p => `- ${p}`).join('\n')}

Objectifs:
${targetState.practices.map(p => `- ${p}`).join('\n')}

Phase actuelle: ${currentPhase?.phase || 'Planification'}
Prochaines étapes:
${currentPhase?.activities.map(a => `- ${a}`).join('\n') || 'À définir'}

Impacts attendus:
${data.data.impacts.environmental.map(i => `- ${i}`).join('\n')}`;
      }

      default:
        return defaultResponse();
    }
  }

  function defaultResponse(): string {
    return "Je comprends votre question. Laissez-moi analyser les données et vous fournir une réponse détaillée...";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: t.workBench.assistant.thinking,
      sender: 'ai',
      timestamp: new Date(),
      isThinking: true
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => {
        const messages = prev.filter(m => m.id !== thinkingMessage.id);
        return [...messages, {
          id: Date.now().toString(),
          content: generateResponse(context, data),
          sender: 'ai',
          timestamp: new Date()
        }];
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bot className="h-6 w-6 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">{t.workBench.assistant.title}</h2>
      </div>

      <div className="space-y-4 mb-4 h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.isThinking ? (
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>{message.content}</span>
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.workBench.assistant.placeholder}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Send className="h-4 w-4 mr-2" />
          {t.workBench.assistant.send}
        </button>
      </form>
    </div>
  );
}