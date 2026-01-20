const container = document.getElementById("favorites");
const favs = JSON.parse(localStorage.getItem("favorites")) || [];

if(favs.length === 0){
  container.innerHTML = "<p class='section-desc'>No favorites yet. Save palettes you like ❤️</p>";
}

favs.forEach(colors=>{
  const palette = document.createElement("div");
  palette.className = "palette";

  const row = document.createElement("div");
  colors.forEach(c=>{
    const s = document.createElement("span");
    s.style.background = c;
    row.appendChild(s);
  });

  palette.appendChild(row);
  container.appendChild(palette);
});
