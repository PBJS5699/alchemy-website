import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./screens/home/Home.tsx";
import SignIn from "./screens/sign-in/SignIn.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
