import React from "react";
import "./App.css";
import BetForm from "./components/BetFrom/BetForm";
import Header from "./components/Header/Header.js";
import Welcome from "./components/Welcome/Welcome";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Welcome /> */}
      <BetForm />
    </div>
  );
}

export default App;
