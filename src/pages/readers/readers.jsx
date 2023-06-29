import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { DataGrid, frFR } from "@mui/x-data-grid";

import { CustomButton, CustomTextField } from "./readers.style";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import BooksImg from "../../assets/bookspage.svg";
import Popups from "../../components/popup/popup";

import { BASE_URL } from "../../services/constant/url";

export default function Readers() {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [data, setData] = React.useState(null);

  const Navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lecteurs`);
        setData(response.data);
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


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
          <img src={BooksImg} alt="Books" width="428px" height="386px" />
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
            Ouvrages
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
                Listes des livres
                <br /> d'un lecteur
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 2,
                marginRight: 5,
              }}
            >
              <CustomTextField
                id="password"
                label=""
                placeholder="Ex: Luky dube"
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
