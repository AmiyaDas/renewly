import { sendNotification } from "../services/PushHandler";
import { useState } from "react";

let count = 0;

function TestPush() {
  const [errorMsg, setErrorMsg] = useState("");
  const handlePushNotification = (title, body, icon) => {
    try {
      const type = sendNotification(title, body, icon);
      count++;
      setErrorMsg(`sucessfully sent ${type} notification: ${count} times`);
    } catch (err) {
      setErrorMsg(err);
    }
  };
  return (
    <div className="App">
      <h1>React Push Notifications Demo</h1>
      <p>Allow notifications in your browser to test</p>
      <p>{errorMsg}</p>
      <button
        className="bg-black text-white px-4 py-1 mb-4 rounded-lg save-button"
        onClick={() =>
          handlePushNotification(
            "Test Notification",
            "This is a test notification",
            "/renewly/logo_xl.ico"
          )
        }
      >
        Send Notification
      </button>
    </div>
  );
}

export default TestPush;
