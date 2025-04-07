import React from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Fab from "@mui/material/Fab";

const Header = ({ page, hideBackButton, hidePersonalButton }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "background.default",
          mx: -1,
          width: "calc(100% + 16px)",
          padding: "8px 0px",
        }}
      >
        <Fab
          color="primary"
          aria-label="personal"
          size="large"
          onClick={handleBackClick}
          sx={{
            boxShadow: "none",
            visibility: hideBackButton ? "hidden" : "visible",
          }}
        >
          <Icon icon="nrk:back" style={{ fontSize: 36 }} />
        </Fab>

        <Typography variant="h3" maxWidth={3 / 5} fontSize={40} align="center">
          {page}
        </Typography>
        <Fab
          color="primary"
          aria-label="personal"
          size="large"
          component={NavLink}
          to="/personal"
          sx={{
            boxShadow: "none",
            visibility: hidePersonalButton ? "hidden" : "visible",
          }}
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
