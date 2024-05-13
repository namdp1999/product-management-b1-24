import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = showAlert.getAttribute("data-time");
  time = parseInt(time);

  // Sau time giây sẽ đóng thông báo
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  // Khi click vào nút close-alert sẽ đóng luôn
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End show-alert

// Update Cart
const tableCart = document.querySelector("[table-cart]");
if(tableCart) {
  const listInputQuantity = tableCart.querySelectorAll("input[name='quantity']");
  listInputQuantity.forEach(input => {
    input.addEventListener("change", () => {
      const quantity = input.value;
      const productId = input.getAttribute("item-id");

      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
// End Update Cart

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData) {
  formSendData.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = formSendData.content.value;
    
    if(content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      formSendData.content.value = "";
    }
  })
}
// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");

  const div = document.createElement("div");

  let htmlFullName = "";
  
  if(myId == data.user_id) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  }
  
  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `;

  body.appendChild(div);
})
// End SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const chatBody = document.querySelector(".chat .inner-body");
if(chatBody) {
  chatBody.scrollTop = chatBody.scrollHeight;
}
// End Scroll Chat To Bottom

// Show Tooltip emoji
const buttonIcon = document.querySelector(".button-icon");
if(buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  })
}
// End Show Tooltip emoji

// emoji-picker
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode;
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    inputChat.value = inputChat.value + icon;
  });
}
// End emoji-picker