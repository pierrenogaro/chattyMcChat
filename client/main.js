const socket = io('http://localhost:8080');// wss://chatserver.pierrenogaro.com
const button = document.querySelector("button");

socket.on('message', (message) => {
    console.log(message);
    const ligne = document.createElement('li')
    ligne.innerHTML = message.author+ " a écrit : "+message.content;
    document.querySelector('ul').appendChild(ligne)
})

button.addEventListener('click', (e) => {
    const toSend = document.querySelector('input').value;
    socket.emit('message', {
        content: toSend,
    });
})