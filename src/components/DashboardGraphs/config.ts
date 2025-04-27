
import { ChartData } from './types';

export const CHART_MARGINS = {
  standard: { top: 20, right: 30, left: 20, bottom: 5 },
  withXAxis: { top: 20, right: 30, left: 20, bottom: 40 },
  withYAxis: { top: 20, right: 30, left: 100, bottom: 5 },
};

export const CHART_CONFIG = {
  barSize: 24,
  innerRadius: 60,
  outerRadius: 80,
  paddingAngle: 2,
};

export const formatChartData = (data: ChartData[]) => {
  return data.map(item => ({
    ...item,
    value: typeof item.value === 'number' ? item.value : 0,
  }));
};
