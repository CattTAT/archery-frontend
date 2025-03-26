import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import { Grid2, Paper, Stack } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import instance from "../lib/api";
import AlertSnackbar from "../components/AlertSnackbar";
import { useNavigate } from "react-router";

const NewScoresheetForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  borderRadius: "10px",
}));

const TargetFaceImg = styled("img")(() => ({
  width: "100%",
  height: "auto",
}));

const TargetFaceInfoDialog = (props) => {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} scroll={"paper"}>
      <DialogTitle id="scroll-dialog-title">
        <Typography variant="h4">Target Face Images:</Typography>
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Typography variant="h5">122cm 10 Rings:</Typography>
          <TargetFaceImg
            src="src\assets\122cm10Rings.jpg"
            alt="122cm 10 Rings"
          />

          <Typography variant="h5">80cm 6 Rings:</Typography>
          <TargetFaceImg
            src="src\assets\\80cm_6rings_target_face.png"
            alt="80cm 6 Rings"
          />
          <Typography variant="h5">40cm 5 Rings 3 Spots Vertical:</Typography>
          <TargetFaceImg
            src="src\assets\40cm 5 Rings 3 Spots Vertical.jpg"
            alt="40cm 5 Rings Vertical"
          />
          <Typography variant="h5">40cm 10 Rings:</Typography>
          <TargetFaceImg src="src\assets\40cm10Rings.jpg" alt="40cm 10 Rings" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

TargetFaceInfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const NewScoresheet = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [name, setName] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [targetFace, setTargetFace] = React.useState("");
  const [rounds, setRounds] = React.useState("");
  const [sets, setSets] = React.useState("");
  const [arrows, setArrows] = React.useState("");
  const [arrowLocation, setArrowLocation] = React.useState(true);
  const [openTargetFaceInfo, setOpenTargeFaceInfo] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const HandleConfirmDialog = async () => {
    setOpenConfirmDialog(false);
    const scoresheetsBody = {
      archer_id: userId,
      name: name,
      distance: distance,
      target_face: targetFace,
      round: rounds,
      set: sets,
      arrow_per_set: arrows,
    };

    try {
      const response = await instance.post("scoresheets", scoresheetsBody);
      const newScoresheetId = response.data.id; // Assuming the response contains the new scoresheet ID
      for (let i = 1; i <= rounds; i++) {
        for (let j = 1; j <= sets; j++) {
          const scoreset = await instance.post("scoreset", {
            archer_id: userId,
            scoresheet_id: newScoresheetId,
            round_seq: i,
            set_seq: j,
          });
          for (let k = 1; k <= arrows; k++) {
            await instance.post("arrows", {
              scoreset_id: scoreset.data.id,
              archer_id: userId,
              arrow_seq: k,
              score: null,
              x_axis: null,
              y_axis: null,
            });
          }
        }
      }
      setOpenAlert(true);

      // Redirect to the scoresheet detail page
      navigate(`/scoresheet/${newScoresheetId}`);
    } catch (error) {
      console.error("Failed to create scoresheet:", error);
    }
  };

  return (
    <>
      <Header page="New Scoresheet" />
      <AlertSnackbar
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
        message="Scoresheet created successfully"
      />
      <NewScoresheetForm square={false} elevation={3}>
        <Typography variant="h5">Name:</Typography>
        <TextField
          id="name"
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoComplete="off"
        />

        <Typography variant="h5">Distance:</Typography>
        <Input
          id="distance"
          type="number"
          variant="standard"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          endAdornment={<InputAdornment position="end">Meters</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />

        <Grid2 container direction="row" spacing={1} alignItems={"center"}>
          <Typography variant="h5">Target Face:</Typography>
          <IconButton
            aria-label="info"
            onClick={() => setOpenTargeFaceInfo(true)}
          >
            <Icon icon="material-symbols:info" />
          </IconButton>
        </Grid2>
        <TargetFaceInfoDialog
          open={openTargetFaceInfo}
          onClose={() => setOpenTargeFaceInfo(false)}
        />
        <Select
          labelId="select-targetFace"
          id="select-targetFace"
          variant="standard"
          sx={{ flexGrow: 1 }}
          value={targetFace}
          onChange={(e) => setTargetFace(e.target.value)}
        >
          <MenuItem value={"122cm 10 Rings"}>122cm 10 Rings</MenuItem>
          <MenuItem value={"80cm 6 Rings"}>80cm 6 Rings</MenuItem>
          <MenuItem value={"40cm 5 Rings Vertical"}>
            40cm 5 Rings Vertical
          </MenuItem>
          <MenuItem value={"40cm 10 Rings"}>40cm 10 Rings</MenuItem>
        </Select>

        <Typography variant="h5">Number of Rounds:</Typography>
        <Input
          id="rounds"
          type="number"
          variant="standard"
          value={rounds}
          onChange={(e) => setRounds(e.target.value)}
          endAdornment={<InputAdornment position="end">Rounds</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />

        <Typography variant="h5">Number of Sets:</Typography>
        <Input
          id="sets"
          type="number"
          variant="standard"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          endAdornment={<InputAdornment position="end">Sets</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />

        <Typography variant="h5">Arrows per Set:</Typography>
        <Input
          id="arrows"
          type="number"
          variant="standard"
          value={arrows}
          onChange={(e) => setArrows(e.target.value)}
          endAdornment={<InputAdornment position="end">Arrows</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h5">Arrow Location Recording:</Typography>
          <Switch
            checked={arrowLocation}
            onChange={(e) => setArrowLocation(e.target.checked)}
          />
        </Stack>
        <Typography variant="caption">
          **Enable arrow location recording to receive customized shooting
          advice in each set
        </Typography>
        <Button
          variant="contained"
          startIcon={<Icon icon="mingcute:target-fill" />}
          sx={{
            color: "black",
            fontSize: 20,
            lineHeight: 1,
            padding: "8px",
            borderRadius: "10px",
          }}
          onClick={() => setOpenConfirmDialog(true)}
        >
          Start
        </Button>
      </NewScoresheetForm>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={HandleConfirmDialog}
        title="Confirm Creating Scoresheet?"
        content="Please note that scoresheet settings cannot modified after created"
      />
      <MenuBar />
    </>
  );
};

export default NewScoresheet;
