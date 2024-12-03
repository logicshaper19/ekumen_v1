import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCheck, AlertCircle, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { regulatoryDocuments } from '../../data/regulatoryData';
import AIAgent from '../AIAgent';

export default function RegulatoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const document = regulatoryDocuments.find(d => d.id === id);

  if (!document) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">Document not found</p>
        </div>
      </div>
    );
  }

  const missingRequirements = document.requirements.filter(r => !r.completed);
  const isOverdue = new Date(document.dueDate) < new Date();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/planning')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Work Bench
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Document Overview */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{document.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  document.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : document.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {document.status.replace('_', ' ')}
                </span>
                <div className="mt-2 text-sm text-gray-500">
                  Due: {new Date(document.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Completion Status</span>
                <span className="text-sm font-medium text-gray-900">{document.completionRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    document.completionRate === 100
                      ? 'bg-green-500'
                      : isOverdue
                      ? 'bg-red-500'
                      : 'bg-indigo-600'
                  }`}
                  style={{ width: `${document.completionRate}%` }}
                />
              </div>
            </div>

            {/* Requirements List */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Requirements</h2>
              <div className="space-y-3">
                {document.requirements.map((req) => (
                  <div
                    key={req.id}
                    className={`p-4 rounded-lg ${
                      req.completed ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {req.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{req.title}</p>
                        {req.description && (
                          <p className="mt-1 text-sm text-gray-500">{req.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Requirements */}
          {missingRequirements.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Missing Requirements</h2>
              <div className="space-y-4">
                {missingRequirements.map((req) => (
                  <div key={req.id} className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{req.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{req.description}</p>
                        {req.dataGaps && (
                          <div className="mt-4 space-y-3">
                            <p className="text-sm font-medium text-gray-900">Missing Information:</p>
                            {req.dataGaps.map((gap, index) => (
                              <div key={index} className="bg-white bg-opacity-50 p-3 rounded-md">
                                <p className="text-sm font-medium text-red-600">{gap.missing}</p>
                                <div className="mt-2 space-y-1">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Source:</span> {gap.source}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">How to obtain:</span> {gap.howToObtain}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <AIAgent context="regulatory" data={document} />
        </div>
      </div>
    </div>
  );
}