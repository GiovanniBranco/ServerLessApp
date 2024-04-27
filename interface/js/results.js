const queryString = new URLSearchParams(window.location.search);
const resultId = queryString.get("id");
const TOKEN = window.localStorage.getItem("token");

if (!TOKEN) window.location.href = "/login.html";

const bail = () => {
  alert("Nenhum resultado encontrado");
};

if (!resultId) bail();

fetch(`${BASE_URL}/api/results${resultId}`, {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
})
  .then((r) => {
    if (!r.ok) bail();
    return r.json();
  })
  .then((result) => {
    document.getElementById("student-name").innerText = result.name;
    document.getElementById("correct").innerText = result.totalCorrectAnswers;
  })
  .catch((e) => {
    console.error(e);
    bail();
  });
