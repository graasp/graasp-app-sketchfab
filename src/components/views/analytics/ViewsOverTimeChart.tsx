import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AVERAGE_COLOR, GENERAL_COLOR } from '../../../constants/style';
import ChartContainer from '../../common/ChartContainer';

interface ChartRecord {
  label: string;
  count: number;
}
interface Props {
  data: ChartRecord[];
}

const ViewsOverTimeChart = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <ChartContainer title={t('Model Views over Time')}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="label" tick={{ fontSize: 14 }} />
        <YAxis tick={{ fontSize: 14 }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke={GENERAL_COLOR}
          activeDot={{ r: 6 }}
          strokeWidth={3}
        />
        <Line
          dataKey="averageCount"
          name={t('AVERAGE_COUNT')}
          stroke={AVERAGE_COLOR}
          activeDot={{ r: 6 }}
          strokeWidth={3}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ViewsOverTimeChart;
