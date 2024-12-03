import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { farmKpiData, parcels } from '../../data/businessPlanData';

export default function BusinessPlanOverview() {
  const currentYear = farmKpiData[farmKpiData.length - 1];
  const previousYear = farmKpiData[farmKpiData.length - 2];
  const totalArea = parcels.reduce((sum, parcel) => sum + parcel.area, 0);
  
  const getPercentageChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const metrics = [
    {
      label: 'Revenue per Ha',
      current: currentYear.revenue,
      previous: previousYear.revenue,
      format: (val: number) => `€${((val / totalArea) / 1000).toFixed(1)}k`
    },
    {
      label: 'Semi-Net Margin',
      current: currentYear.semiNetMargin,
      previous: previousYear.semiNetMargin,
      format: (val: number) => `${val}%`
    },
    {
      label: 'Biodiversity Score',
      current: currentYear.biodiversity,
      previous: previousYear.biodiversity,
      format: (val: number) => val.toFixed(1)
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Business Performance</h2>
          <p className="text-sm text-gray-500">Financial and sustainability metrics • {totalArea} ha</p>
        </div>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const change = getPercentageChange(metric.current, metric.previous);
          const isPositive = change > 0;
          return (
            <div key={metric.label} className="space-y-1">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.format(metric.current)}
                </p>
                <span className={`ml-2 flex items-center text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(change).toFixed(1)}%
                  {isPositive ? (
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 ml-1" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}