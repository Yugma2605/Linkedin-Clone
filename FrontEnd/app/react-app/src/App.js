import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Navbar from "./components/Navbar";
export default function App() {
  ReactDOM.render(<Navbar />, document.getElementById("root"));
}
