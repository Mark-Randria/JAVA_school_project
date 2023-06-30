import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { DataGrid, frFR } from "@mui/x-data-grid";

import { CustomButton, CustomTextField } from "./books.style";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import BooksImg from "../../assets/bookspage.svg";
import Popups from "../../components/popup/popup";
import Alert from "../../components/alerts/alert";

import { BASE_URL } from "../../services/constant/url";

export default function Books() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenA, setIsOpenA] = React.useState(false);
  const [isOpenB, setIsOpenB] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [selectedLivre, setSelectedLivre] = React.useState("");
  const [selectedAuteur, setSelectedAuteur] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [livre, setLivre] = React.useState("");
  const [idLivre, setIdLivre] = React.useState(null);
  const [auteur, setAuteur] = React.useState("");
  const [date, setDate] = React.useState("");

  const [searchLivre, setSearchLivre] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

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

  const handleRoutes = (route) => {
    Navigate(route);
  };

  const handleSearchLivre = (event) => {
    setSearchLivre(event.target.value);
  };

  const handleChangeLivre = (event) => {
    setSelectedLivre(event.target.value);
  };

  const handleChangeAuteur = (event) => {
    setSelectedAuteur(event.target.value);
  };

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAdd = () => {
    setSelectedLivre("");
    setSelectedAuteur("");
    setSelectedDate("");
    openModal();
    setTitle("Ajout d'un livre");
    setDescription("Veuiller ajouter un nouveau livre");
  };

  const handleLivre = async (event) => {
    event.preventDefault();
    if (!selectedLivre || !selectedAuteur || !selectedDate) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {
        titre: selectedLivre,
        auteur: selectedAuteur,
        dateEdition: selectedDate,
      };
      axios
        .post(`${BASE_URL}/livres`, data)
        .then((response) => {
          setMessage("Le livre a bien ete ajoute");
          setSeverity("success");
          ShowAlert();
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setMessage(error.response.data.message);
          setSeverity("error");
          ShowAlert();
        });
    }
  };

  const handleChange = (row) => {
    setLivre(row.titre);
    setIdLivre(row.id);
    setAuteur(row.auteur);
    setDate(row.dateEdition);
    openModalA();
    setTitle("Modification d'un livre");
    setDescription("Veuillez ajouter une nouvelle valeur");
    setSelectedRow(row);
  };

  const handleModifyLivre = (event) => {
    setLivre(event.target.value);
  };

  const handleModifyAuteur = (event) => {
    setAuteur(event.target.value);
  };

  const handleModifyDate = (event) => {
    setDate(event.target.value);
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    if (!livre || !auteur || !date) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {
        titre: livre,
        auteur: auteur,
        dateEdition: date,
      };
      axios
        .put(`${BASE_URL}/livres/${idLivre}`, data)
        .then((response) => {
          setMessage("Le livre a bien ete modifie");
          setSeverity("success");
          ShowAlert();
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setMessage(error.response.data.message);
          setSeverity("error");
          ShowAlert();
        });
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchLivre) {
      setMessage("Retour a la valeur d'origine");
      setSeverity("info");
      ShowAlert();
      try {
        const response = await axios.get(`${BASE_URL}/livres`);
        if (response.data && response.status === 200) {
          setRows(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let search = searchLivre;
      try {
        const response = await axios.get(
          `${BASE_URL}/livres/search?query=${search}`
        );
        if (response.data && response.status === 200) {
          console.log(search);
          setRows(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReset = () => {
    setSelectedLivre("");
    setSelectedAuteur("");
    setSelectedDate("");
    setLivre("");
    setAuteur("");
    setDate("");
  };

  const columns = [
    {
      field: "titre",
      headerName: "Titre",
      flex: 1.5,
      editable: false,
    },
    {
      field: "auteur",
      headerName: "Auteur",
      flex: 1.5,
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
      flex: 2,
      valueGetter: (params) => (params.row.disponible ? "oui" : "non"),
    },
    {
      field: "nbPret",
      headerName: "Nombre de prets",
      flex: 2,
      editable: false,
    },
    {
      field: "actions",
      headerName: "",
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
      <InputLabel id="Auteur-label">Auteur du livre</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Auteur-label"
        value={selectedAuteur}
        onChange={handleChangeAuteur}
        autoComplete="off"
        fullWidth
      />
      <Box
        sx={{
          height: 20,
        }}
      />
      <InputLabel id="Date-label">Date d'edition du livre</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Date-label"
        value={selectedDate}
        onChange={handleChangeDate}
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
          onClick={handleLivre}
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
          onClick={closeModal}
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
        id="Livre-label"
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
      <InputLabel id="Auteur-label">Auteur du livre</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Auteur-label"
        value={auteur}
        onChange={handleModifyAuteur}
        autoComplete="off"
        fullWidth
      />
      <Box
        sx={{
          height: 20,
        }}
      />
      <InputLabel id="Date-label">Date d'edition du livre</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Date-label"
        value={date}
        onChange={handleModifyDate}
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
                id="searchfield"
                label=""
                placeholder="Ex: Don't cry"
                value={searchLivre}
                onChange={handleSearchLivre}
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
              <Box
                sx={{
                  boxSizing: "border-box",
                  padding: "0 16px",
                }}
              >
                <CustomButton
                  size="small"
                  variant="contained"
                  onClick={handleSearchSubmit}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 400,
                    }}
                  >
                    Rechercher un livre
                  </Typography>
                </CustomButton>
              </Box>
            </Box>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4,
                },
              },
            }}
            pageSizeOptions={[4, 8]}
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
                Ajouter un nouveau livre
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
