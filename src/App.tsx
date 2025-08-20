import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}