import { Button, Stack } from "@mui/material";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import { DEFAULT_RADIUS } from "../lib/constants";
import Advice from "../components/Advice";
import ScoreTable from "../components/ScoreTable";
import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";

const Scoresheets = () => {
  return (
    <>
      <Stack px={2.75} py={2} rowGap={3}>
        <Header title="Scoresheets" />
        <Stack p={2} gap={2} bgcolor="white" borderRadius={DEFAULT_RADIUS}>
          <Advice />
          <ScoreTable />
          <Stack direction="row" gap={2} width="100%">
            <OrangeButton startIcon={<DeleteOutlined />}>Delete</OrangeButton>
            <OrangeButton startIcon={<SaveOutlined />}>Save</OrangeButton>
          </Stack>
        </Stack>
      </Stack>
      <MenuBar />
    </>
  );
};

function OrangeButton(props) {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        bgcolor: "#FEAA4B",
        color: "black",
        fontSize: 24,
        borderRadius: DEFAULT_RADIUS,
        py: 1,
        px: 2,
        lineHeight: 1,
        textTransform: "none",
      }}
      {...props}
    />
  );
}

export default Scoresheets;
