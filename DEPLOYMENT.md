# Ubuntu güncellemesi

Canlı veritabanı ve uygulama dosyalarını yedekleyin. Sunucunun `.env.local` dosyasını koruyun; yerel veritabanını canlıya kopyalamayın.

Mevcut bağımlılıklar değiştiyse `npm ci`, ardından sırasıyla:

```sh
npm run db:migrate
npm run build
pm2 restart kupamenu
```

`db:migrate` yalnızca eksik popup şemasını ekler ve tekrar çalıştırılabilir. Mevcut ürün, fiyat, header veya reklam kayıtlarını sıfırlamaz. Canlı güncellemelerde `db:setup` yerine bu komutu kullanın.

Yayın sonrası menü ve `/admin` adreslerini kontrol edin. Admin kaydından sonra menüyü yenileyerek değişikliği doğrulayın. Açık bir menü sekmesinin verisi sayfa yenilendiğinde güncellenir.
