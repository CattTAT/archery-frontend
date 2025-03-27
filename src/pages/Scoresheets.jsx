import React, { useEffect } from "react";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import {
  Button,
  Card,
  Grid2,
  Paper,
  Stack,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  MenuItem,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router";
import instance from "../lib/api";
import AlertSnackbar from "../components/AlertSnackbar";
import ConfirmDialog from "../components/ConfirmDialog";

const ScoresheetListPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: "10px",
}));

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

const ScoresheetCard = ({ id, name, status, date, distance, lastModified }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
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
            onClick={() => setOpenConfirmDialog(true)}
          >
            Delete
          </ControlButtons>
        </Grid2>
        <Grid2 item size={8}>
          {status ? (
            <ControlButtons
              variant="contained"
              startIcon={<Icon icon="lets-icons:view" />}
              component={NavLink}
              to={`/scoresheet/${id}`}
            >
              View
            </ControlButtons>
          ) : (
            <ControlButtons
              variant="contained"
              startIcon={<Icon icon="material-symbols:edit-outline" />}
              component={NavLink}
              to={`/scoresheet/${id}`}
            >
              Edit
            </ControlButtons>
          )}
        </Grid2>
      </Grid2>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={async () => {
          try {
            const response = await instance.get("/scoreset/all", {
              params: {
                scoresheetId: id,
              },
            });

            for (const scoreset of response.data) {
              const arrows = await instance.get("/arrows", {
                params: {
                  scoresetId: scoreset.id,
                },
              });

              for (const arrow of arrows.data) {
                await instance.delete(`/arrows/${arrow.id}`);
              }

              await instance.delete(`/scoreset/${scoreset.id}`);
            }

            await instance.delete(`/scoresheets/${id}`);

            localStorage.setItem(
              "alertMessage",
              "Scoresheet deleted successfully"
            );
            window.location.reload();
          } catch (error) {
            console.error("Error deleting scoresheet:", error);
            localStorage.setItem("alertMessage", "Failed to delete scoresheet");
            window.location.reload();
          }
        }}
        title="Delete Scoresheet"
        content="Are you sure you want to delete this scoresheet?"
      />
    </ScoresheetCardStyled>
  );
};

const Scoresheets = () => {
  const userId = localStorage.getItem("userId");
  const [scoresheetsList, setScoresheetsList] = React.useState([]);
  const [scoresheetsDistances, setScoresheetsDistances] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState([0, 1]);
  const [distanceFilter, setDistanceFilter] = React.useState([]);

  const getScoresheetsDistances = async () => {
    const data = await instance.get("/scoresheets/distances", {
      params: {
        archerId: userId,
      },
    });
    if (data.data.length === 0) return;
    setScoresheetsDistances(
      data.data.map((distance) => distance.distance + "M")
    );
    setDistanceFilter(data.data.map((distance) => distance.distance + "M"));
  };

  const getScoresheets = async () => {
    const data = await instance.get("/scoresheets", {
      params: {
        archerId: userId,
        distance: distanceFilter.map((distance) => distance.replace("M", "")),
        status: statusFilter,
      },
    });
    setScoresheetsList(data.data);
  };

  useEffect(() => {
    getScoresheetsDistances();
  }, []);

  useEffect(() => {
    getScoresheets();
    if (distanceFilter.length === 0 && scoresheetsDistances.length > 0) {
      setDistanceFilter([...scoresheetsDistances]);
    }
    if (statusFilter.length === 0) {
      setStatusFilter([0, 1]);
    }
  }, [distanceFilter, statusFilter]);

  const handleDistanceChange = (event) => {
    const {
      target: { value },
    } = event;
    setDistanceFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatusFilter(
      // On autofill we get a stringified value.
      typeof value === "number" ? value.split(",") : value
    );
  };

  return (
    <>
      <Header page="Scoresheets" hideBackButton />
      <AlertSnackbar />
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
        <Stack direction="column" spacing={2}>
          <FormControl sx={{ m: 1, width: 1 }}>
            <InputLabel
              id="multiple-checkbox-label"
              sx={{ fontSize: 20, color: "primary.main" }}
            >
              Status
            </InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={statusFilter}
              onChange={handleStatusChange}
              input={<OutlinedInput label="Status" />}
              renderValue={(selected) =>
                selected
                  .sort()
                  .map((status) => (status === 0 ? "In Progress" : "Completed"))
                  .join(", ")
              }
            >
              <MenuItem key={0} value={0}>
                <Checkbox checked={statusFilter.indexOf(0) > -1} />
                <ListItemText primary="In Progress" />
              </MenuItem>
              <MenuItem key={1} value={1}>
                <Checkbox checked={statusFilter.indexOf(1) > -1} />
                <ListItemText primary="Completed" />
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: 1 }}>
            <InputLabel
              id="multiple-checkbox-label"
              sx={{ fontSize: 20, color: "primary.main" }}
            >
              Distance
            </InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={distanceFilter}
              onChange={handleDistanceChange}
              input={<OutlinedInput label="Distance" />}
              renderValue={(selected) => selected.sort().join(", ")}
            >
              {scoresheetsDistances.map((distance) => (
                <MenuItem key={distance} value={distance}>
                  <Checkbox checked={distanceFilter.indexOf(distance) > -1} />
                  <ListItemText primary={distance} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {/* filter implement in backend */}
        {scoresheetsList.map((scoresheet) => (
          <ScoresheetCard
            key={scoresheet.id}
            id={scoresheet.id}
            name={scoresheet.name}
            status={scoresheet.status}
            date={scoresheet.created_at}
            distance={scoresheet.distance + "M"}
            lastModified={scoresheet.last_modified}
          />
        ))}
      </ScoresheetListPaper>
      <MenuBar />
    </>
  );
};

export default Scoresheets;
