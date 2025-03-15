import React from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Fab from "@mui/material/Fab";

const Header = ({ page, isRegistration, isUserProfile }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  console.log(isRegistration, isUserProfile);

  const backVisibility = isRegistration ? "hidden" : "visible";
  const personalVisibility =
    isUserProfile || isRegistration ? "hidden" : "visible";

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Fab
          color="primary"
          aria-label="personal"
          size="large"
          onClick={handleBackClick}
          sx={{ boxShadow: "none", visibility: backVisibility }}
        >
          <Icon icon="nrk:back" style={{ fontSize: 36 }} />
        </Fab>

        <Typography variant="h3" maxWidth={3 / 5} fontSize={45} align="center">
          {page}
        </Typography>
        <Fab
          color="primary"
          aria-label="personal"
          size="large"
          component={NavLink}
          to="/personal"
          sx={{ boxShadow: "none", visibility: personalVisibility }}
        >
          <Icon
            icon="material-symbols:person-outline"
            style={{ fontSize: 36 }}
          />
        </Fab>
      </Grid>
    </>
  );
};

export default Header;
