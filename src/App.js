import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import UserProvider from "./components/UserProvider";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuAppBar from "./components/MenuAppBar";
import MenuDrawer from "./components/MenuDrawer";
function App() {
  return (
    <>
      <UserProvider>
        <Box sx={{ display: "flex" }}>
          <MenuAppBar />
          <MenuDrawer />
          <Box component="main" sx={{ width: "100%" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="home" element={<Home />} />
            </Routes>
          </Box>
        </Box>
      </UserProvider>
    </>
  );
}

export default App;
/*

*/
