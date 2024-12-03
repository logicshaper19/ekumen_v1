import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { KPIData } from '../data/transformationData';

interface ComparisonProps {
  baseline: KPIData[];
  optimized: KPIData[];
}

interface MetricConfig {
  key: keyof KPIData;
  label: string;
  unit: string;
  color: {
    baseline: string;
    optimized: string;
  };
}

const metrics: MetricConfig[] = [
  {
    key: 'ghgEmissions',
    label: 'Émissions GES',
    unit: 'tonnes CO2e/ha',
    color: { baseline: '#ff9999', optimized: '#66bb6a' }
  },
  {
    key: 'soilHealth',
    label: 'Santé du Sol',
    unit: 'index',
    color: { baseline: '#bf8040', optimized: '#8b4513' }
  },
  {
    key: 'soilQuality',
    label: 'Qualité du sol',
    unit: 'index',
    color: { baseline: '#d4a276', optimized: '#a0522d' }
  },
  {
    key: 'energyConsumption',
    label: "Consommation d'énergie",
    unit: 'kWh/ha',
    color: { baseline: '#ffd700', optimized: '#daa520' }
  },
  {
    key: 'biodiversity',
    label: 'Biodiversité',
    unit: 'index',
    color: { baseline: '#99ccff', optimized: '#3366cc' }
  },
  {
    key: 'waterUse',
    label: "Utilisation d'eau",
    unit: 'm³/ha',
    color: { baseline: '#80d4ff', optimized: '#0099cc' }
  },
  {
    key: 'profitability',
    label: 'Rentabilité',
    unit: '€/ha',
    color: { baseline: '#ffcc99', optimized: '#ff9933' }
  },
  {
    key: 'laborHours',
    label: 'Heures de Travail',
    unit: 'heures/ha',
    color: { baseline: '#cc99ff', optimized: '#9933ff' }
  },
  {
    key: 'inputCosts',
    label: 'Coûts des Intrants',
    unit: '€/ha',
    color: { baseline: '#ff99cc', optimized: '#ff3399' }
  },
  {
    key: 'yield',
    label: 'Rendement',
    unit: 'tonnes/ha',
    color: { baseline: '#99ff99', optimized: '#33cc33' }
  }
];

const TransformationComparison: React.FC<ComparisonProps> = ({
  baseline,
  optimized
}) => {
  const prepareChartData = (metric: keyof KPIData) => {
    return baseline.map((b, index) => ({
      year: b.year,
      baseline: b[metric],
      optimized: optimized[index][metric]
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {metrics.map((metric) => (
        <div key={metric.key} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">
            {metric.label} ({metric.unit})
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prepareChartData(metric.key)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year"
                  label={{ value: 'Année', position: 'insideBottom', offset: -5 }}
                  stroke="#666"
                />
                <YAxis 
                  label={{ 
                    value: metric.unit,
                    angle: -90,
                    position: 'insideLeft',
                    offset: 10
                  }}
                  stroke="#666"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{
                    paddingTop: '10px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                  formatter={(value) => {
                    return <span style={{ color: '#333', padding: '0 4px' }}>{value}</span>;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke={metric.color.baseline}
                  name="Rotation actuelle"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="optimized"
                  stroke={metric.color.optimized}
                  name="Rotation optimisée"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransformationComparison;
