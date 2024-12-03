import { YearlyKPI } from '../../data/businessPlanData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface KPIComparisonProps {
  baseline: YearlyKPI[];
  optimized: YearlyKPI[];
}

interface KPIMetric {
  key: keyof YearlyKPI;
  label: string;
  unit: string;
  color: string;
}

const metrics: KPIMetric[] = [
  { key: 'ghgEmissions', label: 'GHG Emissions', unit: 't CO₂/Ha', color: '#ef4444' },
  { key: 'energyConsumption', label: 'Energy Consumption', unit: 'MJ/kg', color: '#f97316' },
  { key: 'biodiversity', label: 'Biodiversity', unit: '', color: '#22c55e' },
  { key: 'soilQuality', label: 'Soil Quality', unit: '', color: '#8b5cf6' }
];

export default function KPIComparison({ baseline, optimized }: KPIComparisonProps) {
  const prepareChartData = (metric: keyof YearlyKPI) => {
    return baseline.map((b, index) => ({
      year: b.year,
      baseline: b[metric],
      optimized: optimized[index][metric]
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">KPI Evolution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div key={metric.key} className="h-64">
            <h3 className="text-sm font-medium text-gray-500 mb-3">{metric.label}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prepareChartData(metric.key)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis unit={metric.unit} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#9ca3af"
                  name="Current"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="optimized"
                  stroke={metric.color}
                  name="Optimized"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}