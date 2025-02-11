import { Stack } from "@mui/material";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import { DEFAULT_RADIUS } from "../lib/constants";
import Advice from "../components/Advice";
import ScoreTable from "../components/ScoreTable";

const Scoresheets = () => {
  return (
    <>
      <Stack px={2.75} py={2} rowGap={3}>
        <Header title="Scoresheets" />
        <Stack p={2} gap={2} bgcolor="white" borderRadius={DEFAULT_RADIUS}>
          <Advice />
          <ScoreTable />
        </Stack>
      </Stack>
      <MenuBar />
    </>
  );
};

export default Scoresheets;
