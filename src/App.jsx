import "./App.css";
import AddSubscription from "./components/AddSubscription";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubscriptionDetails from './components/SubscriptionDetails';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/subscription/:name" element={<SubscriptionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
