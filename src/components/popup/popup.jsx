import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomButton, CustomTextField, style } from "./popup.style";

export default function Popups({
  description,
  handleClose,
  open,
  title,
  data,
  inputComponents,
}) {
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
                  paddingBottom: 4,
                }}
              >
                {title}
              </Typography>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "h4.fontSize" }}
            >
              {description}
            </Typography>
            <Box
              sx={{
                height: 30,
              }}
            />
            {inputComponents}
          </Box>
        </Modal>
      </div>
    </>
  );
}
