import { useEffect, useState } from "react";
import {
  getArrowsByScoresetId,
  getScoresetByScoresheetId,
  getScoresheetsByArcherId,
} from "../lib/api";
import { getRealScore } from "../lib/utils";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const TotalScoreChart = () => {
  const [sheetGroups, setSheetGroups] = useState([]);

  const getSheetGroups = async () => {
    // fetch score sets
    const sheets = await getScoresheetsByArcherId(
      localStorage.getItem("userId"),
    );

    for (const sheet of sheets) {
      sheet.roundTotals = [];

      for (let i = 1; i <= sheet.round; i++) {
        let roundTotal = 0;
        const sets = await getScoresetByScoresheetId(sheet.id, i);

        for (const set of sets) {
          const arrows = await getArrowsByScoresetId(set.id);

          roundTotal += arrows.reduce((acc, cur) => {
            return acc + getRealScore(cur.score);
          }, 0);
        }

        sheet.roundTotals.push(roundTotal);
      }
    }

    // group by distance and target face
    const groups = sheets.reduce((acc, cur) => {
      const { distance, target_face } = cur;
      const group = `${distance}|${target_face}`;

      if (acc.find((item) => item.group === group)) {
        acc.find((item) => item.group === group).scoresheets.push(cur);
      } else {
        acc.push({ group, scoresheets: [cur] });
      }
      return acc;
    }, []);

    setSheetGroups(groups);
  };

  useEffect(() => {
    getSheetGroups();
  }, []);

  return (
    <>
      {sheetGroups.map(({ group, scoresheets }, i) => {
        const [distance, targetFace] = group.split("|");
        const data =
          scoresheets?.flatMap((sheet) =>
            sheet.roundTotals.map((total) => ({
              name:
                new Date(sheet.created_at).toLocaleDateString() +
                " " +
                new Date(sheet.created_at).toLocaleTimeString(),
              total,
            })),
          ) ?? [];

        return (
          <>
            <Typography variant="h6" lineHeight={1}>
              Total Score Distribution <br /> ({distance}m, {targetFace})
            </Typography>
            <ResponsiveContainer
              key={i}
              width="100%"
              height="100%"
              minHeight={300}
            >
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 5,
                  left: -25,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 500]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        );
      })}
    </>
  );
};

export default TotalScoreChart;
