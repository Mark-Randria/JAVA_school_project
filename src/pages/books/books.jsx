import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { DataGrid, frFR } from "@mui/x-data-grid";

import { CustomButton, CustomTextField } from "./books.style";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import BooksImg from "../../assets/bookspage.svg";
import Popups from "../../components/popup/popup";

import { BASE_URL } from "../../services/constant/url";

export default function Books() {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [data, setData] = React.useState(null);

  const Navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/livres`);
        setData(response.data);
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  console.log(data);



  const handleRoutes = (route) => {
    Navigate(route);
  };

  const AjoutLivrePopup = () => {
    setOpen(true);
    setDescription("Ajouter un livre");
  };

  const handleClose = () => setOpen(false);

  const handleChange = (row) => {
    console.log("Changed clicked for row:", row);
    setOpen(true);
    setDescription("Modification d'un livre");
    setSelectedRow(row);
  };

  const HandleDelete = (row) => {
    console.log("Delete clicked for row:", row);
    setSelectedRow(row);
  };

  const columns = [
    {
      field: "titre",
      headerName: "Titre",
      flex: 1,
      editable: false,
    },
    {
      field: "auteur",
      headerName: "Auteur",
      flex: 1,
      editable: false,
    },
    {
      field: "dateEdition",
      headerName: "Date d'edition",
      type: "Date",
      flex: 2,
      editable: false,
    },
    {
      field: "disponible",
      headerName: "Disponibilite",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 3,
      valueGetter: (params) => (params.row.disponible ? "oui" : "non"),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 3,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleChange(params.row)}
          >
            <EditIcon />
          </Button>
          <Box
            sx={{
              width: 10,
            }}
          />
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => HandleDelete(params.row)}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

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
            marginRight: 5,
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
              marginBottom: 5,
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
                }}
              >
                Listes des livres
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 2,
              }}
            >
              <CustomTextField
                id="password"
                label=""
                placeholder="Ex: Kamasutra"
                type="text"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
              <Popups
                description={description}
                handleClose={handleClose}
                open={open}
                data={selectedRow}
              />
            </Box>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            disableRowSelectionOnClick
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: 4,
              paddingRight: 0,
            }}
          >
            <CustomButton size="small" variant="contained">
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Ajouter un nouveau livre
              </Typography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
