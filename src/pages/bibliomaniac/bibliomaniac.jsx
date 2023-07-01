import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { DataGrid, frFR } from "@mui/x-data-grid";

import { CustomButton, CustomTextField } from "./bibliomaniac.style";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import Popups from "../../components/popup/popup";
import Alert from "../../components/alerts/alert";

import { BASE_URL } from "../../services/constant/url";

import ReaderImg from "../../assets/lecteur.svg";

export default function Bibliomaniac() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenA, setIsOpenA] = React.useState(false);
  const [isOpenB, setIsOpenB] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [selectedLecteur, setSelectedLecteur] = React.useState("");
  const [lecteur, setLecteur] = React.useState("");
  const [idLecteur, setIdLecteur] = React.useState(null);

  const [searchLecteur, setSearchLecteur] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [data, setData] = React.useState(null);

  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const Navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "Matricule",
      flex: 2,
      editable: false,
    },
    {
      field: "name",
      headerName: "Nom",
      flex: 2,
      editable: false,
    },
    {
      field: "nbPret",
      headerName: "Livre",
      flex: 2,
      editable: false,
    },
    {
      field: "amende",
      headerName: "Amende (en Fmg)",
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
          <Box
            sx={{
              width: 10,
            }}
          />
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => handleShow(params.row)}
          >
            <LibraryBooksIcon />
          </Button>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lecteurs`, {
          Accept: "*/*",
          "Content-Type": "application/json",
        });
        setData(response.data);
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  const handleChangeLecteurs = (event) => {
    setSelectedLecteur(event.target.value);
  };

  const handleAdd = () => {
    setSelectedLecteur("");
    openModal();
    setTitle("Ajout d'un lecteur");
    setDescription("Veuiller ajouter un nouveau lecteur");
  };

  const handleAddLecteur = async (event) => {
    event.preventDefault();
    if (!selectedLecteur) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {
        name: selectedLecteur,
      };
      let headersList = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${BASE_URL}/lecteurs`, data, headersList)
        .then((response) => {
          setMessage("Le lecteur a bien ete ajoute");
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

  const handleChange = (row) => {
    setLecteur(row.name);
    setIdLecteur(row.id);
    openModalA();
    setTitle("Modification d'un lecteur");
    setDescription("Veuillez ajouter une nouvelle valeur");
    setSelectedRow(row);
  };

  const handleModifyLecteur = (event) => {
    setLecteur(event.target.value);
  };

  const handleSubmitModify = async (event) => {
    event.preventDefault();
    if (!lecteur) {
      setMessage("Veuillez remplir le formulaire");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {
        name: lecteur,
      };
      axios
        .put(`${BASE_URL}/lecteurs/${idLecteur}`, data)
        .then((response) => {
          setMessage("Le lecteur a bien ete modifie");
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
    setIdLecteur(row.id);
    openModalB();
    setTitle("Suppression d'un lecteur");
    setDescription("Etes-vous sur de vouloir confirmer la suppression");
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    if (!idLecteur) {
      setMessage("Erreur, donnees introuvable");
      setSeverity("error");
      ShowAlert();
    } else {
      axios
        .delete(`${BASE_URL}/lecteurs/${idLecteur}`)
        .then((response) => {
          setMessage("Le lecteur a bien ete retire");
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

  const handleShow = (row) => {
    console.log(row);
    Navigate("/Bibliomaniac/Bibliobooks", {
      state: { rowData: row.prets, name: row.name, id: row.id },
    });
  };

  const handleReset = () => {
    setSelectedLecteur("");
    setLecteur("");
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchLecteur) {
      setMessage("Retour a la valeur d'origine");
      setSeverity("info");
      ShowAlert();
      try {
        const response = await axios.get(`${BASE_URL}/lecteurs`);
        if (response.data && response.status === 200) {
          setRows(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let search = searchLecteur;
      try {
        const response = await axios.get(
          `${BASE_URL}/lecteurs/search?query=${search}`
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

  const handleAddJSX = (
    <>
      <InputLabel id="Lecteur-label">Nom du lecteur</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Lecteur-label"
        value={selectedLecteur}
        onChange={handleChangeLecteurs}
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
          onClick={handleAddLecteur}
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
      <InputLabel id="Lecteur-label">Nom du lecteur</InputLabel>
      <Box
        sx={{
          height: 10,
        }}
      />
      <CustomTextField
        id="Lecteur-label"
        value={lecteur}
        onChange={handleModifyLecteur}
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
            Bibliomane
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
                Listes des lecteurs
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 2,
                alignItems: "center",
              }}
            >
              <CustomTextField
                id="searchfield"
                label=""
                value={searchLecteur}
                onChange={(event) => setSearchLecteur(event.target.value)}
                placeholder="Nom du lecteur"
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
                    Rechercher
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
                Ajouter un nouveau lecteur
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
