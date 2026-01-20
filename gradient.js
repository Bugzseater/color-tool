const preview = document.getElementById("gradientPreview");
const type = document.getElementById("type");
const angle = document.getElementById("angle");
const angleVal = document.getElementById("angleVal");
const colorsDiv = document.getElementById("colors");
const cssCode = document.getElementById("cssCode");
const tailwindCode = document.getElementById("tailwindCode");
const cssVarCode = document.getElementById("cssVarCode");



function updateGradient() {
  const colors = [...colorsDiv.querySelectorAll("input")]
    .map(i => i.value);

  const colorList = colors.join(", ");

  let gradient = "";
  if (type.value === "linear") {
    gradient = `linear-gradient(${angle.value}deg, ${colorList})`;
  } else {
    gradient = `radial-gradient(${colorList})`;
  }

  // Preview
  preview.style.background = gradient;
  cssCode.textContent = `background: ${gradient};`;

  // Tailwind export (approximation)
  if (colors.length >= 2) {
    tailwindCode.textContent =
      `bg-gradient-to-r from-[${colors[0]}] to-[${colors[colors.length - 1]}]`;
  }

  // CSS Variables export
  let vars = `:root {\n`;
  colors.forEach((c, i) => {
    vars += `  --color-${i+1}: ${c};\n`;
  });
  vars += `  --gradient: ${gradient};\n}`;
  cssVarCode.textContent = vars;
}


angle.oninput = () => {
  angleVal.textContent = angle.value + "°";
  updateGradient();
};

type.onchange = updateGradient;

colorsDiv.addEventListener("input", updateGradient);

document.getElementById("addColor").onclick = () => {
  if (colorsDiv.children.length >= 5) return;
  const input = document.createElement("input");
  input.type = "color";
  input.value = randomColor();
  colorsDiv.appendChild(input);
  updateGradient();
};

document.getElementById("random").onclick = () => {
  colorsDiv.innerHTML = "";
  const count = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < count; i++) {
    const input = document.createElement("input");
    input.type = "color";
    input.value = randomColor();
    colorsDiv.appendChild(input);
  }
  updateGradient();
};

document.getElementById("copyCss").onclick = () => {
  navigator.clipboard.writeText(cssCode.textContent);
};

document.getElementById("copyTailwind").onclick = () =>
  navigator.clipboard.writeText(tailwindCode.textContent);

document.getElementById("copyVars").onclick = () =>
  navigator.clipboard.writeText(cssVarCode.textContent);


function randomColor() {
  return "#" + Math.floor(Math.random()*16777215)
    .toString(16).padStart(6,"0");
}

let animated = false;


updateGradient();
