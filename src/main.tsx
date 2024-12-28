import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./screens/home/Home.tsx";
import SignIn from "./screens/sign-in/SignIn.tsx";
import Profile from "./screens/profile/Profile.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import PrivacyPolicy from "./screens/privacy-policy/PrivacyPolicy.tsx";
import { AuthProvider } from "./context/AuthContext";

Amplify.configure(outputs);

function AppLayout() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/sign-in';

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
