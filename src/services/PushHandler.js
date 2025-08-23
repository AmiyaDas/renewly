const sendNotification = (title, options) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.showNotification(title, options);
        }
      });
    }
  });
};

export { sendNotification };
