import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomButton, CustomTextField, style } from "./popup.style";

export default function Popups({ description, handleClose, open, data }) {
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Typography
                sx={{
                  color: "#592720",
                  fontFamily: "monospace",
                  fontSize: "h3.fontSize",
                  textAlign: "center",
                  padding: 4,
                  paddingBottom: 8,
                }}
              >
                {description}
              </Typography>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {console.log(data)}
            </Typography>
          </Box>
        </Modal>
      </div>
      <Box></Box>
    </>
  );
}
