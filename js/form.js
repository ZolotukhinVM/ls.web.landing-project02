const form = document.querySelector(".form");
const send = document.querySelector("#send");
const overlayForm = document.querySelector('.overlay-form');
const message = document.querySelector('.message__info');
const btnClose = document.querySelector('.btn-form');

send.addEventListener('click', event => {
  event.preventDefault();
  if (validateForm(form)) {
    let data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      comment: form.elements.comment.value,
      to: "test@test.test"
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));

    let messageText = "";

    function showModal (messageText = "Ошибка сервера") {
      message.textContent = messageText;
      overlayForm.classList.add("overlay-form--active");
      document.body.classList.add("body--active-menu");
      btnClose.addEventListener("click", (e) => {
        e.preventDefault();
        overlayForm.classList.remove("overlay-form--active");
        document.body.classList.remove("body--active-menu");
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status <= 200) {
        messageText = xhr.response.message;
      }
      showModal(messageText);
    });

    xhr.addEventListener("error", (e) => {
      showModal();
    });
  }
  function validateForm(form) {
    let valid = true;
    if (!validateField(form.elements.name)) {
      valid = false;
    }
    if (!validateField(form.elements.phone)) {
      valid = false;
    }
    if (!validateField(form.elements.comment)) {
      valid = false;
    }
    return valid;
  }
  function validateField(field) {
    if (!field.checkValidity()) {
      field.classList.add("form__input--error");
      return false;
    } else {
      field.classList.remove("form__input--error");
      return true;
    }
  }
});
