import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { MenuBar } from "../components/MenuBar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Header from "../components/Header";

const InformationForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
}));

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: "#D8D8D8",
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main + "!important",
    color: "white !important",
  },
}));

const Personal = ({ isRegistration }) => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("Male");
  const [eyeSight, setEyeSight] = React.useState("Left");
  const [bowType, setBowType] = React.useState("Recurve");
  const [level, setLevel] = React.useState("Novice");

  return (
    <>
      {isRegistration ? (
        <Header page="Registration" hideBackButton hidePersonalButton />
      ) : (
        <Header page="User Profile" hidePersonalButton />
      )}
      <InformationForm square={false} elevation={3}>
        <Grid container direction="column" spacing={2} height="100%">
          <Grid>
            <Typography variant="h4">Name:</Typography>
            <TextField
              id="name"
              type="text"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Typography variant="h4">Gender:</Typography>
            <ToggleButtonGroupStyled
              value={gender}
              exclusive
              onChange={(e) => setGender(e.target.value)}
              aria-label="gender"
            >
              <ToggleButton value="Male">Male</ToggleButton>
              <ToggleButton value="Female">Female</ToggleButton>
            </ToggleButtonGroupStyled>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Typography variant="h4">Eye Sight:</Typography>
            <ToggleButtonGroupStyled
              color="primary"
              value={eyeSight}
              exclusive
              onChange={(e) => setEyeSight(e.target.value)}
              aria-label="eyeSight"
            >
              <ToggleButton value="Left">Left</ToggleButton>
              <ToggleButton value="Right">Right</ToggleButton>
            </ToggleButtonGroupStyled>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Typography variant="h4">Bow Type:</Typography>
            <ToggleButtonGroupStyled
              color="primary"
              value={bowType}
              exclusive
              onChange={(e) => setBowType(e.target.value)}
              aria-label="bowType"
            >
              <ToggleButton value="Recurve">Recurve</ToggleButton>
              <ToggleButton value="Compound">Compound</ToggleButton>
            </ToggleButtonGroupStyled>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Typography variant="h4">Level:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              sx={{ flexGrow: 1 }}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <MenuItem value={"Novice"}>Novice</MenuItem>
              <MenuItem value={"Elementary"}>Elementary</MenuItem>
              <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
              <MenuItem value={"Advance"}>Advance</MenuItem>
            </Select>
          </Grid>

          <Button
            variant="contained"
            startIcon={<Icon icon="material-symbols:save-outline" />}
            sx={{
              mt: 8,
              color: "black",
              fontSize: 20,
              lineHeight: 1,
              padding: "8px",
            }}
          >
            Save
          </Button>
        </Grid>
      </InformationForm>
      {!isRegistration && <MenuBar />}
    </>
  );
};

export default Personal;
