import { sendNotification } from "../services/PushHandler";

function TestPush() {
  const handlePushNotification = () => {
    sendNotification("Test Notification", {
      body: "This is a test notification",
      icon: "/renewly/logo_xl.ico",
    });

    //for native app
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "REGISTER_PUSH",
          payload: { text: "hello notification" },
        })
      );
    }
  };
  return (
    <div className="App">
      <h1>React Push Notifications Demo</h1>
      <p>Allow notifications in your browser to test</p>
      <button
        className="bg-black text-white px-4 py-1 mb-4 rounded-lg save-button"
        onClick={() => handlePushNotification()}
      >
        Send Notification
      </button>
    </div>
  );
}

export default TestPush;
