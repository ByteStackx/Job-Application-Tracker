import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { JobPage } from "./pages/JobPage";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs/:id" element={<JobPage />} />
      </Routes>
  );
}