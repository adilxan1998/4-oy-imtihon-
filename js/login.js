
const elForm = document.querySelector(".login_form");
const elUsernameInput = document.querySelector(".username");
const elPasswordInput = document.querySelector(".password");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const usernameValue = elUsernameInput.value;
  const passwordInput = elPasswordInput.value;
  
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameValue,
      password: passwordInput,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("home.html");
      }else{
        alert("Email yoki Parol xato kiritilgan!")
      }
    });
});