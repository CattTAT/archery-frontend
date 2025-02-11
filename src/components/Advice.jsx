import { Box, Stack, styled } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { DEFAULT_RADIUS } from "../lib/constants";
import ScoreTable from "./ScoreTable";

const AdviceRoot = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    px: 2,
    p: 1,
    fontSize: 24,
    bgcolor: "#E0E0E0",
    color: "black",
    borderRadius: DEFAULT_RADIUS,
    border: 2,
    borderColor: "#FF9D00",
  }),
);

function Advice() {
  return (
    <AdviceRoot>
      <Box>
        <LightbulbOutlinedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Shooting Advice
      </Box>

      <ul style={{ listStyleType: "disc", marginBlock: 0 }}>
        <li>Adjust sight to the left</li>
        <li>Mind your forearm pushing power</li>
      </ul>
    </AdviceRoot>
  );
}

export default Advice;
