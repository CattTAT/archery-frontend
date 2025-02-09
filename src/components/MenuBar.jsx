import { NavLink } from "react-router";

export function MenuBar() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/scoresheets" end>
        Scoresheets
      </NavLink>
    </nav>
  );
}
