var BASECONTROLLER = require('../controller/basecontroller');
var USERMODEL = require('../models/users_model').users
var BACKGAMMONMODEL = require('../models/game_model').tbl_backgammon;
var connections = {}
var users = {}

module.exports = (io) => {
  io.on("connection",async(socket) => {
    socket.on("create_room", async (user_id, balance) => {
      var room_id = Date.now();
      socket.join(room_id);
      console.log('user_id = ', user_id, ' room_id = ', room_id , ' <---> room created');
      connections[socket.id] = room_id;
      users[socket.id] = user_id;
      var date = new Date();
      var save_room = await BASECONTROLLER.data_save({room_id : room_id, creater_id: user_id, current_player: true, balance: balance, started_time: date}, BACKGAMMONMODEL);
      if (save_room) {
        var rooms = await BASECONTROLLER.Bfind(BACKGAMMONMODEL, {fulled: false, closed: false});
        io.sockets.emit('room_created', rooms, user_id, room_id);
      }
    })
    
    socket.on("join_room", async (room_id, user_id) => {
      console.log('join room user_id : ', user_id, ' room_id : ', room_id);
      connections[socket.id] = room_id;
      users[socket.id] = user_id;
      socket.join(room_id);

      var update_room = await BASECONTROLLER.BfindOneAndUpdate(BACKGAMMONMODEL, { room_id: room_id }, { fulled: true, user_id: user_id });
      
      if (update_room) {
        var myroom = await BASECONTROLLER.BfindOne(BACKGAMMONMODEL, { room_id : room_id, fulled : true, user_id: user_id });

        io.to(room_id).emit('player_joined', myroom);
      }

      var rooms = await BASECONTROLLER.Bfind(BACKGAMMONMODEL, {fulled: false, closed: false});

      io.sockets.emit('room_fulled', rooms);
    })

    socket.on('moved_piece', async (room_id, user_id, current_piece, x, y, triangle) => {
      io.to(room_id).emit('move_piece', current_piece, x, y, triangle)
    })
    
    socket.on("place_bet", async (room_id, user_id) => {
      var player = await BASECONTROLLER.BfindOne(BACKGAMMONMODEL, { room_id : room_id });
      
      var current_player;

      if (player.current_player == true) {
        current_player = false;
      } else {
        current_player = true
      }
      var update_room = await BASECONTROLLER.BfindOneAndUpdate(BACKGAMMONMODEL, { room_id: room_id }, { current_player: current_player })

      if (update_room) {
        io.to(room_id).emit('placed_bet', update_room);
      }
      console.log('user_id : ', user_id, ' room_id : ', room_id , ' placed bet');
    });

    socket.on("after_roll_dice", async (dice1, dice2, room_id, user_id, iPlayDice) => {
      io.to(room_id).emit('roll_dice', dice1, dice2, iPlayDice);
    })
    
    socket.on("finish_game", async (room_id, winner) => {
      
      socket.leave(room_id);

      var date = new Date();
      var finish_game = await BASECONTROLLER.BfindOneAndUpdate(BACKGAMMONMODEL, { room_id: room_id }, { closed: true, closed_time: date, winner});
      if (finish_game) {
        io.to(room_id).emit('game_over', winner);
      }
      console.log('user_id : ', user_id, ' room_id : ', room_id , ' left room');

      delete connections[socket.id];
      delete users[socket.id];
    })
    
    socket.on("disconnect", async () => {
      var dis_room = connections[socket.id];
      var dis_user = users[socket.id];
      console.log('dis_room : ', dis_room, ' dis_user : ', dis_user);

      socket.leave(dis_room);
      
      var date = new Date();
      var winner = await getAnotherUser(dis_room, dis_user);
      var fdata = await BASECONTROLLER.BfindOne(BACKGAMMONMODEL, { room_id: dis_room });

      if (winner !== '' && fdata.fulled) {
        io.to(dis_room).emit('game_over', winner);
      }

      var close_room = await BASECONTROLLER.BfindOneAndUpdate(BACKGAMMONMODEL, {room_id: dis_room}, {closed: true, closed_time: date, winner: winner});

      if (close_room) {
        
        var rooms = await BASECONTROLLER.Bfind(BACKGAMMONMODEL, {fulled: false, closed: false});

        io.sockets.emit('room_closed', rooms);

        delete connections[socket.id];
        delete users[socket.id];
      }
    })
  })
};

async function getAnotherUser (room_id, user_id) {
  var user_data = await BASECONTROLLER.BfindOne(BACKGAMMONMODEL, {room_id: room_id});
  if (user_data['creater_id'] == user_id) {
    return user_data['user_id'];
  } else {
    return user_data['creater_id'];
  }
}