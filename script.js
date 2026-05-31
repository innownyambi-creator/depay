function sendMessage() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const msg = document.getElementById("msgInput").value.trim();
  const output = document.getElementById("formMsg");

  if (!name || !email || !msg) {
    output.style.color = "red";
    output.textContent = "Please fill in all fields!";
    return;
  }

  output.style.color = "green";
  output.textContent = `Thanks ${name}! Your message has been sent.`;

  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("msgInput").value = "";
}