import { CropRotationOptimization } from '../../data/transformationData';
import { FileDown, Share2 } from 'lucide-react';

interface OptimizationViewProps {
  transformation: CropRotationOptimization;
}

export default function OptimizationView({ transformation }: OptimizationViewProps) {
  const handleShare = () => {
    if (transformation.shareUrl) {
      navigator.clipboard.writeText(`${window.location.origin}${transformation.shareUrl}`);
      alert('Share link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{transformation.title}</h2>
          <p className="text-sm text-gray-600">{transformation.objective}</p>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Current Rotation</h3>
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

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Optimized Rotation</h3>
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
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-500 mt-1">{transformation.notes}</p>
          </div>
          <a
            href={transformation.documentUrl}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileDown className="h-5 w-5 mr-2" />
            Download Plan
          </a>
        </div>
      </div>
    </div>
  );
}