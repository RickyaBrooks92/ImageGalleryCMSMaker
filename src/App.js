import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GalleryPage from "./components/GalleryPage";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ImageGalleryCMSMaker" element={<HomePage />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
