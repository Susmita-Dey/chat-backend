const registerSocket = require('./socket.js');

module.exports = {
  async bootstrap({ strapi }) {
    // Register the socket
    registerSocket({ strapi });
  }
}
