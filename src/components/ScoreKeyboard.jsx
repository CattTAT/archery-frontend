import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { Button, Grid2, Stack, IconButton } from "@mui/material";
import { getScoreColor } from "./ScoreTable";
import { Icon } from "@iconify/react";

const ScoreKeyboard = forwardRef(({ visibility, targetFace }, ref) => {
  const Keyboard = styled(Grid2)(() => ({
    backgroundColor: "#D8D8D8",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    display: "flex",
    visibility: visibility ? "visible" : "hidden",
    zIndex: 10,
    height: "25%",
    boxShadow: "0px -2px 5px 0px #D8D8D8",
    padding: "8px",
  }));

  const ScoreButton = styled(Button)(({ theme }) => ({
    fontSize: "30px",
    borderRadius: 10,
    border: "1px solid #D8D8D8",
    maxHeight: "25%",
    maxWidth: "25%",
  }));

  const ControlButton = styled(Button)(({ theme }) => ({
    fontSize: "20px",
    borderRadius: 10,
    border: "1px solid #D8D8D8",
    color: "white",
    flexDirection: "column",
    backgroundColor: "#505050",
    width: "100%",
    lineHeight: "1",
    margin: 0,
    "& .MuiButton-startIcon": {
      margin: 0,
    },
    ".css-1sh91j5-MuiButton-startIcon>*:nth-of-type(1)": {
      fontSize: "30px",
    },
  }));

  return (
    <Keyboard container direction="row" className="score-keyboard" ref={ref}>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignContent="space-around"
        gap={0.5}
        width="70%"
      >
        {getTargetFaceScore(targetFace).map((score) => (
          <ScoreButton
            key={score}
            sx={{
              backgroundColor: getScoreColor(score),
              color: getScoreColor(score) === "black" ? "white" : "black",
            }}
          >
            {score}
          </ScoreButton>
        ))}
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-around"
        gap={1}
        width="30%"
        px={0.5}
      >
        <ControlButton
          startIcon={<Icon icon="material-symbols:backspace-outline" />}
        >
          Backspace
        </ControlButton>
        <IconButton
          sx={{
            width: "40% !important",
            backgroundColor: "#505050 !important",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Icon icon="ooui:previous-ltr" />
        </IconButton>
        <IconButton
          sx={{
            width: "40% !important",
            backgroundColor: "#505050 !important",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Icon icon="ooui:next-ltr" />
        </IconButton>
        <ControlButton
          startIcon={<Icon icon="material-symbols:keyboard-hide-outline" />}
        >
          Hide Keyboard
        </ControlButton>
      </Stack>
    </Keyboard>
  );
});

function getTargetFaceScore(targetFace) {
  if (targetFace.includes("10 Rings")) {
    return ["X", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, "M"];
  } else if (targetFace.includes("6 Rings")) {
    return ["X", 10, 9, 8, 7, 6, 5, "M"];
  } else if (targetFace.includes("5 Rings")) {
    return ["X", 10, 9, 8, 7, 6, "M"];
  }
}

ScoreKeyboard.displayName = "ScoreKeyboard";

export default ScoreKeyboard;
