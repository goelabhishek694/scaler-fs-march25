const express = require("express");
const http = require("http");
const { Server} = require("socket.io");
const path = require("path");
const app = express();
app.use(express.static("public"));
const server = http.createServer(app);
//this io is reponsible for handling all the socket connections
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    // setInterval(() => {
    //     socket.emit("message", "Hi from server - "+ socket.id + "at" + new Date());
    // }, 2000)

    //listen for disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id); 
    })

    socket.on("message", (data)=> {
        socket.broadcast.emit("broadcast", data)
    });
    let room;
    socket.on("create_grp", (roomId) => {
        console.log("group is created");
        //first participant
        room = roomId;
        socket.join(roomId);
    });

    socket.on("join_room", () => {
        console.log(socket.id + "joined the room", room);
        socket.join(room);
    });

    socket.on("grp_message", (data) => {
        console.log("grp_message", data);
    });

    socket.on("leave_room", () => {
        console.log(socket.id + "left the room", room);
        socket.leave(room);
    })
})

app.get("/", (req, res) => {
    // res.send("Hello World !")
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

server.listen(3000, () => console.log("Listening at port 3000"));