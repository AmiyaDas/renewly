import "./App.css";
import React from "react";
import AddSubscription from "./components/AddSubscription";
import Home from "./components/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SubscriptionDetails from "./components/SubscriptionDetails";
import Settings from "./components/Settings";
import AllSubscriptions from "./components/AllSubscriptions";
import Calendar from "./components/Calendar";
import Privacy from "./components/Privacy";

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
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;
