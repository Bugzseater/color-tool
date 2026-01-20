const picker = document.getElementById("picker");
const preview = document.getElementById("preview");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");

picker.addEventListener("input", () => {
  const c = picker.value;
  preview.style.background = c;
  hex.textContent = c;

  const r = parseInt(c.substr(1,2),16);
  const g = parseInt(c.substr(3,2),16);
  const b = parseInt(c.substr(5,2),16);
  rgb.textContent = `rgb(${r}, ${g}, ${b})`;
});

document.getElementById("copyHex").onclick = () =>
  navigator.clipboard.writeText(hex.textContent);

document.getElementById("copyRgb").onclick = () =>
  navigator.clipboard.writeText(rgb.textContent);
