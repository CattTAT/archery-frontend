import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function AlertSnackbar() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  useEffect(() => {
    const message = localStorage.getItem("alertMessage");
    if (message) {
      setAlertMessage(message);
      setOpenAlert(true);
      localStorage.removeItem("alertMessage"); // Clear the alert message after displaying it
    }
  }, []);
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={3000}
      onClose={() => setOpenAlert(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ marginBottom: "100px" }}
    >
      <Alert
        onClose={() => setOpenAlert(false)}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
