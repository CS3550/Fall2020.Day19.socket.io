const express = require("express")
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static("./public"))

let model = [];
let X = "X";
let O = "O";
let BLANK = "&nbsp;";
let BOARD_FULL = "BOARD FULL";


for (let i = 0; i < 9; i++) {
    model[i] = BLANK;
}

app.get("/getModel", (req, res) => {
    console.log("Someone got the model")
    res.send(model);
})

app.get("/setModel/:model", (req,res)=>{
    model = req.params.model;
    console.log(model);
    res.send("ok");

})

io.on('connection', function(socket){
    console.log('a user connected ' + socket.id);
    
    socket.on('join', function(msg){
      
      console.log("join request");
      socket.emit('joinaccept', model);
      
    });
    
    socket.on('disconnect', function(){
      console.log("disconnected");
    })
  });

http.listen(5555, function (err) {
// app.listen(5555, function (err) {
    if (err) return console.error(err);
    console.log("We are listening on http://localhost:5555");
})