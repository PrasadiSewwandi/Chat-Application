var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io') (http);
var app = express();
var server = app.listen(3000,() =>{
    console.log('server is running on port', server.address().port);
});
app.use(express.static(__dirname));
var dbUrl = 'mongodb://username:pass@ds257981.mlab.com:57981/chatApplicationDB'
mongoose.connect(dbUrl , (err) => {
    console.log('mongodb connected', err);
});
var Message = mongoose.model('Message',{name : String, message : String})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/messages',(req,res) =>{
    Message.find({},(err, message)=> {
        res.send(message);
    })
});
app.post('/messages',(req,res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if(err)
        sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
});
io.on('connection', ()=>{
    console.log('a user isconnected')
})
