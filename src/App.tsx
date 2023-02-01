import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MaterialsForm from "./components/MaterialsForm";
import MaterialsList from "./components/MaterialsList";
import Footer from "./components/Footer"

function App() {
  
  return (
    <div className="App">
        
        <HashRouter >
        <Navbar></Navbar>
          <Routes>
          
         
            <Route path="/materialsForm" element={<MaterialsForm/> } />
            <Route path="/materialsList" element={<MaterialsList />} />
            
          </Routes>
        <Footer></Footer>
      </HashRouter>
    </div>
  );
}

export default App;
