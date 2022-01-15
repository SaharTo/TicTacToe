const express = require('express')
const app = express();
const http = require('http');
const cors = require("cors")
const { Server } = require("socket.io")
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined to room: ${data}`)
    })
    socket.on("make_move", (data) => {
        console.log("this is the data receive in make move : ", data)
        socket.to(data.room).emit("receive_move", data)

    })
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})



server.listen(3001, () => {
    console.log("X O Server is running...");
});