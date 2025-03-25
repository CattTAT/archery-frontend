import React, { useEffect } from "react";
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
import { useParams } from "react-router";
import instance from "../lib/api";
import { useSnapshot } from "valtio";
import { store } from "../lib/store";
import AlertSnackbar from "../components/AlertSnackbar";

const EquipDetailForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  borderRadius: "10px",
}));

const EquipmentDetail = () => {
  const userId = useSnapshot(store).userId;
  const [id, setId] = React.useState(null);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [measurements, setMeasurement] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let params = useParams();
  useEffect(() => {
    if (params.id) {
      setId(params.id);
      getEquipmentDetailsById(params.id);
    }
  }, [params.id]);

  const getEquipmentDetailsById = async (id) => {
    const data = await instance.get("/equipment/" + id);
    setName(data.data.name);
    setType(data.data.type);
    setMeasurement(data.data.measurements);
  };

  const headerTitle = id ? "Edit Equipment" : "New Equipment";

  return (
    <>
      <Header page={headerTitle} />
      <AlertSnackbar
        open={open}
        handleClose={handleClose}
        message={
          id
            ? "Equipment details successfully updated"
            : "New equipment successfully created"
        }
      />
      <EquipDetailForm square={false} elevation={3}>
        <Typography variant="h4">Name:</Typography>
        <TextField
          id="name"
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoComplete="off"
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
          <MenuItem value={"arrows"}>Arrow</MenuItem>
          <MenuItem value={"bow"}>Bow</MenuItem>
          <MenuItem value={"sight"}>Sight</MenuItem>
        </Select>
        <Typography variant="h4">Measurements:</Typography>
        <TextField
          id="measurements"
          type="text"
          variant="outlined"
          value={measurements}
          onChange={(e) => setMeasurement(e.target.value)}
          fullWidth
          multiline
          autoComplete="off"
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
          onClick={async () => {
            const body = {
              archer_id: userId,
              name,
              type,
              measurements,
            };
            id
              ? await instance.patch("equipment/" + id, body)
              : await instance.post("equipment", body);
            setOpen(true);
          }}
        >
          Save
        </Button>
      </EquipDetailForm>
      <MenuBar />
    </>
  );
};

export default EquipmentDetail;
