import React from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/Footer/Footer";
import Home from './components/Home/Home'


function App() {
  return (
    <div className="App">
      <Header />
      <Welcome />
      <Footer />
      {/* <Home/> */}
    </div>
  );
}

export default App;
