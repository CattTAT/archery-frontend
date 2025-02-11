import { PersonOutlined } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography component="h1" fontSize={48} color="black">
        {title}
      </Typography>
      <IconButton
        sx={{
          bgcolor: "#FEAA4B",
          color: "white",
          width: 64,
          height: 64,
        }}
      >
        <PersonOutlined sx={{ fontSize: 48 }} />
      </IconButton>
    </Stack>
  );
};
export default Header;
