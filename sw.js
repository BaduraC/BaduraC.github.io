self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    self.skipWaiting();
  });
  
  self.addEventListener('message', event => {
    // Assuming event.data contains the notification data
  const { title, body} = event.data;

  

  // Show the notification
  self.registration.showNotification(title);
});