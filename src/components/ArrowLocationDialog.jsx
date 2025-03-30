import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ErrorAlertSnackbar from "./ErrorAlertSnackbar";

function ArrowLocationDialog({ open, onClose, onConfirm }) {
  const [arrowLocations, setArrowLocations] = useState([]);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    setArrowLocations([]); // Reset locations when dialog opens
  }, [open]); // Reset when dialog opens or closes

  const handleTargetClick = (event) => {
    if (arrowLocations.length >= 6) return; // Limit to 6 arrows

    const rect = event.target.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width; // Normalize x (0 to 1)
    const normalizedY = (event.clientY - rect.top) / rect.height; // Normalize y (0 to 1)

    // Scale the normalized coordinates to the new range
    const x = (normalizedX * 48).toFixed(14); // Scale x to [0, 48]
    const y = ((1 - normalizedY) * 48).toFixed(14); // Scale y to [0, 48] (invert y-axis)

    setArrowLocations((prev) => [...prev, { x, y }]);
  };

  const handleConfirm = () => {
    if (arrowLocations.length < 6) {
      setOpenError(true); // Show error if less than 6 arrows
      return;
    }
    onConfirm(arrowLocations); // Pass the arrow locations to the parent component
    setArrowLocations([]); // Reset locations after confirmation
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        Please input the arrow locations of the previous set:
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Click on the target face to record the locations of 6 arrows.
        </DialogContentText>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "0",
            paddingBottom: "100%", // Maintain aspect ratio
            backgroundImage: "url('../src/assets/80cm_6rings_target_face.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            cursor: "crosshair",
            border: "1px solid black",
          }}
          onClick={handleTargetClick}
        >
          {arrowLocations.map((location, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${(location.x / 48) * 100}%`, // Convert back to percentage for display
                top: `${(1 - location.y / 48) * 100}%`, // Convert back to percentage for display
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
                border: "1px solid black",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
      <ErrorAlertSnackbar
        open={openError}
        onClose={() => setOpenError(false)}
        errorMessage={"Please select all 6 arrow locations."}
      />
    </Dialog>
  );
}

export default ArrowLocationDialog;
