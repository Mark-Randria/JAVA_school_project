import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "../../components/alerts/alert";

import LandingImg from "../../assets/landing.svg";
import { AuthService } from "../../services/auth-service";

import { CustomButton, CustomTextField } from "./landingpage.style";

export default function LandingPage() {
  const Navigate = useNavigate();

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !password) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      handleClick();
    } else {
      const data = {
        username: user,
        password: password,
      };

      const token = AuthService.login(data.username, data.password)
        .then((response) => {
          console.log(response);
          if (response === null || response === undefined) {
            setMessage("Ce compte n'existe pas");
            setSeverity("warning");
            handleClick();
          } else {
            setMessage("Connexion reussie");
            setSeverity("success");
            handleClick();
            Navigate("/Books");
            setUser("");
            setPassword("");
            setMessage("");
          }
        })
        .catch((error) => {
          console.log(error);
          setSeverity("error");
          setMessage("Probleme de connexion au serveur");
          handleClick();
        });
    }
  };

  const handleReset = (e) => {
    handleClose();
    setUser("");
    setPassword("");
    setMessage("");
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: "-10",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <img src={LandingImg} width="1920px" />
      </Box>
      <Box
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
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
              maxHeight: "358px"
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "h3.fontSize",
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
                fontSize: "h2.fontSize",
                textAlign: "left",
                padding: 4,
                paddingBottom: 1,
              }}
            >
              Lire un bon livre, <br />
              c'est faire une rencontre
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
                value={user}
                onChange={handleUserChange}
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
                value={password}
                onChange={handlePasswordChange}
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
              <CustomButton
                size="large"
                variant="contained"
                onClick={handleSubmit}
              >
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
          <Alert
            open={open}
            setOpen={setOpen}
            message={message}
            severity={severity}
          />
        </Box>
      </Box>
    </>
  );
}
