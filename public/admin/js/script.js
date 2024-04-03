// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0) {
  let url = new URL(window.location.href);

  listButtonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if(status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value;

    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

// Button Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
  let url = new URL(window.location.href);

  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Button Pagination

// button-change-status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");

  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const status = button.getAttribute("data-status");
      const path = formChangeStatus.getAttribute("data-path");

      const action = `${path}/${status}/${id}?_method=PATCH`;

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End button-change-status

// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const listInputId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked) {
      listInputId.forEach(input => {
        input.checked = true;
      });
    } else {
      listInputId.forEach(input => {
        input.checked = false;
      });
    }
  });

  listInputId.forEach(inputId => {
    inputId.addEventListener("click", () => {
      const countInputIdChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      const lengthInputId = listInputId.length;
      
      if(countInputIdChecked == lengthInputId) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox-multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = formChangeMulti.querySelector("select[name='type']").value;
    
    const listInputIdChecked = document.querySelectorAll("input[name='id']:checked");
    if(listInputIdChecked.length > 0) {
      const ids = [];

      listInputIdChecked.forEach(input => {
        const id = input.value;

        if(type == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      const stringIds = ids.join(", ");

      const input = formChangeMulti.querySelector("input[name='ids']");
      input.value = stringIds;

      if(type == "delete-all") {
        const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
        if(!isConfirm) {
          return;
        }
      }

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
// End form-change-multi

// button-delete
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
  const formDeleteItem = document.querySelector("[form-delete-item]");

  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa?");

      if(isConfirm) {
        const id = button.getAttribute("data-id");
        const path = formDeleteItem.getAttribute("data-path");
  
        const action = `${path}/${id}?_method=DELETE`;
  
        formDeleteItem.action = action;
  
        formDeleteItem.submit();
      }
    });
  });
}
// End button-delete

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

// upload-image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End upload-image