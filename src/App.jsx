//App.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*importación de rutas*/
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Principal from "./pages/Principal.jsx";
import Perfil from "./pages/Profile.jsx";
//import Vinilo from "./pages/Vinilo.jsx";
import VinylInfo from "./pages/Vinilo.jsx"; // Corregido: importación de VinylInfo
//import $ from "jquery";

/* Creación de rutas*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="principal" element={<Principal />} />
        <Route path="perfil" element={<Perfil />} />
        {/*<Route path="vinilo" element={<Vinilo />} />*/}
        <Route path="/vinilo/:id" element={<VinylInfo />} /> 
      </Routes>
    </Router>
  );
}

export default App;
