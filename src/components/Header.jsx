import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Fab from "@mui/material/Fab";

const Header = ({ page }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography variant="h2" maxWidth={4 / 5}>
          {page}
        </Typography>
        <Fab
          color="primary"
          aria-label="personal"
          size="large"
          component={NavLink}
          to="/personal"
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
