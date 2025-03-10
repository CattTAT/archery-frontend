import React from "react";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import { Paper } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const NewEquipForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  borderRadius: "10px",
}));

const NewEquipment = () => {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [measurement, setMeasurement] = React.useState("");

  return (
    <>
      <Header page="New Equipment" />
      <NewEquipForm square={false} elevation={3}>
        <Typography variant="h4">Name:</Typography>
        <TextField
          id="name"
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Typography variant="h4">Type:</Typography>
        <Select
          labelId="select-type"
          id="select-type"
          variant="standard"
          sx={{ flexGrow: 1 }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={"Arrow"}>Arrow</MenuItem>
          <MenuItem value={"Bow"}>Bow</MenuItem>
          <MenuItem value={"Sight"}>Sight</MenuItem>
        </Select>
        <Typography variant="h4">Measurement:</Typography>
        <TextField
          id="measurement"
          type="text"
          variant="outlined"
          value={measurement}
          onChange={(e) => setMeasurement(e.target.value)}
          fullWidth
          multiline
          rows={5}
        />
        <Button
          variant="contained"
          startIcon={<Icon icon="material-symbols:save-outline" />}
          sx={{
            color: "black",
            fontSize: 20,
            lineHeight: 1,
            padding: "8px",
          }}
        >
          Save
        </Button>
      </NewEquipForm>
      <MenuBar />
    </>
  );
};

export default NewEquipment;
