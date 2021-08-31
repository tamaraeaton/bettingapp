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
import DisplayBet from "./components/DisplayBet/DisplayBet";
import ProtectedComponent from "./components/ProtectedComponent/ProtectedComponent";
import { AuthContext } from "./context/Auth";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Navbar />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />

        <ProtectedComponent
          exact
          path="/display-bet"
          component={DisplayBet}
          currentUser={currentUser}
        />
        <ProtectedComponent
          exact
          path="/home"
          component={Home}
          currentUser={currentUser}
        />
        <ProtectedComponent
          exact
          path="/bet-form"
          component={BetForm}
          currentUser={currentUser}
        />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
