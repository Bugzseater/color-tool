const container = document.getElementById("palettes");
const BATCH = 20;

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <span id="closeModal">×</span>
    <h3>Palette Details</h3>
    <div id="modalColors"></div>
    <button id="copyAll">Copy All</button>
  </div>
`;
document.body.appendChild(modal);

const modalColors = modal.querySelector("#modalColors");
const copyAll = modal.querySelector("#copyAll");
const closeModal = modal.querySelector("#closeModal");

let selectedPalette = [];

function randomColor() {
  return "#" + Math.floor(Math.random()*16777215)
    .toString(16).padStart(6,"0");
}

function saveFavorite(colors) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(colors);
  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("Saved ❤️");
}

function openModal(colors) {
  selectedPalette = colors;
  modalColors.innerHTML = "";
  colors.forEach(c => {
    const d = document.createElement("div");
    d.style.background = c;
    d.textContent = c;
    modalColors.appendChild(d);
  });
  modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";

copyAll.onclick = () =>
  navigator.clipboard.writeText(selectedPalette.join(", "));

function createPalette() {
  const palette = document.createElement("div");
  palette.className = "palette";

  const row = document.createElement("div");
  const colors = [];

  for (let i = 0; i < 4; i++) {
    const c = randomColor();
    colors.push(c);
    const span = document.createElement("span");
    span.style.background = c;
    row.appendChild(span);
  }

  row.onclick = () => openModal(colors);

  const actions = document.createElement("div");
  actions.className = "actions";

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.onclick = () =>
    navigator.clipboard.writeText(colors.join(", "));

  const favBtn = document.createElement("button");
  favBtn.textContent = "❤️";
  favBtn.onclick = () => saveFavorite(colors);

  actions.append(copyBtn, favBtn);
  palette.append(row, actions);
  container.appendChild(palette);
}

function loadPalettes() {
  for (let i = 0; i < BATCH; i++) createPalette();
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPalettes();
  }
});

loadPalettes();
