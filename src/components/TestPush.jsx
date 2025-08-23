import { sendNotification } from "../services/PushHandler";

function TestPush() {
  return (
    <div className="App">
      <h1>React Push Notifications Demo</h1>
      <p>Allow notifications in your browser to test</p>
      <button
        className="bg-black text-white px-4 py-1 mb-4 rounded-lg save-button"
        onClick={() =>
          sendNotification("Test Notification", {
            body: "This is a test notification",
            icon: "/renewly/logo_xl.ico",
          })
        }
      >
        Send Notification
      </button>
    </div>
  );
}

export default TestPush;
