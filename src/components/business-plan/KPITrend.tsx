import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { YearlyKPI } from '../../data/businessPlanData';

interface KPITrendProps {
  data: YearlyKPI[];
  dataKey: keyof YearlyKPI;
  title: string;
  unit: string;
}

export default function KPITrend({ data, dataKey, title, unit }: KPITrendProps) {
  const currentValue = data[data.length - 1][dataKey] as number;
  const previousValue = data[data.length - 2][dataKey] as number;
  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = percentageChange > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {currentValue}{unit}
        </p>
        <p className={`ml-2 flex items-center text-sm ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {Math.abs(percentageChange).toFixed(1)}%
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 ml-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 ml-1" />
          )}
        </p>
      </div>
    </div>
  );
}