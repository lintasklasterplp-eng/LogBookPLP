PAKET DEPLOYMENT PWA — LOGBOOK UPTD PUSKESMAS LANJUT

1. Ekstrak seluruh isi ZIP ke folder root situs/subfolder aplikasi yang sama.
2. Pastikan index.html, manifest.webmanifest, sw.js, favicon.ico, dan semua PNG ikon berada dalam folder yang sama.
3. Hosting harus menggunakan HTTPS.
4. Jangan hanya mengunggah index.html. Unggah seluruh isi folder ini.
5. Buka URL aplikasi melalui HTTPS, lakukan hard refresh, lalu pasang kembali aplikasi.
6. Jika aplikasi sebelumnya sudah pernah dipasang, hapus/uninstall versi lama, bersihkan data situs/cache untuk domain aplikasi, buka kembali situs, lalu install ulang.

Supabase:
- File index.html diambil dari versi aplikasi yang diberikan.
- Manifest/service worker/ikon hanya mengatur PWA dan tidak mengubah URL, anon key, tabel, bucket, autentikasi, maupun data Supabase.
- Service worker ini tidak menyimpan respons Supabase atau data login ke cache.

Berkas ikon menggunakan logo UPTD Puskesmas Lanjut yang sudah tertanam pada file HTML sumber.
