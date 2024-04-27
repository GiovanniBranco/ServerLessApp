const BASE_URL = "https://b5hr8oqjfh.execute-api.us-east-1.amazonaws.com";

document.querySelector("#submit").addEventListener("click", async (e) => {
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!username || !password) alert("Por favor preencha todos os campos");

  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const { token } = await response.json();

    window.localStorage.setItem("token", token);
    window.location.href = "/";
  } else {
    alert("Usuario ou senha inválidos");
  }
});
