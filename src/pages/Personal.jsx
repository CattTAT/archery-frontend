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
import instance from "../lib/api";
import AlertSnackbar from "../components/AlertSnackbar";
import { useNavigate } from "react-router";
import { v4 } from "uuid";

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
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("male");
  const [eyeSight, setEyeSight] = React.useState("left");
  const [bowType, setBowType] = React.useState("recurve");
  const [level, setLevel] = React.useState("novice");
  const [archer, setArcher] = React.useState({});

  const getUserProfile = async () => {
    const response = await instance.get("/archers/" + userId);
    const { data } = response;
    setArcher(data);
    setName(data.name);
    setGender(data.gender);
    setBowType(data.bow);
    setLevel(data.level);
    setEyeSight(data.eye);
  };

  useEffect(() => {
    if (!isRegistration) {
      getUserProfile();
    }
  }, []);

  return (
    <>
      {isRegistration ? (
        <Header page="Registration" hideBackButton hidePersonalButton />
      ) : (
        <Header page="User Profile" hidePersonalButton />
      )}
      <AlertSnackbar />

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
              <ToggleButton value="male">Male</ToggleButton>
              <ToggleButton value="female">Female</ToggleButton>
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
              <ToggleButton value="left">Left</ToggleButton>
              <ToggleButton value="right">Right</ToggleButton>
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
              disabled
            >
              <ToggleButton value="recurve">Recurve</ToggleButton>
              <ToggleButton value="compound">Compound</ToggleButton>
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
              <MenuItem value={"novice"}>Novice</MenuItem>
              <MenuItem value={"elementary"}>Elementary</MenuItem>
              <MenuItem value={"intermediate"}>Intermediate</MenuItem>
              <MenuItem value={"advance"}>Advance</MenuItem>
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
            onClick={async () => {
              localStorage.setItem("deviceId", v4());
              const body = {
                name,
                gender,
                eye: eyeSight,
                bow: bowType,
                level,
                device_id: localStorage.getItem("deviceId"),
              };
              if (isRegistration) {
                const newRegistration = await instance.post("archers", body);
                localStorage.setItem("userId", newRegistration.data.id);
                localStorage.setItem(
                  "alertMessage",
                  "Archer profile created successfully"
                );
                if (newRegistration.data.id) navigate("/home");
              } else {
                await instance.patch("archers/" + userId, body);
                localStorage.setItem(
                  "alertMessage",
                  "Archer profile updated successfully"
                );
                window.location.reload();
              }
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
