import React from "react";
import Header from "./Components/common/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Components/pages/Home";
import PointTable from "./Components/pages/PointTable";
import "./Components/common/style.css";
import Result from "./Components/pages/Result";
import MatchDetails from "./Components/pages/MatchDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/points-table" element={<PointTable />} />
        <Route exact path="/match/:id" element={<MatchDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
