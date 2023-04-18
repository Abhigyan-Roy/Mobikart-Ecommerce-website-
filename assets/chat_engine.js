let socket = new WebSocket('ws://152.58.139.66:5000','echo-protocol');
socket.addEventListener("add", (ev) => {
    socket.send(JSON.stringify({"type": "getplayerinfo", "token": token}));
    });
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.chats');
let sendButton=document.querySelector('.send-btn');
socket.addEventListener('open', (event) => {
  console.log('Connected to server');
});

socket.addEventListener('message', (event) => {
  console.log('Received message:', event.data);
  appendMessage(event.data,'incoming');
});

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <p>${msg}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

function sendMessage() {
  let message = textarea.value.trim();
  if(message){
    appendMessage(message,'outgoing');
    socket.send(message);
    textarea.value = '';
  }
}

document.querySelector('.send-btn').addEventListener('click', (event) => {
  event.preventDefault();
  sendMessage();
});

document.querySelector('#textarea').addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});