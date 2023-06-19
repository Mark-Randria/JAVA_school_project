import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import LandingImg from "../../assets/landing.svg";

import { CustomButton, CustomTextField } from "./landingpage.style";

export default function LandingPage() {
  return (
    <>
      <Box
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          backgroundImage: `url(${LandingImg})`,
          backgroundRepeat: "repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 2,
            height: "100vh",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "h4.fontSize",
                textAlign: "center",
                padding: 4,
                paddingBottom: 1,
              }}
            >
              Library
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "h3.fontSize",
                textAlign: "left",
                padding: 4,
                paddingBottom: 1,
              }}
            >
              Lire un bon livre, <br />c'est faire une rencontre
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            boxSizing: "border-box",
            height: "100vh",
            width: "40vw",
            padding: "5% 7% 20% 20px",
            display: "flex",
          }}
        >
          <Box
            boxShadow={4}
            sx={{
              boxSizing: "border-box",
              width: "100%",
              minHeight: 600,
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
                placeholder="8 caracteres minimums"
                type="password"
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
      </Box>
    </>
  );
}
