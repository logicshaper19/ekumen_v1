import { useNavigate } from 'react-router-dom';
import { Newspaper, TrendingUp, Calendar, Wrench, ShoppingCart, ClipboardCheck, Check, Plus, Settings, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t.dashboard.welcome}</h1>
        </div>

        {/* Latest News */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.dashboard.latestNews}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tools */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                {t.dashboard.newTools}
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Système d'irrigation intelligent</p>
                  <p className="text-sm text-gray-500 mt-1">Potentiel de réduction d'eau de 30% lors des essais</p>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <span className="text-xs text-gray-500">AgTech Review</span>
                    <span className="text-xs text-gray-500">Mar 18, 2024</span>
                  </div>
                  <button 
                    onClick={() => navigate('/news/smart-irrigation')}
                    className="text-xs text-black hover:underline flex items-center"
                  >
                    {t.common.actions.view}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Kit d'analyse des sols</p>
                  <p className="text-sm text-gray-500 mt-1">Surveillance des nutriments en temps réel avec capteurs IoT</p>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <span className="text-xs text-gray-500">FarmTech Today</span>
                    <span className="text-xs text-gray-500">Mar 15, 2024</span>
                  </div>
                  <button className="text-xs text-black hover:underline flex items-center">
                    {t.common.actions.view}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Market Trends */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                {t.dashboard.marketTrends}
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Prix du blé</p>
                  <p className="text-sm text-gray-500 mt-1">+5.2% d'augmentation sur les marchés européens</p>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <span className="text-xs text-gray-500">Euronext</span>
                    <span className="text-xs text-gray-500">Mar 20, 2024</span>
                  </div>
                  <button className="text-xs text-black hover:underline flex items-center">
                    {t.common.actions.view}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Contrats à terme sur le maïs</p>
                  <p className="text-sm text-gray-500 mt-1">Perspectives favorables pour le T3 selon les analystes</p>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <span className="text-xs text-gray-500">Reuters</span>
                    <span className="text-xs text-gray-500">Mar 19, 2024</span>
                  </div>
                  <button className="text-xs text-black hover:underline flex items-center">
                    {t.common.actions.view}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Regulatory News */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 flex items-center">
                <Newspaper className="h-4 w-4 mr-2" />
                {t.dashboard.regulatoryUpdates}
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Réforme de la PAC</p>
                  <p className="text-sm text-gray-500 mt-1">Nouveaux critères de durabilité proposés pour 2025</p>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <span className="text-xs text-gray-500">Commission Européenne</span>
                    <span className="text-xs text-gray-500">Mar 17, 2024</span>
                  </div>
                  <button className="text-xs text-black hover:underline flex items-center">
                    {t.common.actions.view}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Réglementation des pesticides</p>
                  <p className="text-sm text-gray-500 mt-1">Mise à jour des directives pour la certification bio</p>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <span className="text-xs text-gray-500">Ministère de l'Agriculture</span>
                    <span className="text-xs text-gray-500">Mar 16, 2024</span>
                  </div>
                  <button className="text-xs text-black hover:underline flex items-center">
                    {t.common.actions.view}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.dashboard.performanceBenchmark}</h2>
              <p className="text-sm text-gray-500 mt-1">{t.dashboard.howYouMeasureUp}</p>
            </div>
            <button className="text-sm text-black hover:underline flex items-center">
              {t.dashboard.viewDetailedAnalysis}
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">{t.dashboard.yourStrengths}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.strengths.precisionAgriculture.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.strengths.precisionAgriculture.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.strengths.precisionAgriculture.comparison}</p>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.strengths.soilHealth.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.strengths.soilHealth.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.strengths.soilHealth.comparison}</p>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.strengths.waterManagement.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.strengths.waterManagement.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.strengths.waterManagement.comparison}</p>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.strengths.cropRotation.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.strengths.cropRotation.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.strengths.cropRotation.comparison}</p>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.strengths.dataManagement.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.strengths.dataManagement.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.strengths.dataManagement.comparison}</p>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">{t.dashboard.improvementOpportunities}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.improvements.renewableEnergy.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.improvements.renewableEnergy.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.improvements.renewableEnergy.impact}</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.improvements.biodiversityZones.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.improvements.biodiversityZones.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.improvements.biodiversityZones.impact}</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.improvements.carbonCredits.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.improvements.carbonCredits.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.improvements.carbonCredits.impact}</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.improvements.agroforestry.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.improvements.agroforestry.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.improvements.agroforestry.impact}</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.dashboard.improvements.biogasProduction.title}</p>
                    <p className="text-xs text-gray-500">{t.dashboard.improvements.biogasProduction.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.dashboard.improvements.biogasProduction.impact}</p>
                  </div>
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Up */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t.dashboard.notifications}</h2>
            <button className="text-sm text-black hover:underline flex items-center">
              {t.dashboard.viewAll}
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {/* Maintenance Alert */}
            <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex-shrink-0">
                <Wrench className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-amber-900">{t.dashboard.alerts.maintenance.title}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {t.dashboard.alerts.maintenance.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-amber-700">{t.dashboard.alerts.maintenance.description}</p>
                <button className="mt-2 text-xs text-amber-900 hover:underline flex items-center">
                  {t.dashboard.alerts.maintenance.action}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Sales Alert */}
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-900">{t.dashboard.alerts.sales.title}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {t.dashboard.alerts.sales.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-blue-700">{t.dashboard.alerts.sales.description}</p>
                <button className="mt-2 text-xs text-blue-900 hover:underline flex items-center">
                  {t.dashboard.alerts.sales.action}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Audit Alert */}
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex-shrink-0">
                <ClipboardCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-900">{t.dashboard.alerts.audit.title}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t.dashboard.alerts.audit.date}
                  </span>
                </div>
                <p className="mt-1 text-sm text-green-700">{t.dashboard.alerts.audit.description}</p>
                <button className="mt-2 text-xs text-green-900 hover:underline flex items-center">
                  {t.dashboard.alerts.audit.action}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}