import React from "react";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import { Button, Card, Grid2, Paper, Stack } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router";

const ScoresheetListPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: "10px",
}));

const ScoresheetsFilter = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: theme.palette.primary.main,
    fontSize: 20,
  },
  width: "50%",
}));

const scoresheetsDistances = ["18M", "30M", "50M", "70M"];
const scoresheets = [
  {
    id: 0,
    name: "Scoresheet 1",
    status: 0,
    date: "2021-10-10",
    distance: "18M",
    lastModified: "12/12/2024 18:45",
  },
  {
    id: 1,
    name: "Scoresheet 2",
    status: 1,
    date: "2021-10-10",
    distance: "18M",
    lastModified: "12/12/2024 18:45",
  },
];

const ControlButtons = styled(Button)(({ theme }) => ({
  color: "black",
  borderRadius: "50px",
  width: "100%",
}));

const ScoresheetCardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  borderRadius: "10px",
  backgroundColor: "#D8D8D8",
}));

const ScoresheetCard = ({ name, status, date, distance, lastModified }) => {
  return (
    <ScoresheetCardStyled>
      <Grid2
        container
        direction="row"
        justifyContent="space-between"
        columns={16}
        spacing={1}
      >
        <Grid2 item size={8}>
          <Typography variant="h6">{name}</Typography>
        </Grid2>
        <Grid2 item size={8}>
          {status ? (
            <Chip
              icon={<Icon icon="typcn:tick" />}
              label="Completed"
              color="success"
              sx={{ width: "100%" }}
            />
          ) : (
            <Chip
              icon={<Icon icon="grommet-icons:in-progress" />}
              label="In Progress"
              color="info"
              sx={{ width: "100%" }}
            />
          )}
        </Grid2>
        <Grid2 item size={8}>
          <Typography variant="subtitle1">
            {" "}
            <Icon icon="clarity:date-line" /> {date}
          </Typography>
        </Grid2>
        <Grid2 item size={8}>
          <Typography variant="subtitle1">
            {" "}
            <Icon icon="mingcute:target-fill" /> {distance}
          </Typography>
        </Grid2>
        <Grid2 item size={16}>
          <Typography variant="subtitle2">
            Last Modified: {lastModified}
          </Typography>
        </Grid2>
        <Grid2 item size={8}>
          <ControlButtons
            variant="contained"
            color="error"
            startIcon={<Icon icon="material-symbols:delete-outline" />}
          >
            Delete
          </ControlButtons>
        </Grid2>
        <Grid2 item size={8}>
          {status ? (
            <ControlButtons
              variant="contained"
              startIcon={<Icon icon="lets-icons:view" />}
            >
              View
            </ControlButtons>
          ) : (
            <ControlButtons
              variant="contained"
              startIcon={<Icon icon="material-symbols:edit-outline" />}
            >
              Edit
            </ControlButtons>
          )}
        </Grid2>
      </Grid2>
    </ScoresheetCardStyled>
  );
};

const Scoresheets = () => {
  const [dateFilter, setDateFilter] = React.useState("All Time");
  const [distanceFilter, setDistanceFilter] = React.useState("All Distances");

  return (
    <>
      <Header page="Scoresheets" />
      <ScoresheetListPaper square={false} elevation={3}>
        <Button
          variant="contained"
          startIcon={<Icon icon="material-symbols:add-rounded" />}
          component={NavLink}
          to="/new-scoresheet"
          sx={{
            color: "black",
            fontSize: 20,
            lineHeight: 1,
            padding: "8px",
          }}
        >
          New Scoresheet
        </Button>
        <Stack direction="row" spacing={2}>
          <ScoresheetsFilter
            select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            label="Date Modified"
          >
            <MenuItem value={"This Week"}>This Week</MenuItem>
            <MenuItem value={"This Month"}>This Month</MenuItem>
            <MenuItem value={"Last 3 Months"}>Last 3 Months</MenuItem>
            <MenuItem value={"This Year"}>This Year</MenuItem>
            <MenuItem value={"All Time"}>All Time</MenuItem>
          </ScoresheetsFilter>

          <ScoresheetsFilter
            select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            label="Distance"
          >
            {scoresheetsDistances.map((distance) => (
              <MenuItem key={distance} value={distance}>
                {distance}
              </MenuItem>
            ))}
            <MenuItem value={"All Distances"}>All Distances</MenuItem>
          </ScoresheetsFilter>
        </Stack>

        {scoresheets.map((scoresheet) => (
          <ScoresheetCard
            key={scoresheet.id}
            name={scoresheet.name}
            status={scoresheet.status}
            date={scoresheet.date}
            distance={scoresheet.distance}
            lastModified={scoresheet.lastModified}
          />
        ))}
      </ScoresheetListPaper>
      <MenuBar />
    </>
  );
};

export default Scoresheets;
