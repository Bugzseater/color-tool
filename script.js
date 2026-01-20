const palettesDiv = document.getElementById("palettes");
const selectedDiv = document.getElementById("selectedColors");

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

// Generate random palettes
for (let i = 0; i < 20; i++) {   // 20k kiyala idea eka, demo 20
  const palette = document.createElement("div");
  palette.className = "palette";

  const colorsDiv = document.createElement("div");
  colorsDiv.className = "colors";

  const colors = [];

  for (let j = 0; j < 4; j++) {
    const c = randomColor();
    colors.push(c);

    const colorBox = document.createElement("div");
    colorBox.style.background = c;
    colorsDiv.appendChild(colorBox);
  }

  palette.appendChild(colorsDiv);

  palette.onclick = () => {
    document.querySelectorAll(".palette").forEach(p => p.classList.remove("selected"));
    palette.classList.add("selected");
    showSelected(colors);
  };

  palettesDiv.appendChild(palette);
}

function showSelected(colors) {
  selectedDiv.innerHTML = "";
  colors.forEach(c => {
    const box = document.createElement("div");
    box.style.background = c;
    box.title = c;
    selectedDiv.appendChild(box);
  });
}
