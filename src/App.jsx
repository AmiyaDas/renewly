import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import AddSubscription from "./components/AddSubscription";
import Home from "./components/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SubscriptionDetails from "./components/SubscriptionDetails";
import Settings from "./components/Settings";
import AllSubscriptions from "./components/AllSubscriptions";
import Calendar from "./components/Calendar";
import Privacy from "./components/Privacy";
import SocialSignInPage from "./components/SocialSignInPage";
import UserProfilePage from "./components/UserProfilePage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { PreferencesContext } from "./context/PreferencesContext";
import TestPush from "./components/TestPush";

const Analytics = React.lazy(() => import("./components/Analytics"));

function App() {
  const { user, setUser } = useContext(PreferencesContext);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Routes>
        {checkingAuth ? null : !user ? (
          <Route
            path="*"
            element={
              <SocialSignInPage guestSignIn={() => setUser({ guest: true })} />
            }
          />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddSubscription />} />
            <Route
              path="/subscription/:name"
              element={<SubscriptionDetails />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/subscriptions" element={<AllSubscriptions />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/test" element={<TestPush />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
