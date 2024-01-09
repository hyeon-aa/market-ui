// function displayChat(chat) {
//   const chatparentdiv = document.querySelector("#buyer-msg");
//   const timeparentdiv = document.querySelector("#buyer-time");
//   let chatdiv = null;
//   let timediv = null;
//   for (let i = 0; i < 10; i++) {
//     chatdiv = document.createElement("div");
//     chatdiv.id = "chatdiv" + i;
//     timediv = document.createElement("div");
//     timediv.id = "timediv" + i;
//   }
//   chatdiv.innerText = `${chat.content}`;
//   timediv.innerText = `[id:${chat.id}]`;
//   chatdiv.style =
//     "background-color: orange;  border-radius: 80px; padding: 10px 10px 10px 10px;";
//   timediv.style = "padding: 10px 10px 10px 10px;";
//   chatparentdiv.appendChild(chatdiv);
//   timeparentdiv.appendChild(timediv);
// }

const displayChat = (chat) => {
  chat.forEach((obj) => {
    const chatparentdiv = document.querySelector("#buyer-msg");
    const timeparentdiv = document.querySelector("#buyer-time");
    chatdiv = document.createElement("div");
    chatdiv.id = "chatdiv";
    timediv = document.createElement("div");
    timediv.id = "timediv";

    // chatdiv.innerText = `${chat.content}`;
    // timediv.innerText = `[id:${chat.id}]`;

    chatdiv.innerText = obj.content;
    timediv.innerText = obj.id;
    chatdiv.style =
      "background-color: orange;  border-radius: 80px; padding: 10px 10px 10px 10px;";
    timediv.style = "padding: 10px 10px 10px 10px;";
    chatparentdiv.appendChild(chatdiv);
    timeparentdiv.appendChild(timediv);
  });
};

async function readChat() {
  const res = await fetch("/chats");
  const jsonRes = await res.json();
  console.log(jsonRes);
  const div = document.querySelector("#buyer-msg");
  div.innerHTML = "";
  displayChat(jsonRes);
  // jsonRes.forEach(displayChat);
}

async function createChat(value) {
  const res = await fetch("/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      // id:
      //   new Date().getHours().toString() +
      //   new Date().getMinutes().toString() +
      //   new Date().getSeconds().toString(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  readChat();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#input-msg");
  console.log(input.value);
  createChat(input.value);
  input.value = "";
}

const form = document.querySelector("#chat-form");
console.log("form", form);
form.addEventListener("submit", handleSubmit);
