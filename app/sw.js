const CACHE_NAME = 'saudi-ease-v1';
const OFFLINE_URL = '/offline';

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/offline',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install event - precache key assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If offline, serve the offline page
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // For non-navigation requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response or not a GET request
            if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
              return response;
            }

            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // For image requests when offline, you could return a default image
            if (event.request.destination === 'image') {
              return caches.match('/offline-image.jpg');
            }
            
            return null;
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'document-upload') {
    event.waitUntil(syncDocuments());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/badge-icon.png',
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Example function to handle syncing documents
async function syncDocuments() {
  // In a real app, this would retrieve cached form submissions and try to send them
  // For demonstration purposes, this is a placeholder
  try {
    const pendingDocuments = await getPendingDocuments();
    for (const doc of pendingDocuments) {
      await uploadDocument(doc);
      await markDocumentSynced(doc.id);
    }
    return true;
  } catch (error) {
    console.error('Document sync failed:', error);
    return false;
  }
}

// Placeholder functions for document handling
async function getPendingDocuments() {
  // In a real app, this would retrieve from IndexedDB
  return [];
}

async function uploadDocument(doc) {
  // In a real app, this would POST to your API
  return true;
}

async function markDocumentSynced(id) {
  // In a real app, this would update IndexedDB
  return true;
}