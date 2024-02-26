import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartRecord {
  label: string;
  count: number;
}
interface Props {
  data: ChartRecord[];
}
const Chart = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        // width={500}
        // height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 4 }}
          name={t('Number of actions over time')}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
