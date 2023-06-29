import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomButton, CustomTextField } from "./loan.style";

import LoansImg from "../../assets/pret.svg";

export default function Loans() {

  const Navigate = useNavigate();
  const handleRoutes = (route) => {
    Navigate(route);
  };

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
              marginLeft: 0,
              width: "428px",
            }}
          >
            <img src={LoansImg} alt="Books" width="378px" height="400px" />
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
            <CustomButton
              size="large"
              variant="contained"
              onClick={() => handleRoutes("/Books")}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Livres
              </Typography>
            </CustomButton>
            <CustomButton
              size="large"
              variant="contained"
              onClick={() => handleRoutes("/Bibliomaniac")}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Lecteurs
              </Typography>
            </CustomButton>
            <CustomButton
              size="large"
              variant="contained"
              onClick={() => handleRoutes("/Loans")}
            >
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
            Prêt des ouvrages
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
                Listes des livres a prêter
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
