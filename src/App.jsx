import "./App.css";
import React from "react";
import AddSubscription from "./components/AddSubscription";
import Home from "./components/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SubscriptionDetails from "./components/SubscriptionDetails";
import Settings from "./components/Settings";
import AllSubscriptions from "./components/AllSubscriptions";

const Analytics = React.lazy(() => import("./components/Analytics"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/subscription/:name" element={<SubscriptionDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/subscriptions" element={<AllSubscriptions />} />
      </Routes>
    </Router>
  );
}

export default App;
