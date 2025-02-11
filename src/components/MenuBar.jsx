import { Box, Icon, Stack, styled, Typography } from "@mui/material";
import { NavLink } from "react-router";
import HomeSvg from "../assets/home.svg?react";
import ScoreSvg from "../assets/score.svg?react";
import StatsSvg from "../assets/stats.svg?react";
import ToolsSvg from "../assets/tools.svg?react";

const MenuBarRoot = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    flexDirection: "row",
    justifyContent: "space-between",
    bgcolor: "#FEAA4B",
    color: "white",
    py: 0.5,
    px: 2,
    gap: 1,
    position: "fixed",
    bottom: 16,
    left: 16,
    borderRadius: "180px",
    width: "calc(100% - 32px)",
  }),
);

export function MenuBar() {
  return (
    <>
      {/* reserved space for scrolling */}
      <Box sx={{ height: 62 }} />
      
      <MenuBarRoot component="nav">
        <IconNavLink Svg={HomeSvg} label="Home" to="/" />
        <IconNavLink Svg={ScoreSvg} label="Score" to="/scoresheets" />
        <IconNavLink Svg={StatsSvg} label="Stats" to="/stats" />
        <IconNavLink Svg={ToolsSvg} label="Tools" to="/tools" />
      </MenuBarRoot>
    </>
  );
}

function IconNavLink({ Svg, label, to }) {
  return (
    <NavLink to={to}>
      <Stack alignItems="center" textAlign="center" width={74}>
        <Icon component={Svg} sx={{ fontSize: 32 }} />
        <Typography
          sx={{
            color: "white",
            textDecoration: "none",
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
      </Stack>
    </NavLink>
  );
}
