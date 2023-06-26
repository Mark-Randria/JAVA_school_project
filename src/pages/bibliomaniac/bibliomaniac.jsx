import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomButton, CustomTextField } from "./bibliomaniac.style";

import ReaderImg from "../../assets/lecteur.svg";

export default function Bibliomaniac() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          bgcolor: "#B2A496",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginLeft: 5,
            }}
          >
            <img src={ReaderImg} alt="Books" width="478px" height="351px" />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              boxSizing: "border-box",
              justifyContent: "space-around",
              padding: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomButton size="large" variant="contained">
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Livres
              </Typography>
            </CustomButton>
            <CustomButton size="large" variant="contained">
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Lecteurs
              </Typography>
            </CustomButton>
            <CustomButton size="large" variant="contained">
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Pret
              </Typography>
            </CustomButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
          }}
        >
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
            Bibliomane
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 2,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontFamily: "monospace",
                  fontSize: "h4.fontSize",
                  textAlign: "center",
                  marginLeft: 4,
                }}
              >
                Listes des lecteurs
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 2,
                marginRight: 5,
              }}
            >
              <CustomTextField
                id="password"
                label=""
                placeholder="Ex: Arnold swachneger or smth"
                type="text"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
