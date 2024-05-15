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