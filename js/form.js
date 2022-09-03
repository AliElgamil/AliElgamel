(function () {
  emailjs.init("Fm3JYo6_U475aI-uz");
})();

function validate() {
  let loader = document.querySelector(".loader");
  let name = document.querySelector(".username");
  let email = document.querySelector(".email");
  let msg = document.querySelector(".message");
  let btn = document.querySelector(".submit");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (name.value == "" || email.value == "" || msg.value == "") {
      emptyerror();
    } else {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) &&
        name.value.match(/^[A-Za-z]+$/)
      ) {
        sendmail(name.value, email.value, msg.value);
        success();
        name.value = "";
        email.value = "";
        msg.value = "";
      } else {
        error();
      }
    }
  });
}
validate();

function sendmail(name, email, msg) {
  return emailjs.send("service_w8iso4q", "template_hr668qe", {
    from_name: name,
    to_name: email,
    message: msg,
  });
}

function emptyerror() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Fields cannot be empty!",
  });
}

function error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
}

function success() {
  Swal.fire({
    icon: "success",
    title: "Success...",
    text: "Successfully sent message",
  });
}
