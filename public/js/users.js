// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userIdB = button.getAttribute("btn-add-friend");
      
      socket.emit("CLIENT_ADD_FRIREND", userIdB);
    })
  })
}
// Hết Chức năng gửi yêu cầu

// Chức năng gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userIdB = button.getAttribute("btn-cancel-friend");
      
      socket.emit("CLIENT_CANCEL_FRIREND", userIdB);
    })
  })
}
// Hết Chức năng gửi yêu cầu

// Chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");

      const userIdB = button.getAttribute("btn-refuse-friend");
      
      socket.emit("CLIENT_REFUSE_FRIREND", userIdB);
    })
  })
}
// Hết Chức năng từ chối kết bạn

// Chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");

      const userIdB = button.getAttribute("btn-accept-friend");
      
      socket.emit("CLIENT_ACCEPT_FRIREND", userIdB);
    })
  })
}
// Hết Chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeUsersAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`);
  if(badgeUsersAccept) {
    badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
  }
});
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND