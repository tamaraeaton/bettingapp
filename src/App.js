import React from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import BetFrom from "./components/BetFrom/BetForm"
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Welcome />
        <Route exact path="/home" component={Home} />
        <Route exact path="/bet-form" component={BetFrom} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
