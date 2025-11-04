import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Success from "./components/success";
import ProtectedRoute from "./components/ProtectedRoute";
import EventList from "./components/EventList";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center ">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <EventList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>

        </Router>
      </div>
    </>
  );
}

export default App;
