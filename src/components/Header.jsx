import React from "react";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { styled, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const PersonalIcon = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8,
    },
  }));

const Header = ({page}) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2" maxWidth={4 / 5}>
          {page}
        </Typography>
        <PersonalIcon
          aria-label="personal"
          color="primary"
          size="large"
          component={NavLink}
          to="/personal"
        >
          <Icon
            icon="material-symbols:person-outline"
            style={{ fontSize: 36 }}
          />
        </PersonalIcon>
      </Grid>
    </>
  );
};

export default Header;