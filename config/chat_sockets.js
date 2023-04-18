function serverSide(io){
    io.on('connection', function(socket){
      console.log('connected with sockets',socket.id);
      
      let questions = {
        'Hi': 'Hello!',
        'How are you?': 'I am fine, thank you!',
        'What is your name?': 'My name is ChatBot!'
      };
  
      socket.on('message', (msg) => {
        console.log('Message received:', msg);
        let response = questions[msg] || 'I did not understand your question!';
        socket.send(response);
      });
    });
  }
  
  module.exports = serverSide;