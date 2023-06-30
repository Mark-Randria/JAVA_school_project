import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { CustomButton, CustomTextField } from "./loan.style";

import LoansImg from "../../assets/pret.svg";
import { BASE_URL } from "../../services/constant/url";
import Alert from "../../components/alerts/alert";

export default function Loans() {
  const [livreData, setLivreData] = React.useState(undefined);
  const [lecteurData, setLecteurData] = React.useState(undefined);

  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);

  const [selectedLivre, setSelectedLivre] = React.useState("");
  const [selectedLecteur, setSelectedLecteur] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const Navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLivre = await axios.get(`${BASE_URL}/livres/dispo`);
        const responseLecteur = await axios.get(`${BASE_URL}/lecteurs`);
        console.log(responseLivre.data, responseLecteur.data);
        setLivreData(responseLivre.data);
        setLecteurData(responseLecteur.data);

        if (!livreData && !lecteurData) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  const handleChangeLecteur = (event) => {
    setSelectedLecteur(event.target.value);
  };

  const handleChangeLivre = (event) => {
    setSelectedLivre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedLecteur || !selectedLivre) {
      setMessage("Veuillez faire un choix");
      setSeverity("error");
      ShowAlert();
    } else {
      const data = {};
      axios
        .post(`${BASE_URL}/prets/${selectedLecteur}/${selectedLivre}`, data)
        .then((response) => {
          setMessage("Le pret a ete accorde");
          setSeverity("success");
          ShowAlert();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          setSeverity("error");
          ShowAlert();
        });
    }
  };

  return isLoading ? (
    <>Data is loading.... thank you for your patience</>
  ) : (
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
                  marginBottom: 4,
                }}
              >
                Listes des livres a prêter
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                boxSizing: "border-box",
                padding: "0 4em",
                paddingLeft: 0,
              }}
            >
              <InputLabel id="Livre-label">Livres</InputLabel>
              <Box
                sx={{
                  height: 2,
                }}
              />
              <Select
                labelId="Livre-label"
                value={selectedLivre}
                onChange={handleChangeLivre}
                defaultValue=""
                fullWidth
              >
                {livreData &&
                  livreData.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.titre}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                boxSizing: "border-box",
                padding: "0 4em",
                paddingLeft: 0,
              }}
            >
              <InputLabel id="Lecteur-label">Lecteurs</InputLabel>
              <Box
                sx={{
                  height: 2,
                }}
              />
              <Select
                labelId="Lecteur-label"
                value={selectedLecteur}
                onChange={handleChangeLecteur}
                fullWidth
              >
                {lecteurData &&
                  lecteurData.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 5,
            }}
          >
            <CustomButton
              size="small"
              variant="contained"
              onClick={handleSubmit}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                }}
              >
                Preter un livre
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
