import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import instance from '../lib/api';
import { getScoreColor } from '../lib/utils';
import { Stack, Typography } from '@mui/material';

const ArrowChart = () => {
  const [data, setData] = useState([]);

  const getArrowData = async () => {
    const res = await instance.get("/arrows", {
      params: {
        archerId: localStorage.getItem("userId"),
      },
    });

    // group by score
    const grouped = res.data.reduce((acc, cur) => {
      if (acc.find((item) => item.score === cur.score)) {
        acc.find((item) => item.score === cur.score).count += 1;
      } else {
        acc.push({ score: cur.score, count: 1 });
      }
      return acc
    }, []).sort(sortByScore);

    setData(grouped);
  }

  // fetch arrow data
  useEffect(() => {
    getArrowData();
  }, [])

  return <Stack gap={2}>
    <Typography variant="h5">Arrow Score Distributions</Typography>
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="score" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count">
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Stack>
}


const order = ["X", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "M"];
function sortByScore(a, b) {
  return order.indexOf(a.score) - order.indexOf(b.score);
}

export default ArrowChart;
