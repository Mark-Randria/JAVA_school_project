import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { DataGrid, frFR } from "@mui/x-data-grid";

import { CustomButton, CustomTextField } from "../bibliomaniac.style";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Popups from "../../../components/popup/popup";
import Alert from "../../../components/alerts/alert";

import { BASE_URL } from "../../../services/constant/url";

import PretImg from "../../../assets/pret.svg";

export default function Bibliobooks() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [selectedLivre, setSelectedLivre] = React.useState("");
  const [livre, setLivre] = React.useState("");
  const [idLivre, setIdLivre] = React.useState(null);

  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const Navigate = useNavigate();
  const Location = useLocation();

  const sendedData = Location.state && Location.state.rowData;
  const username = Location.state && Location.state.name;
  const userid = Location.state && Location.state.id;

  function createData(Data) {
    const jsonData = Object.values(Data).map((item) => {
      return {
        idpret: item.id,
        idlivre: item.livre.id,
        titrelivre: item.livre.titre,
        auteurlivre: item.livre.auteur,
        datepret: item.datePret,
        dateedition: item.livre.dateEdition,
        dateretour: item.dateRetour,
      };
    });

    return jsonData;
  }

  const result = createData(sendedData);
  console.log(result);

  const columns = [
    {
      field: "titrelivre",
      headerName: "Titre du livre",
      flex: 2,
      editable: false,
    },
    {
      field: "auteurlivre",
      headerName: "Auteur",
      flex: 2,
      editable: false,
    },
    {
      field: "dateedition",
      headerName: "Date d'edition",
      flex: 2,
      editable: false,
    },
    {
      field: "datepret",
      headerName: "Date de pret",
      flex: 2,
      editable: false,
    },
    {
      field: "dateretour",
      headerName: "Situation du livre",
      sortable: false,
      editable: false,
      flex: 3,
      valueGetter: (params) =>
        params.row.dateretour ? "retourne" : "non retourne",
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      flex: 2,
      renderCell: (params) => (
        <>
          <Box
            sx={{
              display: "flex",
              boxSizing: "border-box",
            }}
          >
            <CustomButton
              sx={{
                height: "35px",
              }}
              size="small"
              variant="contained"
              disabled={params.row.dateretour !== null ? true : false}
              onClick={() => handleModal(params.row)}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 16,
                }}
              >
                Rendre
              </Typography>
            </CustomButton>
          </Box>
        </>
      ),
    },
  ];

  const handleRoutes = (route) => {
    Navigate(route);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModal = (row) => {
    console.log(row);
    setIdLivre(row.idpret);
    setTitle("Retourner un livre");
    setDescription("Voulez-vous retourner ce livre ?");
    openModal();
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const ShowAlert = () => {
    setOpen(true);
  };

  const CloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!idLivre) {
      setMessage("Erreur interne du traitement");
      setSeverity("error");
      ShowAlert();
    } else {
      let id = idLivre;
      const data = {};
      axios
        .post(`${BASE_URL}/prets/retourner/${id}`, data)
        .then((response) => {
          setMessage("Le livre a ete rendu");
          setSeverity("success");
          ShowAlert();
          closeModal();
          setTimeout(() => {
            handleRoutes("/Bibliomaniac");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleConfirmJSX = (
    <>
      <Box
        sx={{
          height: 10,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSubmit}
        >
          Confirmer
        </Button>
        <Box
          sx={{
            width: 10,
          }}
        />
        <Button
          variant="contained"
          color="info"
          size="medium"
          onClick={closeModal}
        >
          Annuler
        </Button>
      </Box>
    </>
  );

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
        <Popups
          open={isOpen}
          handleClose={closeModal}
          title={title}
          description={description}
          data={selectedRow}
          inputComponents={handleConfirmJSX}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginLeft: 0,
            }}
          >
            <img src={PretImg} alt="Books" width="378px" height="400px" />
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
              onClick={() => handleRoutes("/Bibliomaniac")}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Retourner
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
              marginBottom: 1,
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
                  textAlign: "left",
                }}
              >
                Listes des livres d'un lecteur
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
              }}
            >
              <CustomTextField
                id="password"
                label=""
                placeholder="Nom"
                type="text"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "h5.fontSize",
                textAlign: "left",
                marginTop: -0,
                marginRight: 25,
                marginBottom: 2,
              }}
            >
              Numero lecteur : {userid}
              <br />
              Nom : {username}
            </Typography>
          </Box>
          <DataGrid
            rows={result}
            getRowId={(result) => result.idlivre}
            columns={columns}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: 4,
              paddingRight: 0,
            }}
          />
        </Box>
        <Alert
          open={open}
          setOpen={setOpen}
          message={message}
          severity={severity}
        />
      </Box>
    </>
  );
}
