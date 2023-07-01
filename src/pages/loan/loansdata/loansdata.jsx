import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { CustomButton, CustomTextField } from "../loan.style";

import { BASE_URL } from "../../../services/constant/url";

export default function Chart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const Navigate = useNavigate();
  const Location = useLocation();

  const sendedTotalPret = Location.state && Location.state.nbTotalPret;
  const sendedData = Location.state && Location.state.data;

  console.log(sendedTotalPret);
  console.log(sendedData);

  function createData(Data) {
    const jsonData = Object.values(Data).map((item) => {
      return {
        titrelivre: item.titre,
        nbPret: item.nbPret,
      };
    });

    return jsonData;
  }

  const newJson = createData(sendedData);
  console.log(newJson);

  const handleExportPDF = () => {
    const chartContainer = document.getElementById("chart-container");

    html2canvas(chartContainer).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");

      pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
      pdf.save("book_loans_chart.pdf");
    });
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        max: sendedTotalPret,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Histogramme des prets",
      },
    },
  };

  const labels = newJson.map((data) => data.titrelivre);

  const data = {
    labels,
    datasets: [
      {
        label: "titre des livres",
        data: newJson.map((data) => data.nbPret),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Box
        id="chart-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 4,
        }}
      >
        <Typography sx={{
            fontSize: "h6.fontSize"
        }}>
            nombre total des prets <br />de tous les livres : {sendedTotalPret}
        </Typography>
        <Bar options={options} data={data} />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button variant="text" color="primary" onClick={() => Navigate("/Loans")}>
          Retourner
        </Button>
        <Box sx={{width: 20}} />
        <Button variant="contained" onClick={handleExportPDF}>
          Exporter en tant que PDF
        </Button>
      </Box>
    </>
  );
}
