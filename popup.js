// Sayfa yüklendiğinde gerekli olayları tanımla
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("kaydetBtn").addEventListener("click", kelimeEkle);
  document.getElementById("arama").addEventListener("input", kelimeListele);
  document.getElementById("tumunuGor").addEventListener("click", () => {
    window.open("tumliste.html", "_blank");
  });
  document.getElementById("disariAktar").addEventListener("click", disariAktar);
  document.getElementById("iceAktar").addEventListener("click", iceAktar);

  // Dil seçimini uygula
  chrome.storage.local.get({ dil: "tr" }, ({ dil }) => {
    const dilSec = document.getElementById("dilSec");
    if (dilSec) {
      dilSec.value = dil;
      applyTranslations(dil);
    }
  });

  document.getElementById("dilSec").addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    chrome.storage.local.set({ dil: selectedLang }, () => {
      applyTranslations(selectedLang);
      kelimeListele();
    });
  });

  kelimeListele();
});

// Kelime ekleme işlemi
function kelimeEkle() {
  const kelimeInput = document.getElementById("kelimeInput").value.trim();
  const renk = document.getElementById("renkSec").value;
  if (!kelimeInput) return;

  const yeniKelimeler = kelimeInput.split("\n").map(k => ({ kelime: k.trim().toLowerCase(), renk }));

  chrome.storage.local.get({ kelimeler: [] }, ({ kelimeler }) => {
    const guncel = [...kelimeler, ...yeniKelimeler];
    chrome.storage.local.set({ kelimeler: guncel }, () => {
      document.getElementById("kelimeInput").value = "";
      kelimeListele();
    });
  });
}

// Kelime listesini yazdır
function kelimeListele() {
  chrome.storage.local.get({ kelimeler: [] }, ({ kelimeler }) => {
    kelimeler.sort((a, b) => a.kelime.localeCompare(b.kelime));

    const arama = document.getElementById("arama").value.toLowerCase();
    const filtrelenmis = kelimeler.filter(k => k.kelime.includes(arama));
    const ilk10 = filtrelenmis.slice(0, 10);

    const lang = document.getElementById("dilSec").value || "tr";
    const kelimeSayisiText = translations[lang] && translations[lang].kelimeSayisi
      ? translations[lang].kelimeSayisi.replace("{count}", kelimeler.length)
      : `${kelimeler.length} kayıtlı kelime var`;
    document.getElementById("kelimeSayisi").textContent = kelimeSayisiText;


    const liste = document.getElementById("kelimeListesi");
    liste.innerHTML = "";

    ilk10.forEach(({ kelime, renk }) => {
      const item = document.createElement("div");
      item.className = "kelime-item";

      const span = document.createElement("span");
      span.className = "kelime-text";
      span.style.backgroundColor = renk;
      span.textContent = kelime;

      const btn = document.createElement("button");
      btn.className = "sil-btn";
      btn.textContent = "🗑️";
      btn.onclick = () => {
        const yeni = kelimeler.filter(k => k.kelime !== kelime);
        chrome.storage.local.set({ kelimeler: yeni }, kelimeListele);
      };

      item.appendChild(span);
      item.appendChild(btn);
      liste.appendChild(item);
    });
  });
}

// Dışa Aktar
function disariAktar() {
  chrome.storage.local.get({ kelimeler: [] }, ({ kelimeler }) => {
    const blob = new Blob([JSON.stringify(kelimeler, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kelimeler.json";
    a.click();
    URL.revokeObjectURL(url);
  });
}

// İçe Aktar
function iceAktar() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const yeniKelimeler = JSON.parse(reader.result);
        chrome.storage.local.set({ kelimeler: yeniKelimeler }, () => location.reload());
      } catch (e) {
        alert("Geçersiz dosya formatı.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// 🌐 Dil çeviri
let translations = {};

fetch("i18n_translations.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    chrome.storage.local.get({ dil: "tr" }, ({ dil }) => {
      document.getElementById("dilSec").value = dil;
      applyTranslations(dil);
    });
  });

// Dil verilerini HTML'ye uygula
function applyTranslations(lang) {
  // data-i18n olan tüm metinleri çevir
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  // data-i18n-placeholder olan input ve textarea'lara placeholder çevirisi uygula
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // <option> içindeki renkler gibi özel çeviriler
  document.querySelectorAll("option[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

