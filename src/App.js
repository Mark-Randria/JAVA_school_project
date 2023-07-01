import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landingpage/landingpage";
import Books from "./pages/books/books";
import Bibliomaniac from "./pages/bibliomaniac/bibliomaniac";
import Loans from "./pages/loan/loan";
import Redirect from "./pages/redirect/redirect";
import Bibliobooks from "./pages/bibliomaniac/biblioBooks/bibliobooks";
import Chart from "./pages/loan/loansdata/loansdata";

import withAuth from "./utils/withAuth";

const AuthBooks = withAuth(Books);
const AuthBibliomaniac = withAuth(Bibliomaniac);
const AuthLoans = withAuth(Loans);
const AuthBibliobooks = withAuth(Bibliobooks);
const AuthChart = withAuth(Chart);

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<LandingPage />} />
        <Route path="/Books" element={<AuthBooks />} />
        <Route path="/Bibliomaniac" element={<AuthBibliomaniac />} />
        <Route path="/Bibliomaniac/Bibliobooks" element={<AuthBibliobooks />} />
        <Route path="/Loans" element={<AuthLoans />} />
        <Route path="/Loans/Chart" element={<AuthChart />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
