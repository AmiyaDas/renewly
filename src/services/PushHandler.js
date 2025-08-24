const sendNotification = (title, body, icon) => {
  // for native app
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "REGISTER_PUSH",
        payload: { title: title, body: body, icon: icon },
      })
    );
  } else {
    // for browser
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body: body, icon: icon });
      }
    });
  }
};

export { sendNotification };
