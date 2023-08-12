import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import LoginPage from "scenes/login";
import ManagementUsers from "scenes/aFSection/managementUsers";
import ManagementAquacultureUsers from "scenes/aFSection/managementUsers";
import AquacultureFarms from "scenes/aFSection/aquacultureFarms";
import AquacultureFarmers from "scenes/aFSection/aquacultureFarmers";
import FisheriesManagementUsers from "scenes/fSection/fisheriesManagementUsers";
import Fishermens from "scenes/fSection/fishermens";
import FishProcessors from "scenes/fSection/fishProcessors";
import Exporters from "scenes/exporters";
import AquacultureManagement from "scenes/aFSData/aquacultureManagement";
import FarmsData from "scenes/aFSData/farmsData";
import FarmersData from "scenes/aFSData/farmersData";
import FisheriesManagement from "scenes/fData/fisheriesManagement";
import FishermensData from "scenes/fData/fishermensData";
import FishProcessorsData from "scenes/fData/fishProcessorsData";
import UserProfile from "scenes/userProfile";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
              <Route path="/" element={<LoginPage />} />
              <Route path="userProfile" element={<UserProfile/>} />
              <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/managementAquacultureUsers" element={<ManagementAquacultureUsers />} />
              <Route path="/aquacultureFarms" element={<AquacultureFarms />} />
              <Route path="aquacultureFarmers" element={<AquacultureFarmers/>} />
              <Route path="fisheriesManagementUsers" element={<FisheriesManagementUsers/>} />
              <Route path="fishermens" element={<Fishermens/>} />
              <Route path="fishProcessors" element={<FishProcessors/>} />
              <Route path="aquacultureManagement" element={<AquacultureManagement/>} />
              <Route path="farmsData" element={<FarmsData/>} />
              <Route path="farmersData" element={<FarmersData/>} />
              <Route path="fisheriesManagement" element={<FisheriesManagement/>} />
              <Route path="fishermensData" element={<FishermensData/>} />
              <Route path="fishProcessorsData" element={<FishProcessorsData/>} />
              
              <Route path="exporters" element={<Exporters/>} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
