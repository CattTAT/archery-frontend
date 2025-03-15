import React, { useState } from "react";
import { NavLink } from "react-router";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export function MenuBar() {
  const [value, setValue] = useState(0);

  const menuItems = [
    {
      label: "Home",
      icon: <Icon icon="lucide:home" style={{ fontSize: 32 }} />,
      nav: "/home",
    },
    {
      label: "Score",
      icon: <Icon icon="jam:write" style={{ fontSize: 32 }} />,
      nav: "/scoresheet-list",
    },
    {
      label: "Stats",
      icon: <Icon icon="wpf:statistics" style={{ fontSize: 32 }} />,
      nav: "/statistics",
    },
    {
      label: "Tools",
      icon: <Icon icon="tabler:bow" style={{ fontSize: 32 }} />,
      nav: "/equipment/All",
    },
  ];

  return (
    <Box sx={{ height: "120px" }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "background.default",
          padding: "20px",
        }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "50px",
            padding: "4px",
            height: "72px",
          }}
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              component={NavLink}
              to={item.nav}
              sx={{
                color: "primary.contrastText",
                "&.Mui-selected": { color: "white" },
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "22px !important",
                  lineHeight: 1,
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
