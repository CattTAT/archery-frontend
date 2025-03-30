import { Paper, Stack } from "@mui/material";
import ArrowChart from "../components/ArrowChart";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import TotalScoreChart from "../components/TotalScoreChart";

const Statistics = () => {
  return (
    <>
      <Header page="Statistics" hideBackButton />

      <Stack component={Paper} gap={2} py={1} px={2} borderRadius="10px">
        <TotalScoreChart />
        <ArrowChart />
      </Stack>
      <MenuBar />
    </>
  );
};

export default Statistics;
