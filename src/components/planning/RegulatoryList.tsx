import { useState } from 'react';
import { FileCheck, AlertCircle, Calendar, ChevronRight } from 'lucide-react';
import { RegulatoryDocument } from '../../data/regulatoryData';
import { useNavigate } from 'react-router-dom';
import AIAgent from '../AIAgent';

interface RegulatoryListProps {
  documents: RegulatoryDocument[];
}

export default function RegulatoryList({ documents }: RegulatoryListProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental':
        return 'text-green-600';
      case 'safety':
        return 'text-red-600';
      case 'certification':
        return 'text-blue-600';
      case 'financial':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredDocuments = documents.filter(doc => 
    filter === 'all' || doc.status === filter
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Documents réglementaires</h2>
        <div className="flex justify-between items-center mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="all">Tous les documents</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            onClick={() => navigate(`/planning/regulatory/${doc.id}`)}
            className="p-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileCheck className={`h-5 w-5 ${getCategoryColor(doc.category)}`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-500">{doc.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                doc.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : doc.status === 'en_cours'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {doc.status === 'completed' ? 'Terminé' :
                 doc.status === 'in_progress' ? 'En cours' :
                 'En attente'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Échéance: {new Date(doc.dueDate).toLocaleDateString('fr-FR')}
                </div>
                {doc.completionRate < 100 && new Date(doc.dueDate) < new Date() && (
                  <div className="flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    En retard
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-sm font-medium text-gray-900">
                    {doc.completionRate}% Complété
                  </div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-indigo-600 rounded-full"
                      style={{ width: `${doc.completionRate}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
      <div className="lg:col-span-1">
        <AIAgent 
          context="regulatory" 
          data={{ documents: filteredDocuments, filter }}
        />
      </div>
    </div>
  );
}