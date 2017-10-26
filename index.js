var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
    console.log('连接啦')
    socket.on('disconnect',function(){
        console.log('有个人不连接了')
    })
})

io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
    socket.broadcast.emit('hi');
  });
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});