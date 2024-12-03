import { useState, useEffect } from 'react';
import { transformations } from '../../data/transformationData';
import { useTranslation } from '../../contexts/LanguageContext';
import { ArrowLeft, Calendar, Sparkles, TrendingUp, Droplets, Coins, Clock, CheckCircle, AlertCircle, Users, PlayCircle, ClipboardList, FileCheck } from 'lucide-react';
import RotationDetail from './RotationDetail';
import KPIComparison from './KPIComparison';
import AIAgent from '../AIAgent';
import PartnerSelectionModal from './PartnerSelectionModal';

interface SelectedPlan {
  id: string;
  type: 'current' | 'optimized';
}

type TabType = 'ongoing' | 'review' | 'consideration';

interface TransformationTableProps {
  transformations: CropRotationOptimization[];
  title: string;
  description: string;
  onSelect: (plan: SelectedPlan) => void;
  onSharePlan: () => void;
}

function TransformationTable({ transformations, title, description, onSelect, onSharePlan }: TransformationTableProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t.transition.sections.ongoingTitle}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t.common.status.pending}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t.transition.sections.ongoingDescription}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t.common.actions.view}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transformations.map((transformation) => (
            <tr
              key={transformation.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect({ id: transformation.id, type: 'current' })}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {transformation.title}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {transformation.objective}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  Updated {new Date(transformation.lastDiscussionDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Rendement: +{Math.round(Math.random() * 20 + 10)}%</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Droplets className="h-4 w-4 mr-2" />
                    <span>Eau: -{Math.round(Math.random() * 15 + 10)}%</span>
                  </div>
                  <div className="flex items-center text-sm text-amber-600">
                    <Coins className="h-4 w-4 mr-2" />
                    <span>Coût: -{Math.round(Math.random() * 10 + 5)}%</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {transformation.partnerStatus ? (
                  <div className="flex items-center justify-end space-x-2">
                    {transformation.partnerStatus.status === 'rejected' ? (
                      <span className="inline-flex items-center text-red-700">
                        <AlertCircle className="h-4 w-4 mr-1" /> 
                        {t.common.status.inactive}
                      </span>
                    ) : transformation.partnerStatus.status === 'approved' ? (
                      <span className="inline-flex items-center text-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t.common.status.active}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-amber-700">
                        <Clock className="h-4 w-4 mr-1" />
                        {t.common.status.pending}
                      </span>
                    )}
                  </div>
                ) : title === "Under Consideration" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSharePlan();
                    }}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    {t.common.actions.share}
                  </button>
                ) : (
                <button
                  disabled={transformation.status === 'under_review'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect({ id: transformation.id, type: 'optimized' });
                  }}
                  className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full ${
                    transformation.status === 'under_review'
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                  }`}
                >
                  {transformation.status === 'under_review' ? (
                    t.common.status.pending
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      {t.common.actions.optimize}
                    </>
                  )}
                </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TransformationDashboard() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const ongoingTransformations = transformations.filter(
    t => t.status === 'approved' && !t.partnerStatus
  );

  const underReviewTransformations = transformations.filter(
    t => t.status === 'under_review' || t.status === 'rejected' || t.partnerStatus
  );

  const considerationTransformations = transformations.filter(
    t => !t.partnerStatus && t.status !== 'approved'
  );

  const selectedTransformation = selectedPlan?.id
    ? transformations.find(t => t.id === selectedPlan.id)
    : null;

  useEffect(() => {
    if (selectedPlan?.type === 'optimized') {
      setShowOptimization(true);
    }
  }, [selectedPlan]);

  const tabs = [
    { id: 'ongoing', label: 'Ongoing', icon: PlayCircle, count: ongoingTransformations.length },
    { id: 'review', label: 'Under Review', icon: ClipboardList, count: underReviewTransformations.length },
    { id: 'consideration', label: 'Consideration', icon: FileCheck, count: considerationTransformations.length }
  ];

  const getCurrentTransformations = () => {
    switch (activeTab) {
      case 'ongoing':
        return {
          transformations: ongoingTransformations,
          title: "Ongoing Transformations",
          description: "Active transformation plans being implemented"
        };
      case 'review':
        return {
          transformations: underReviewTransformations,
          title: "Under Review",
          description: "Plans under review or pending approval"
        };
      case 'consideration':
        return {
          transformations: considerationTransformations,
          title: "Under Consideration",
          description: "Plans being evaluated for potential implementation"
        };
    }
  };

  const currentView = getCurrentTransformations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.transition.title}</h1>
          <p className="text-sm text-gray-600 mt-1">{t.transition.description}</p>
        </div>
        {selectedTransformation && (
          <button
            onClick={() => {
              setSelectedPlan(null);
              setShowOptimization(false);
            }}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.common.actions.back}
          </button>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-gray-600">
          {t.transition.selectPlan}
        </p>
      </div>

      {!selectedTransformation && (
        <div className="mb-6">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 font-medium text-sm rounded-md inline-flex items-center`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {t.transition.tabs[tab.id]}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-indigo-200 text-indigo-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          {selectedTransformation ? (
            <div className="space-y-6">
              <RotationDetail
                transformation={selectedTransformation}
                showOptimization={showOptimization}
                onRequestOptimization={() => setShowOptimization(true)}
              />
              {showOptimization && (
                <KPIComparison
                  baseline={selectedTransformation.kpiProjections.baseline}
                  optimized={selectedTransformation.kpiProjections.optimized}
                />
              )}
            </div>
          ) : (
            <TransformationTable
              transformations={currentView.transformations}
              title={t.transition.sections[`${activeTab}Title`]}
              description={t.transition.sections[`${activeTab}Description`]}
              onSelect={setSelectedPlan}
              onSharePlan={() => setShowPartnerModal(true)}
            />
          )}
        </div>

        <div className="w-full lg:w-1/3 flex-shrink-0">
          <AIAgent context="transformation" data={selectedTransformation || currentView} />
        </div>
      </div>
      
      {showPartnerModal && (
        <PartnerSelectionModal
          onClose={() => setShowPartnerModal(false)}
          onSubmit={(partners) => {
            console.log('Selected partners:', partners);
            setShowPartnerModal(false);
          }}
        />
      )}
    </div>
  );
}