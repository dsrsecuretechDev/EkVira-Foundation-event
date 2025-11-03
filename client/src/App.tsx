import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Success from "./components/success";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center ">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
