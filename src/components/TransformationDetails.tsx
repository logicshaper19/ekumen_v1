import React from 'react';
import { CropRotationOptimization } from '../data/transformationData';
import TransformationComparison from './TransformationComparison';

interface TransformationDetailsProps {
  transformation: CropRotationOptimization;
}

const TransformationDetails: React.FC<TransformationDetailsProps> = ({
  transformation
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{transformation.title}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Objectif</h3>
            <p className="text-gray-700">{transformation.objective}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-gray-700">{transformation.notes}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Rotation Actuelle</h3>
            <div className="bg-gray-50 p-4 rounded">
              {transformation.currentRotation.map((rotation, index) => (
                <div key={index} className="mb-2">
                  <span className="font-medium">{rotation.year}: </span>
                  <span>{rotation.crop}</span>
                  {rotation.yield && (
                    <span className="text-gray-600"> ({rotation.yield} t/ha)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Rotation Optimisée</h3>
            <div className="bg-gray-50 p-4 rounded">
              {transformation.optimizedRotation.map((rotation, index) => (
                <div key={index} className="mb-2">
                  <span className="font-medium">{rotation.year}: </span>
                  <span>{rotation.crop}</span>
                  {rotation.projectedYield && (
                    <span className="text-gray-600">
                      ({rotation.projectedYield} t/ha)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Comparaison des indicateurs clés
          </h3>
          <TransformationComparison
            baseline={transformation.kpiProjections.baseline}
            optimized={transformation.kpiProjections.optimized}
          />
        </div>

        {transformation.partnerStatus && (
          <div className="bg-gray-50 p-4 rounded mt-6">
            <h3 className="text-lg font-semibold mb-2">Statut du Partenaire</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium">Partenaire: </span>
                  {transformation.partnerStatus.partner}
                </p>
                <p>
                  <span className="font-medium">Organisation: </span>
                  {transformation.partnerStatus.organization}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Statut: </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      transformation.partnerStatus.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : transformation.partnerStatus.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transformation.partnerStatus.status === 'approved'
                      ? 'Approuvé'
                      : transformation.partnerStatus.status === 'rejected'
                      ? 'Rejeté'
                      : 'En attente'}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Dernière mise à jour: </span>
                  {new Date(
                    transformation.partnerStatus.lastUpdate
                  ).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            {transformation.partnerStatus.feedback && (
              <div className="mt-4">
                <p className="font-medium">Commentaires:</p>
                <p className="text-gray-700">
                  {transformation.partnerStatus.feedback}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransformationDetails;
