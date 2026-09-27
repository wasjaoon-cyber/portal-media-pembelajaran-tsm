MEDIA PEMBELAJARAN SISTEM PENGAPIAN - VERSI LENGKAP
Kelas XI TSM - SMKN 1 Kabupaten Tangerang
Guru Mapel: Wasja, S.Pd

STRUKTUR:
index.html                     = halaman utama modul
editor.html                    = editor upload/preview/ganti/hapus media
tes.html?jenis=pretest         = pretest
tes.html?jenis=quiz            = quiz
tes.html?jenis=posttest        = posttest
lkpd.html                      = LKPD
materi/*.html                  = 4 submateri
assets/style.css               = tampilan
assets/media.js                = database media + renderer

SUBMATERI:
- Sistem Pengapian Baterai Konvensional
- Sistem Pengapian Magnet Konvensional
- Sistem Pengapian AC CDI
- Sistem Pengapian DC CDI

MEDIA:
Upload media melalui editor.html. Media disimpan pada IndexedDB dengan database:
MediaPengapianDB / store files.

CATATAN PENTING:
Editor dan halaman materi harus dibuka dari lingkungan/origin yang sama agar browser dapat
mengakses database IndexedDB yang sama. Jika browser memperlakukan file:// secara terpisah,
gunakan hosting lokal sederhana (misalnya VS Code Live Server) atau GitHub Pages.
Media pada IndexedDB tidak otomatis masuk ke GitHub.

Untuk GitHub:
1. Upload seluruh folder proyek.
2. Pastikan assets/style.css dan assets/media.js tetap berada di folder assets.
3. Pastikan materi/*.html berada di folder materi.
4. Untuk video publik yang besar, lebih aman menggunakan video hosting/YouTube daripada
menyimpan MP4 besar di GitHub.
