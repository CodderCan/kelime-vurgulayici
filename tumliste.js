chrome.storage.local.get({ kelimeler: [] }, ({ kelimeler }) => {
  const liste = document.getElementById("tumListe");
  kelimeler.forEach(({ kelime, renk }) => {
    const div = document.createElement("div");
    div.className = "kelime-item";
    div.innerHTML = `
      <span style="background:${renk}">${kelime}</span>
      <button>🗑️</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      const yeni = kelimeler.filter(k => k.kelime !== kelime);
      chrome.storage.local.set({ kelimeler: yeni }, () => location.reload());
    });
    liste.appendChild(div);
  });
});
