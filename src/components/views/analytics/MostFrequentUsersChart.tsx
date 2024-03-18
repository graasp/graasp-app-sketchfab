import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { GENERAL_COLOR } from '../../../constants/style';
import ChartContainer from '../../common/ChartContainer';

interface ChartRecord {
  memberName: string;
  count: number;
}
interface Props {
  data: ChartRecord[];
}

const MostFrequentUsersChart = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <ChartContainer title={t('Top Frequent Users')}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="memberName" tick={{ fontSize: 14 }} />
        <YAxis tick={{ fontSize: 14 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={GENERAL_COLOR} />
      </BarChart>
    </ChartContainer>
  );
};

export default MostFrequentUsersChart;
