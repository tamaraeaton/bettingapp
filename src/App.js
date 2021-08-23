import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import BetForm from "./components/BetForm/BetForm";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import About from "./components/About/About";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navbar />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/bet-form" component={BetForm} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About}/>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
