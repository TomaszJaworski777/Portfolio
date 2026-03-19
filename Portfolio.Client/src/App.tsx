import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Navigate to="/admin/profile" replace />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}