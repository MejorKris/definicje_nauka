function checkDefinition() {
  const term = document.getElementById("term").innerText;
  const userDef = document.getElementById("definitionInput").value;

  fetch("check.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `term=${encodeURIComponent(term)}&definition=${encodeURIComponent(userDef)}`
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("result").innerText = result;
  });
}
