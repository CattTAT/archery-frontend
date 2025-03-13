import { MenuBar } from "../components/MenuBar";
import Header from "../components/Header";
import { ButtonGroup, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router";

const Home = () => {
  const DashboardPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    height: "100%",
    display: "flex",
    width: "100%",
    borderRadius: 20,
    flexDirection: "column",
    gap: 10,
  }));

  const HomePageButton = styled(Button)(({ theme }) => ({
    color: "black",
    fontSize: 18,
    lineHeight: 1,
    padding: "12px",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  }));

  return (
    <>
      <Header page="Home" />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <DashboardPaper square={false} elevation={1}>
          <Typography variant="h5">Start shooting...</Typography>
          <Grid container direction="row" spacing={2} columns={16}>
            <Grid item size={8}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="material-symbols:add-rounded" />}
                component={NavLink}
                to="/new-scoresheet"
              >
                New Scoresheet
              </HomePageButton>
            </Grid>
            <Grid item size={8}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="icon-park-outline:return" />}
              >
                Continue Scoresheet
              </HomePageButton>
            </Grid>
            <Grid item size={16}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="jam:write" />}
                component={NavLink}
                to="/scoresheets"
              >
                View Scoresheet
              </HomePageButton>
            </Grid>
          </Grid>
        </DashboardPaper>
        <DashboardPaper square={false} elevation={1}>
          <Typography variant="h5">Statistics</Typography>
          {/* TODO: add preview statistics */}
          <HomePageButton
            variant="contained"
            startIcon={<Icon icon="uil:statistics" />}
            endIcon={<Icon icon="uil:statistics" />}
            component={NavLink}
            to="/statistics"
          >
            View Statistics
          </HomePageButton>
        </DashboardPaper>
        <DashboardPaper square={false} elevation={1}>
          <Typography variant="h5">My Equipments</Typography>
          <Grid container direction="row" spacing={2} columns={12}>
            <Grid item size={12}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="material-symbols:add-rounded" />}
                component={NavLink}
                to="/new-equipment"
              >
                New Equipment
              </HomePageButton>
            </Grid>
            <Grid item size={4}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="mdi:eye-outline" />}
                component={NavLink}
                to="/equipment/Sight"
              >
                View Sight
              </HomePageButton>
            </Grid>

            <Grid item size={4}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="memory:bow" />}
                component={NavLink}
                to="/equipment/Bow"
              >
                View Bow
              </HomePageButton>
            </Grid>
            <Grid item size={4}>
              <HomePageButton
                variant="contained"
                startIcon={<Icon icon="teenyicons:arrow-solid" />}
                component={NavLink}
                to="/equipment/Arrow"
              >
                View Arrow
              </HomePageButton>
            </Grid>
          </Grid>
        </DashboardPaper>
      </Grid>

      <MenuBar />
    </>
  );
};

export default Home;
