// Archer Level Promo Target

import { Fragment, useEffect, useState } from "react";
import {
  getArcher,
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
  ReferenceLine,
} from "recharts";
import { Stack, Typography } from "@mui/material";

const targets = {
  "male|18": 600,
  "female|18": 600,
  "male|30": 560,
  "female|30": 560,
  "male|50": 520,
  "female|50": 520,
  "female|60": 540,
  "male|70": 540,
  "female|70": 520,
};

const ArcherLevelChart = () => {
  const [archer, setArcher] = useState({});
  const [sheetGroups, setSheetGroups] = useState([]);

  const getArcherData = async () => {
    const archer = await getArcher(localStorage.getItem("userId"));
    setArcher(archer);
  };

  const getSheetGroups = async () => {
    const sheets = await getScoresheetsByArcherId(
      localStorage.getItem("userId"),
    );

    for (const sheet of sheets) {
      sheet.total = 0;

      for (let i = 1; i <= sheet.round; i++) {
        let roundTotal = 0;
        const sets = await getScoresetByScoresheetId(sheet.id, i);

        for (const set of sets) {
          const arrows = await getArrowsByScoresetId(set.id);

          roundTotal += arrows.reduce((acc, cur) => {
            return acc + getRealScore(cur.score);
          }, 0);
        }

        sheet.total += roundTotal;
      }
    }

    // group by distance
    const groups = sheets.reduce((acc, cur) => {
      const { distance } = cur;
      const existingGroup = acc.find((item) => item.distance === distance);

      if (existingGroup) {
        existingGroup.scoresheets.push(cur);
      } else {
        acc.push({ distance, scoresheets: [cur] });
      }
      return acc;
    }, []);

    setSheetGroups(groups);
  };

  useEffect(() => {
    getArcherData();
    getSheetGroups();
  }, []);

  return (
    <Stack gap={2}>
      {sheetGroups.map(({ distance, scoresheets }, i) => {
        const target = targets[`${archer.gender}|${distance}`];
        const data = scoresheets.map((sheet) => ({
          date:
            new Date(sheet.created_at).toLocaleDateString() +
            " " +
            new Date(sheet.created_at).toLocaleTimeString(),
          total: sheet.total,
        }));

        return (
          <Fragment key={i}>
            <Typography variant="h6">
              Level Promo Target ({distance}m)
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
                <XAxis dataKey="date" />
                <YAxis domain={[0, 1000]}/>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <ReferenceLine y={target} strokeDasharray="5 5" stroke="red" label={{ value: `Promo target (${target})`, position: 'insideTopRight' }} />
              </LineChart>
            </ResponsiveContainer>
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default ArcherLevelChart;
