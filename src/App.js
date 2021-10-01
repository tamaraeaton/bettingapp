import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import BetForm from "./components/BetForm/BetForm";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import DisplayBet from "./components/DisplayBet/DisplayBet";
import UpdateBetForm from "./components/UpdateBetForm/UpdateBetForm";
import JoinBet from "./components/JoinBet/JoinBet";
import UserProfile from "./components/UserProfile/UserProfile";
import ProtectedComponent from "./components/ProtectedComponent/ProtectedComponent";
import DisplayMembers from "./components/MembersList/MembersList";
import EditUserComponent from "./components/EditUserComponent/EditUserComponent";
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Route exact path="/" component={Welcome} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact-form" component={ContactForm} />
        

        <ProtectedComponent exact path="/display-bet" component={DisplayBet} />
        <ProtectedComponent exact path="/home" component={Home} />
        <ProtectedComponent exact path="/bet-form" component={BetForm} />
        <ProtectedComponent exact path="/display-members" component={DisplayMembers} />
        <ProtectedComponent exact path="/user-profile" component={UserProfile} />
        <ProtectedComponent exact path="/join-bet" component={JoinBet} />
        <ProtectedComponent exact path="/update-bet" component={UpdateBetForm} />
        <ProtectedComponent exact path="/edit-profile" component={EditUserComponent} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
