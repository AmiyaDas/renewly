const sendNotification = (title, options) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification(title, options);
    }
  });
};

export { sendNotification };
