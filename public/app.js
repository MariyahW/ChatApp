const form = document.querySelector('form');
const input = document.getElementById('input');
document.addEventListener('DOMContentLoaded',()=>{

const socket = io();
let typing = false;
form.addEventListener('submit', event=>{
    event.preventDefault();
    socket.emit('stop typing');
    socket.emit('chat message', input.value);
});


input.addEventListener('input', ()=>{
    if(!typing){
        typing=true;
        socket.emit('stop typing');
    }
    setTimeout(() => {
       typing=false;
       socket.emit('stop typing');

    }, 2000);
})

})