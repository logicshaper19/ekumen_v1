import { useState, useEffect } from 'react';
import { transformations } from '../../data/transformationData';
import { useTranslation } from '../../contexts/LanguageContext';
import { ArrowLeft, Calendar, Sparkles, TrendingUp, Droplets, Coins, Clock, CheckCircle, AlertCircle, Users, PlayCircle, ClipboardList, FileCheck } from 'lucide-react';
import RotationDetail from './RotationDetail';
import KPIComparison from './KPIComparison';
import AIAgent from '../AIAgent';
import PartnerSelectionModal from './PartnerSelectionModal';
import ErrorBoundary from '../ErrorBoundary';

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
  t: any;
}

function TransformationTable({ transformations, title, description, onSelect, onSharePlan, t }: TransformationTableProps) {
  if (!transformations) {
    return (
      <div className="bg-white p-6">
        <p className="text-gray-600">{t.transition.noTransformations}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                {title}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                {t.transition.sections.lastUpdate}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                {t.transition.sections.impact}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
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
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 break-words max-w-[300px]">
                      {transformation.title}
                    </div>
                    <div className="text-sm text-gray-500 break-words max-w-[300px] mt-1">
                      {transformation.objective}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="whitespace-normal">
                      {new Date(transformation.lastDiscussionDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="whitespace-normal">Rendement: +{Math.round(Math.random() * 20 + 10)}%</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <Droplets className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="whitespace-normal">Eau: -{Math.round(Math.random() * 15 + 10)}%</span>
                    </div>
                    <div className="flex items-center text-sm text-amber-600">
                      <Coins className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="whitespace-normal">Coût: -{Math.round(Math.random() * 10 + 5)}%</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect({ id: transformation.id, type: 'current' });
                    }}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    {t.common.actions.view}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TransformationDashboard() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  console.log('TransformationDashboard rendering', {
    transformations,
    t,
    activeTab
  });

  if (!t || !t.transition) {
    console.error('Missing translations:', t);
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600">Loading translations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!transformations) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Transformation Dashboard</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600">Loading transformation data...</p>
          </div>
        </div>
      </div>
    );
  }

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
          title: t.transition.sections.ongoingTitle,
          description: t.transition.sections.ongoingDescription
        };
      case 'review':
        return {
          transformations: underReviewTransformations,
          title: t.transition.sections.reviewTitle,
          description: t.transition.sections.reviewDescription
        };
      case 'consideration':
        return {
          transformations: considerationTransformations,
          title: t.transition.sections.considerationTitle,
          description: t.transition.sections.considerationDescription
        };
    }
  };

  const currentView = getCurrentTransformations();

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.transition.dashboardTitle}</h1>
            <p className="text-sm text-gray-600 mt-1">{t.transition.dashboardDescription}</p>
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
              {t.transition.actions.back}
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
            <nav className="flex flex-wrap gap-2" aria-label="Tabs">
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
                    } px-4 py-2 font-medium text-sm rounded-md inline-flex items-center space-x-2 min-w-[150px] justify-between`}
                  >
                    <span className="inline-flex items-center space-x-2 truncate">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{t.transition.tabs[tab.id]}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
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
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {selectedTransformation ? (
                <div className="p-6 space-y-6">
                  <RotationDetail
                    transformation={selectedTransformation}
                    showOptimization={showOptimization}
                    onRequestOptimization={() => setShowOptimization(true)}
                    t={t}
                  />
                  {showOptimization && (
                    <KPIComparison
                      baseline={selectedTransformation.kpiProjections.baseline}
                      optimized={selectedTransformation.kpiProjections.optimized}
                      t={t}
                    />
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <TransformationTable
                    transformations={currentView.transformations}
                    title={t.transition.sections[`${activeTab}Title`]}
                    description={t.transition.sections[`${activeTab}Description`]}
                    onSelect={setSelectedPlan}
                    onSharePlan={() => setShowPartnerModal(true)}
                    t={t}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="sticky top-6">
              <AIAgent context="transformation" data={selectedTransformation || currentView} />
            </div>
          </div>
        </div>
        
        {showPartnerModal && (
          <PartnerSelectionModal
            onClose={() => setShowPartnerModal(false)}
            onSubmit={(partners) => {
              console.log('Selected partners:', partners);
              setShowPartnerModal(false);
            }}
            t={t}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}