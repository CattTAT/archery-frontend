import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function ErrorAlertSnackbar({open, errorMessage, onClose}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ marginBottom: "100px" }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
