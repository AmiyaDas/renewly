const sendNotification = (title, options) => {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        reg.showNotification(title, options);
      }
    });
  }
};

export { sendNotification };
