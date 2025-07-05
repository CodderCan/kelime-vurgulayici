# Kelime Vurgulayıcı / Word Highlighter

**Kelime Vurgulayıcı**, ziyaret ettiğiniz web sayfalarındaki belirlediğiniz kelime veya ifadeleri renklendirerek vurgulayan açık kaynaklı bir Chrome/Firefox tarayıcı uzantısıdır. Türkçe ve İngilizce ara yüz desteği, dışa/içe aktarma ve liste filtreleme gibi gelişmiş özellikler içerir.

---

## Özellikler

* 🖍️ **Özelleştirilebilir Renklendirme**: Dilediğiniz dört sabit renk arasında seçim yaparak kelimeleri vurgulayın.
* ➕ **Çoklu Kelime Ekleme**: Popup arayüzünden her satıra bir kelime veya cümle yazarak toplu ekleme gerçekleştirin.
* 🔄 **En Fazla 10‘u Görüntüle, Tümünü Gör**: Popup'ta son eklenen 10 kelimeyi gösterir, tamamını ayrı pencerede listeler.
* 🔍 **Arama & Filtreleme**: Kayıtlı kelime listesini ad-ya göre arayarak filtreleyin.
* 🔄 **Dışa / İçe Aktar**: Kelime listenizi JSON olarak kaydedin veya yükleyin.
* 🌐 **Çoklu Dil Desteği**: Türkçe ve İngilizce arayüz arasında geçiş yapın.


---

## Kurulum

### Chrome (Unpacked Extension)

1. GitHub’dan dosyaları klonlayın veya ZIP indirin ve açın:

   ```sh
   git clone https://github.com/CodderCan/kelime-vurgulayici.git
   ```
2. Chrome’da `chrome://extensions` sayfasını açın.
3. Sağ üstten **Developer mode** (Geliştirici modu) etkinleştirin.
4. **Load unpacked** (Paketlenmemişi yükle) butonuna tıklayıp proje klasörünü seçin.
5. Uzantı araç çubuğunda `🖍️` simgesinin belirdiğini kontrol edin.

### Firefox (Temporary Add-on)

1. GitHub’dan dosyaları klonlayın veya ZIP indirin ve açın.
2. Firefox’ta `about:debugging#/runtime/this-firefox` adresini açın.
3. **Load Temporary Add-on** (Geçici Uzantı Yükle) seçeneğine tıklayın.
4. `manifest.json` dosyasını seçin.
5. Uzantı araç çubuğunda `🖍️` simgesinin belirdiğini kontrol edin.

---

## Kullanım

1. Tarayıcı araç çubuğundan **Kelime Vurgulayıcı** ikonuna tıklayın.
2. **Kelime Ekle** alanına her satıra bir kelime veya ifade yazın.
3. Açılır renk menüsünden vurgulama rengini seçin.
4. **Kaydet** butonuna basın.
5. vurgulanan kelimeleri görmek için sayfayı yenileyin veya sayfayı yeniden yükleyin.
6. Popup’ta son 10 kelimeyi görebilir, altındaki **Tümünü Gör** butonuyla tüm listeyi yeni pencerede inceleyebilirsiniz.
7. **Dışa Aktar** / **İçe Aktar** butonlarıyla JSON üzerinden yedek alıp geri yükleme yapabilirsiniz.
8. **Dil Seç** menüsü ile Türkçe ↔ English arasında geçiş yapın.

---

## Dosya Yapısı

```
kelime-vurgulayici/       # Proje kökü
├─ content.js             # Sayfa içi vurgu betiği
├─ popup.html             # Popup arayüzü (Ana)
├─ popup.js               # Popup davranış yönetimi
├─ tumliste.html          # Tüm kelimeler penceresi
├─ tumliste.js            # Tüm kelimeler davranış betiği
├─ i18n_translations.json # Arayüz dil çevirileri
├─ manifest.json          # Uzantı tanımı ve izinler
├─ privacy.html           # Gizlilik politikası sayfası
└─ README.md              # Bu dosya
```

---

## Geliştirme

* Kod düzenleyici ile `popup.js`, `content.js` veya `tumliste.js` dosyalarını güncelleyerek yeni özellikler ekleyebilirsiniz.
* Yeni dil eklemek için `i18n_translations.json` dosyasına çeviri anahtarları ve değerleri ekleyin.
* PR’lar ve issue’lar için GitHub sayfasını kullanabilirsiniz.

---

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar `LICENSE` dosyasında.

---

> Geliştiren: CodderCan
