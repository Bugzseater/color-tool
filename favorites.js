const container = document.getElementById("favorites");
const modal = document.getElementById("modal");
const modalColors = document.getElementById("modalColors");
const copyAll = document.getElementById("copyAll");
const closeModal = document.getElementById("closeModal");

let selectedPalette = [];

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  container.innerHTML = "<p>No favorites yet 😢</p>";
}

favorites.forEach(palette => {
  const card = document.createElement("div");
  card.className = "palette";

  const row = document.createElement("div");
  palette.forEach(c => {
    const span = document.createElement("span");
    span.style.background = c;
    row.appendChild(span);
  });

  card.appendChild(row);
  card.onclick = () => openModal(palette);
  container.appendChild(card);
});

function openModal(colors) {
  selectedPalette = colors;
  modalColors.innerHTML = "";
  colors.forEach(c => {
    const div = document.createElement("div");
    div.style.background = c;
    div.textContent = c;
    modalColors.appendChild(div);
  });
  modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";

copyAll.onclick = () => {
  navigator.clipboard.writeText(selectedPalette.join(", "));
  copyAll.textContent = "Copied!";
  setTimeout(() => copyAll.textContent = "Copy All", 1000);
};
