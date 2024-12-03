import { useState } from 'react';
import { farmKpiData, parcels } from '../../data/businessPlanData';
import { useTranslation } from '../../contexts/LanguageContext';
import KPIChart from './KPIChart';
import KPITrend from './KPITrend';
import ParcelSelector from './ParcelSelector';

export default function BusinessPlan() {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const { t } = useTranslation();

  const currentData = selectedParcelId
    ? parcels.find(p => p.id === selectedParcelId)?.kpiData || farmKpiData
    : farmKpiData;

  const viewTitle = selectedParcelId
    ? `${parcels.find(p => p.id === selectedParcelId)?.name} KPI Evolution`
    : t.businessPlan.kpiEvolution;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.businessPlan.title}</h1>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-600">{t.businessPlan.selectParcels}</p>
      </div>

      <ParcelSelector
        parcels={parcels}
        selectedParcelId={selectedParcelId}
        onParcelSelect={setSelectedParcelId}
      />
      
      {/* KPI Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPITrend
          data={currentData}
          dataKey="revenue"
          title={t.businessPlan.metrics.revenue}
          unit="€"
        />
        <KPITrend
          data={currentData}
          dataKey="semiNetMargin"
          title={t.businessPlan.metrics.semiNetMargin}
          unit="%"
        />
        <KPITrend
          data={currentData}
          dataKey="ghgEmissions"
          title={t.businessPlan.metrics.ghgEmissions}
          unit=" tCO₂/Ha"
        />
        <KPITrend
          data={currentData}
          dataKey="energyConsumption"
          title={t.businessPlan.metrics.energyConsumption}
          unit=" MJ/kg"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KPIChart
          data={currentData}
          dataKey="workingHours"
          title={t.businessPlan.metrics.workingHours}
          color="#2563eb"
          unit=" h/ha"
        />
        <KPIChart
          data={currentData}
          dataKey="biodiversity"
          title={t.businessPlan.metrics.biodiversityScore}
          color="#059669"
          unit=""
        />
        <KPIChart
          data={currentData}
          dataKey="soilQuality"
          title={t.businessPlan.metrics.soilQualityScore}
          color="#9333ea"
          unit=""
        />
        <KPIChart
          data={currentData}
          dataKey="nh3Emissions"
          title={t.businessPlan.metrics.nh3Emissions}
          color="#dc2626"
          unit=" kg/ha"
        />
        <KPIChart
          data={currentData}
          dataKey="nitrogenLeaching"
          title={t.businessPlan.metrics.nitrogenLeaching}
          color="#d97706"
          unit=" kg N/ha"
        />
      </div>
    </div>
  );
}