const socket = io();
let roomName;

const welcome = document.getElementById("welcome");
const roomNameForm = welcome.querySelector("#roomName");
const nickNameForm = welcome.querySelector("#nickName");
roomNameForm.addEventListener("submit", handleRoomSubmit);
nickNameForm.addEventListener("submit", handleNicknameSubmit);
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = roomNameForm.querySelector("input");
  // 첫번째는 이벤트명을 넣어준다.
  // 두번째 인자부터 다양한 타입의 데이터를 가변인자로 제한없이 보낼 수 있다.
  // 마지막 인자로 서버작업완료시 호출받을 콜백함수를 넣는다.
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}
function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nickNameForm.querySelector("input");
  const value = input.value;
  socket.emit("nickname", value);
}

const room = document.getElementById("room");
room.hidden = true;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
  addMessage(`${user} left!`);
});

socket.on("new_message", addMessage);
