module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https://chat-backend-ovra.onrender.com"],
          "frame-ancestors": ["'self'"],
          "img-src": ["'self'", "data:", "blob:"],
          "media-src": ["'self'", "data:", "blob:"],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: "*", // Allow all origins (can be restricted later)
      headers: "*", // Allow all headers
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Ensure POST is allowed
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
