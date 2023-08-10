const express = require('express')
const cors = require('cors')
const mongoose= require('mongoose')
const userRoutes= require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoute')
const socket = require('socket.io');
const path = require('path')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "/chatting-api/public")))

  app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "chatting-api", "public", 'index.html'))
  
  })
  
}else{
  app.get("/", (req, res) => {
    res.send("API is runnnig successfully")
  })
}




mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("Connected DB")
})
.catch((err)=> {
    console.log(err.message)
});


const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
    cors: {
      origin: "http://localhost:5000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
