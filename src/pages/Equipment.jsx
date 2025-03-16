import {
  Paper,
  TextField,
  MenuItem,
  Card,
  Typography,
  Stack,
  Chip,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Box,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const EquipmentListPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: "10px",
}));

const EquipmentCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  borderRadius: "10px",
  backgroundColor: "#E0E0E0",
}));

const EquipmentList = [
  {
    id: 0,
    name: "Equipment 1",
    type: "Arrow",
    lastModified: "12/12/2024 18:45",
  },
  { id: 1, name: "Equipment 2", type: "Bow", lastModified: "12/12/2024 18:45" },
  {
    id: 2,
    name: "Equipment 3",
    type: "Sight",
    lastModified: "12/12/2024 18:45",
  },
];

const ControlButtons = styled(Button)(() => ({
  color: "black",
  borderRadius: "50px",
  width: "50%",
}));

const EquipmentCardList = ({ id, name, type, lastModified }) => {
  const [typeColor, setTypeColor] = React.useState("");
  useEffect(() => {
    switch (type) {
      case "Arrow":
        setTypeColor("#A3E6FF");
        break;
      case "Bow":
        setTypeColor("#FFA3A3");
        break;
      case "Sight":
        setTypeColor("#ABABAB");
        break;
      default:
        setTypeColor("");
    }
  }, [type]);

  const TypeIcon = () => {
    switch (type) {
      case "Arrow":
        return <Icon icon="teenyicons:arrow-solid" />;
      case "Bow":
        return <Icon icon="memory:bow" />;
      case "Sight":
        return <Icon icon="mdi:eye-outline" />;
      default:
        return null;
    }
  };
  return (
    <EquipmentCard>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h5">{name}</Typography>
        <Chip
          label={type}
          icon={<TypeIcon />}
          sx={{
            maxWidth: "100%",
            minWidth: "40%",
            backgroundColor: typeColor,
          }}
        />
      </Stack>
      <Typography variant="caption">Last Modified: {lastModified}</Typography>
      <Stack direction="row" spacing={2}>
        <ControlButtons
          variant="contained"
          startIcon={<Icon icon="material-symbols:delete-outline" />}
          color="error"
        >
          Delete
        </ControlButtons>

        <ControlButtons
          variant="contained"
          startIcon={<Icon icon="material-symbols:edit-outline" />}
          component={NavLink}
          color="primary"
          to={"/edit-equipment/" + id}
        >
          Edit
        </ControlButtons>
      </Stack>
    </EquipmentCard>
  );
};

const Equipment = () => {
  const [equipmentTypeFilter, setEquipmentTypeFilter] = React.useState([
    "Arrow",
    "Bow",
    "Sight",
  ]);

  let params = useParams();
  useEffect(() => {
    if (params.type && params.type.toLocaleLowerCase() !== "all") {
      setEquipmentTypeFilter([params.type]);
    }
  }, [params.type]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEquipmentTypeFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Header page="Equipment" hideBackButton />
      <EquipmentListPaper square={false} elevation={3}>
        <Button
          variant="contained"
          startIcon={<Icon icon="material-symbols:add-rounded" />}
          component={NavLink}
          to="/new-equipment"
          sx={{
            color: "black",
            fontSize: 20,
            lineHeight: 1,
            padding: "8px",
          }}
        >
          New Equipment
        </Button>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-checkbox-label">Equipment Type</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={equipmentTypeFilter}
            onChange={handleChange}
            input={<OutlinedInput label="Equipment Type" />}
            renderValue={(selected) => selected.sort().join(", ")}
          >
            <MenuItem value={"Arrow"}>
              <Checkbox checked={equipmentTypeFilter.indexOf("Arrow") > -1} />
              <ListItemText primary="Arrow" />
            </MenuItem>
            <MenuItem value={"Bow"}>
              <Checkbox checked={equipmentTypeFilter.indexOf("Bow") > -1} />
              <ListItemText primary="Bow" />
            </MenuItem>
            <MenuItem value={"Sight"}>
              <Checkbox checked={equipmentTypeFilter.indexOf("Sight") > -1} />
              <ListItemText primary="Sight" />
            </MenuItem>
          </Select>
        </FormControl>
        {/* filter implement in backend */}
        {EquipmentList.map((equipment) => (
          <EquipmentCardList
            key={equipment.id}
            id={equipment.id}
            name={equipment.name}
            type={equipment.type}
            lastModified={equipment.lastModified}
          />
        ))}
      </EquipmentListPaper>
      <MenuBar />
    </>
  );
};

export default Equipment;
