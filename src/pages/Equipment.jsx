import {
  Paper,
  MenuItem,
  Card,
  Typography,
  Stack,
  Chip,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
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
import instance from "../lib/api";
import capitalize from "../lib/capitalize";
import ConfirmDialog from "../components/ConfirmDialog";
import AlertSnackbar from "../components/AlertSnackbar";

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

const ControlButtons = styled(Button)(() => ({
  color: "black",
  borderRadius: "50px",
  width: "50%",
}));

const EquipmentCardList = ({ id, name, type, lastModified }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [typeColor, setTypeColor] = React.useState("");
  useEffect(() => {
    switch (type.toLocaleLowerCase()) {
      case "arrows":
        setTypeColor("#A3E6FF");
        break;
      case "bow":
        setTypeColor("#FFA3A3");
        break;
      case "sight":
        setTypeColor("#ABABAB");
        break;
      default:
        setTypeColor("");
    }
  }, [type]);

  const TypeIcon = () => {
    switch (type.toLocaleLowerCase()) {
      case "arrows":
        return <Icon icon="teenyicons:arrow-solid" />;
      case "bow":
        return <Icon icon="memory:bow" />;
      case "sight":
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
          label={capitalize(type)}
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
          onClick={() => setOpenConfirmDialog(true)}
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
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={async () => {
          await instance.delete("/equipment/" + id);
          localStorage.setItem(
            "alertMessage",
            "Equipment deleted successfully"
          );
          window.location.reload();
        }}
        title="Delete equipment?"
        content="Are you sure you want to delete this equipment? This action cannot be undone."
      />
    </EquipmentCard>
  );
};

const Equipment = () => {
  const userId = localStorage.getItem("userId");
  const [EquipmentList, setEquipmentList] = React.useState([]);
  const [equipmentTypeFilter, setEquipmentTypeFilter] = React.useState([
    "arrows",
    "bow",
    "sight",
  ]);

  useEffect(() => {
    if (equipmentTypeFilter.length === 0) {
      setEquipmentTypeFilter(["arrows", "bow", "sight"]);
    }
  }, [equipmentTypeFilter]);

  const getUserEquipment = async () => {
    const data = await instance.get("/equipment", {
      params: {
        archerId: userId,
        type: equipmentTypeFilter,
      },
    });
    setEquipmentList(data.data);
  };

  useEffect(() => {
    getUserEquipment();
  }, [equipmentTypeFilter]);

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
      <AlertSnackbar />
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
        <FormControl sx={{ m: 0, width: 1 }}>
          <InputLabel id="multiple-checkbox-label">Equipment Type</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={equipmentTypeFilter}
            onChange={handleChange}
            input={<OutlinedInput label="Equipment Type" />}
            renderValue={(selected) => {
              selected = selected.map((type) => capitalize(type));
              return selected.sort().join(", ");
            }}
          >
            <MenuItem value={"arrows"}>
              <Checkbox checked={equipmentTypeFilter.indexOf("arrows") > -1} />
              <ListItemText primary="Arrows" />
            </MenuItem>
            <MenuItem value={"bow"}>
              <Checkbox checked={equipmentTypeFilter.indexOf("bow") > -1} />
              <ListItemText primary="Bow" />
            </MenuItem>
            <MenuItem value={"sight"}>
              <Checkbox checked={equipmentTypeFilter.indexOf("sight") > -1} />
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
            lastModified={equipment.last_modified}
          />
        ))}
      </EquipmentListPaper>
      <MenuBar />
    </>
  );
};

export default Equipment;
