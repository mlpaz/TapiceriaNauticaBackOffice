import React from "react";
import './App.css';
import Login from './components/Login';
import UserProvider from './components/UserProvider';
import Footer from "./components/Footer";

function App() {
  return (
  <>
    <UserProvider>
      <Login />
      <Footer />
    </UserProvider>
  </>
  );
}

export default App;
