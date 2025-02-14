const jwt = require("jsonwebtoken");
const SECRET = process.env.ADMIN_JWT_SECRET; // Use the same secret as in Strapi config

module.exports = ({ strapi }) => {
    // Wait for the HTTP server to start
    strapi.server.httpServer.on('listening', () => {
        const { Server } = require('socket.io');
        const io = new Server(strapi.server.httpServer, {
            cors: {
                origin: "*", // Allow all origins (adjust this for production)
            },
        });

        io.on("connection", (socket) => {
            console.log("New client connected:", socket.id);

            socket.on("message", (data) => {
                const { token, text, username } = data;

                try {
                    // Verify the JWT token
                    const decoded = jwt.verify(token, SECRET);

                    console.log(`Message from ${username || decoded?.username}: ${text}`);

                    // Broadcast the message back to all clients (including the sender)
                    io.emit("message", {
                        sender: "Server",
                        text: text,
                    });
                } catch (error) {
                    console.error("Authentication failed:", error);

                    // Notify the specific client of authentication failure
                    socket.emit("message", "Authentication failed. Please log in again.");
                }
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });

        strapi.io = io; // Make io instance available through strapi
    });
};