const express = require("express");
const app = express();
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.text());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (Socket) => {
  console.log("Socket is active to be connected");

  Socket.on("joinroom", ({ username, roomid }) => {
    const user = userJoin(Socket.id, username, roomid);
    Socket.join(user.room);
    console.log(user.username);
    Socket.to(user.room).emit("joinedmssg", user.username);
  });

  // for editor code transfer
  Socket.on("sendCode", (code) => {
    // console.log(code);
    io.emit("recivecode", code);
  });

  // for input transfer
  Socket.on("sendInput", (input) => {
    // console.log(input);
    io.emit("getInput", input);
  });

  Socket.on("disconnect", () => {
    const user = userLeave(Socket.id);
    if (user) {
      io.to(user.room).emit("leavemssg", user.username);

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.post("/", (req, res) => {
  const { code, lang, input } = req.body;
  // console.log(code);
  // console.log(input);

  fs.writeFile(__dirname + "/temp/runner.cpp", code, (err) => {
    if (err) {
      throw err;
    } else {
      fs.writeFile(__dirname + "/temp/in.txt", input, (err) => {
        if (err) {
          throw err;
        }
      });
      exec(
        "g++ ./temp/runner.cpp -o ./temp/runner.out && ./temp/runner.out < ./temp/in.txt",
        (err, stdout, stderr) => {
          console.log("Compiling....");
          if (err) {
            res.send(500, "Compilation error occured");
            console.log(err);
            // throw err;
          } else {
            if (stderr) {
              res.status(201).send("Runtime Error: " + stderr);
            } else {
              res.status(200).send(stdout);
            }
          }
          console.log("compilation end");
        }
      );
    }
  });
});

server.listen(4000, () => {
  console.log("Server has started at port 4000...");
});
