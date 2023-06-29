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
  const [isOpenA, setIsOpenA] = React.useState(false);
  const [isOpenB, setIsOpenB] = React.useState(false);

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

  function createData(Data) {
    const jsonData = Object.values(Data).map((item) => {
      return {
        idlivre: item.livre.id,
        titrelivre: item.livre.titre,
        auteurlivre: item.livre.auteur,
        datepret: item.datePret,
        dateretour: item.dateRetour,
      };
    });

    return jsonData;
  }

  const result = createData(sendedData);
  console.log(username);
  console.log(sendedData);
  console.log(result);

  const columns = [
    {
      field: "idlivre",
      headerName: "Numero de livre",
      flex: 2,
      editable: false,
    },
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
      field: "datepret",
      headerName: "Date de pret",
      flex: 2,
      editable: false,
    },
    {
      field: "dateretour",
      headerName: "Date de retour",
      sortable: false,
      editable: false,
      flex: 3,
      valueGetter: (params) =>
        params.row.dateretour ? "retourne" : "non retourne",
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

  const handleRoutes = (route) => {
    Navigate(route);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openModalA = () => {
    setIsOpenA(true);
  };

  const openModalB = () => {
    setIsOpenB(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenA(false);
    setIsOpenB(false);
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

  const handleChangeLivre = (event) => {
    setSelectedLivre(event.target.value);
  };

  const handleAdd = () => {
    setSelectedLivre("");
    openModal();
    setTitle("Ajout d'un livre");
    setDescription("Veuiller ajouter un nouveau livre");
  };

  const handleAddLivre = (event) => {
    event.preventDefault();
    if (!selectedLivre) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {
        name: selectedLivre,
      };
      axios
        .post(`${BASE_URL}/livre`, data)
        .then((response) => {
          setMessage("Le lecteur a bien ete ajoute");
          setSeverity("success");
          ShowAlert();
          closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (row) => {
    setLivre(row.name);
    setIdLivre(row.id);
    openModalA();
    setTitle("Modification d'un livre");
    setDescription("Veuillez ajouter une nouvelle valeur");
    setSelectedRow(row);
  };

  const handleModifyLivre = (event) => {
    setLivre(event.target.value);
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    if (!livre) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {
        name: livre,
      };
      axios
        .put(`${BASE_URL}/lecteurs/id=${idLivre}`, data)
        .then((response) => {
          setMessage("Le livre a bien ete modifie");
          setSeverity("success");
          ShowAlert();
          closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const HandleDelete = (row) => {
    setIdLivre(row.id);
    openModalB();
    setTitle("Suppression d'un livre");
    setDescription("Etes-vous sur de vouloir confirmer la suppression");
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    if (!idLivre) {
      setMessage("Erreur, donnees introuvable");
      setSeverity("error");
      ShowAlert();
    } else {
      axios
        .delete(`${BASE_URL}/livres/${idLivre}`)
        .then((response) => {
          setMessage("Le livre a bien ete retire");
          setSeverity("info");
          ShowAlert();
          closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleReset = () => {
    setSelectedLivre("");
    setLivre("");
  };

  const handleAddJSX = (
    <>
      <InputLabel id="Livre-label">Nom du livre</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Livre-label"
        value={selectedLivre}
        onChange={handleChangeLivre}
        autoComplete="off"
        fullWidth
      />
      <Box
        sx={{
          height: 20,
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
          onClick={handleAddLivre}
        >
          Ajouter
        </Button>
        <Box
          sx={{
            width: 10,
          }}
        />
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={handleReset}
        >
          Annuler
        </Button>
      </Box>
    </>
  );

  const handleChangeJSX = (
    <>
      <InputLabel id="Livre-label">Nom du livre</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Lecteur-label"
        value={livre}
        onChange={handleModifyLivre}
        autoComplete="off"
        fullWidth
      />
      <Box
        sx={{
          height: 20,
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
          onClick={handleSubmitModify}
        >
          Enregistrer
        </Button>
        <Box
          sx={{
            width: 10,
          }}
        />
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={handleReset}
        >
          Effacer
        </Button>
      </Box>
    </>
  );

  const handleDeleteJSX = (
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
          color="error"
          size="medium"
          onClick={handleSubmitDelete}
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
          inputComponents={handleAddJSX}
        />
        <Popups
          open={isOpenA}
          handleClose={closeModal}
          title={title}
          description={description}
          data={selectedRow}
          inputComponents={handleChangeJSX}
        />
        <Popups
          open={isOpenB}
          handleClose={closeModal}
          title={title}
          description={description}
          data={selectedRow}
          inputComponents={handleDeleteJSX}
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
                  textAlign: "left",
                }}
              >
                Listes des livres <br /> du lecteur {username}
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
          >
            <CustomButton size="small" variant="contained" onClick={handleAdd}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Retourner un livre
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
    </>
  );
}
