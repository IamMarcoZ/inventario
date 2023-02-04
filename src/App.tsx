import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MaterialsForm from "./components/MaterialsForm";
import MaterialsList from "./components/MaterialsList";
import Footer from "./components/Footer"
import Login from './components/Login';
import { useEffect, useState } from 'react';

function App() {
  const token = sessionStorage.getItem("token")
  const isAuth = sessionStorage.getItem("isAuth")


  

 
  return (
    <div className="App">
        
        <HashRouter >
          <Navbar></Navbar>   
          {(!isAuth) ? <Login></Login> : null}
          {token && token.toString().length > 100 && isAuth? 
          <Routes>
            <Route path="/materialsForm" element={<MaterialsForm/> } />
            <Route path="/materialsList" element={<MaterialsList />} />
          </Routes>
          : null
          }
        <Footer></Footer>
      </HashRouter>
    </div>
  );
}

export default App;
