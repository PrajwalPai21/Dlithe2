import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./pages/Navbar";
import "./pages/main.css"; 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}
function AboutPage() {
  return <h2 className="page-content">About SnoozeBros</h2>;
}

function ContactPage() {
  return <h2 className="page-content">Contact Us</h2>;
}

export default App;
