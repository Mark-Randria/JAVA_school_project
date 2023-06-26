import React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export default function Alert({ open, setOpen, message, severity }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <Button color="info" size="small" onClick={handleClose}>
        UNDO
      </Button>
    </>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "45rem", textAlign: "center" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
