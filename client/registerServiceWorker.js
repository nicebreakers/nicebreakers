export default function register() {
  // Register the service worker
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = 'service-worker.js'
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // TODO: Display notice to users to reload.
                }
              }
            }
          }
        })
        .catch(error => {
          console.error('Error during service worker registration:', error)
        })
    })
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
