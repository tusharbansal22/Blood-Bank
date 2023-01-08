import React,{useContext,useState,createContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import HospitalLogin from "./pages/hospitalLogin";
import Donor from "./pages/donor_page";
import Card from "./components/card";
import BloodIUnitCards from "./components/BloodUnitCards";

const BloodContext = createContext();

function App() {
  const [isBloodBankLoggedIn, setIsBloodBankLoggedIn] = useState(false);
  return (
    <BloodContext.Provider value={{isBloodBankLoggedIn,setIsBloodBankLoggedIn}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="hospital" element={<HospitalLogin />} />
          <Route path="donor" element={<Donor />} />
          <Route path="hospitalDashboard" element={<Dashboard />} />
          <Route path="card" element={<Card/>}/>
          <Route path="BloodUnitCards" element={<BloodIUnitCards/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </BloodContext.Provider>
  );
}

export {BloodContext};
export default App;
