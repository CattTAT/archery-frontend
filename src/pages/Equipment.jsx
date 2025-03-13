import {
  Paper,
  TextField,
  MenuItem,
  Card,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router";
import React, { useEffect } from "react";

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
  const [EquipmentTypeFilter, setEquipmentTypeFilter] =
    React.useState("All Equipment");
  return (
    <>
      <Header page="Equipment" />
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
        <TextField
          select
          value={EquipmentTypeFilter}
          onChange={(e) => setEquipmentTypeFilter(e.target.value)}
          label="Equipment Type"
        >
          {" "}
          <MenuItem value={"Arrow"}>Arrow</MenuItem>
          <MenuItem value={"Bow"}>Bow</MenuItem>
          <MenuItem value={"Sight"}>Sight</MenuItem>
          <MenuItem value={"All Equipment"}>All Equipment</MenuItem>
        </TextField>
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
