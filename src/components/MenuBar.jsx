import { Stack } from "@mui/material";
import { NavLink } from "react-router";

export function MenuBar() {
  return (
    <Stack component="nav" direction="row" gap={1} position="fixed" bottom={2}>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/scoresheets" end>
        Scoresheets
      </NavLink>
    </Stack>
  );
}
