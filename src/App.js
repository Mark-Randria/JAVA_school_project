import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landingpage/landingpage";
import Books from "./pages/books/books";
import Readers from "./pages/readers/readers";
import Bibliomaniac from "./pages/bibliomaniac/bibliomaniac";
import Loans from "./pages/loan/loan";
import Redirect from "./pages/redirect/redirect";

import withAuth from "./utils/withAuth";

const AuthBooks = withAuth(Books);
const AuthReaders = withAuth(Readers);
const AuthBibliomaniac = withAuth(Bibliomaniac);
const AuthLoans = withAuth(Loans);

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<LandingPage />} />
        <Route path="/Books" element={<AuthBooks />} />
        <Route path="/Readers" element={<AuthReaders />} />
        <Route path="/Bibliomaniac" element={<AuthBibliomaniac />} />
        <Route path="/Loans" element={<AuthLoans />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
