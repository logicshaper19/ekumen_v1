import { CropRotationOptimization } from '../../data/transformationData';
import { FileDown, MessageCircle, Sparkles } from 'lucide-react';

interface RotationDetailProps {
  transformation: CropRotationOptimization;
  showOptimization: boolean;
  onRequestOptimization: () => void;
  t: any;
}

export default function RotationDetail({ 
  transformation, 
  showOptimization,
  onRequestOptimization,
  t
}: RotationDetailProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{transformation.title}</h2>
          <p className="text-sm text-gray-600">{transformation.objective}</p>
        </div>
        {!showOptimization && (
          <button
            onClick={onRequestOptimization}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t.transition.actions.optimize}
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              {t.transition.comparison.baseline}
            </h3>
            <div className="space-y-2">
              {transformation.currentRotation.map((rotation) => (
                <div key={rotation.year} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{rotation.year}</span>
                  <div className="text-sm text-gray-600">
                    {rotation.crop}
                    {rotation.yield && ` (${rotation.yield} t/ha)`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showOptimization && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                {t.transition.comparison.optimized}
              </h3>
              <div className="space-y-2">
                {transformation.optimizedRotation.map((rotation) => (
                  <div key={rotation.year} className="flex justify-between items-center p-2 bg-indigo-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">{rotation.year}</span>
                    <div className="text-sm text-indigo-600">
                      {rotation.crop}
                      {rotation.projectedYield && ` (${rotation.projectedYield} t/ha)`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-500 mt-1">{transformation.notes}</p>
          </div>
          <div className="flex space-x-3">
            <a
              href={transformation.documentUrl}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Télécharger le plan
            </a>
            <button
              onClick={() => {/* Add chat functionality */}}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Voir la discussion
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}