if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('Service Worker Registered', reg))
    .catch((err) => console.log('Service Worker Registration Failed', err));
    
}

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