import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage";
import "./css/HomePage.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/ImageGalleryCMSMaker" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
