let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.chats');
let sendButton = document.querySelector('.send-btn');

const socket = io("http://localhost:5000");

socket.connect()
socket.on('server-replied', handleServerReply)

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
  if (message) {
    appendMessage(message, 'outgoing');
    socket.emit("user-queried", { query: message })
    textarea.value = '';
  }
}

function handleServerReply(message) {
  console.log(message)
  appendMessage(message.reply, 'incoming')
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