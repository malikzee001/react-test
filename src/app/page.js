"use client";

import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./page.css";
import HomePage from "./pages/home-page";

export default function Home() {
  return (
    <Router basename="/">
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
