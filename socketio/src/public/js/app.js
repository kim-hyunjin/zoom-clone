const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
  console.log(`backend says: ${msg}`);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  // 첫번째는 이벤트명을 넣어준다.
  // 두번째 인자부터 다양한 타입의 데이터를 가변인자로 제한없이 보낼 수 있다.
  // 마지막 인자로 서버작업완료시 호출받을 콜백함수를 넣는다.
  socket.emit("enter_room", input.value, backendDone);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
