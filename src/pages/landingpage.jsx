import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { CustomButton, CustomTextField } from "./landingpage.style";

export default function LandingPage() {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            boxSizing: "border-box",
            height: "100vh",
            width: "40vw",
            padding: "5% 20px 20% 20px",
            display: "flex",
          }}
        >
          <Box
            boxShadow={4}
            sx={{
              boxSizing: "border-box",
              width: "100%",
              bgcolor: "#B2A496",
              borderRadius: 10,
            }}
          >
            <Typography
              sx={{
                color: "#592720",
                fontFamily: "monospace",
                fontSize: "h3.fontSize",
                textAlign: "center",
                padding: 4,
                paddingBottom: 1,
              }}
            >
              Connexion
            </Typography>
            <Typography
              sx={{
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: "h6.fontSize",
              }}
            >
              Connectez-vous pour continuer
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "0 10%",
                marginTop: 10,
              }}
            >
              <CustomTextField
                id="user"
                label="Utilisateur :"
                placeholder="Ex : Jean Babs"
                variant="standard"
                fullWidth
              />
            </Box>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "0 10%",
                marginTop: 5,
              }}
            >
              <CustomTextField
                id="password"
                label="Mot de passe :"
                variant="standard"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
                marginRight: 5,
                color: "#592720",
              }}
            >
              <CustomButton size="large" variant="contained">
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 400,
                  }}
                >
                  Se connecter
                </Typography>
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
