import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import HospitalLogin from "./pages/hospitalLogin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="hospital" element={<HospitalLogin />} />
          <Route path="donor" element={<HospitalLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
