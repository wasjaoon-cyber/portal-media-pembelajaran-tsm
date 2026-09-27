/**
 * PORTAL SISTEM PENGAPIAN XI TSM
 * Google Apps Script untuk membuat:
 * 1) Spreadsheet rekap nilai
 * 2) Google Form Pre Test (10 soal)
 * 3) Google Form Quiz (10 soal)
 * 4) Google Form Post Test (20 soal)
 *
 * CARA PAKAI:
 * - Buat project baru di script.google.com
 * - Tempel seluruh kode ini ke Code.gs
 * - Jalankan fungsi setupSistemPengapian() satu kali
 * - Izinkan akses saat diminta
 * - Lihat Execution log untuk URL Form dan Spreadsheet.
 */

const BANK = {
  pretest: [
    ["Fungsi utama sistem pengapian adalah ...",
     ["Mengatur tekanan ban","Menghasilkan percikan pada waktu yang tepat","Mengatur oli mesin","Mendinginkan mesin","Mengisi radiator"],1],
    ["Pada pengapian baterai konvensional, sumber energi listrik berasal dari ...",
     ["Baterai","Pulser","Busi","Kondensor","Rotor"],0],
    ["Komponen yang memutus dan menghubungkan arus primer pada sistem konvensional adalah ...",
     ["Busi","CDI","Platina","Pulser","Spul lampu"],2],
    ["Fungsi koil pengapian adalah ...",
     ["Menurunkan tegangan","Menaikkan tegangan","Mengisi bahan bakar","Mengatur tekanan oli","Mendinginkan busi"],1],
    ["Pada AC CDI, energi pengisian kapasitor terutama berasal dari ...",
     ["Baterai saja","Exciter/charging coil","Lampu utama","Kipas radiator","Starter"],1],
    ["Pada DC CDI, sumber DC utamanya adalah ...",
     ["Baterai","Busi","Kondensor","Pulser","Rotor"],0],
    ["Komponen yang memberikan sinyal waktu pengapian pada CDI adalah ...",
     ["Pulser/pick-up","Kondensor","Baterai","Kunci kontak","Busi"],0],
    ["Busi berfungsi untuk ...",
     ["Menghasilkan percikan bunga api","Menyimpan bensin","Mengatur oli","Mengisi aki","Mengatur tekanan ban"],0],
    ["Kondensor pada sistem konvensional membantu ...",
     ["Mengurangi percikan pada platina","Mendinginkan radiator","Mengisi baterai","Mengatur bahan bakar","Menambah tekanan ban"],0],
    ["Sebelum memeriksa komponen pengapian, tindakan K3 yang tepat adalah ...",
     ["Memegang kabel tegangan tinggi","Membiarkan mesin menyala","Mematikan mesin dan menggunakan alat sesuai prosedur","Melepas semua kabel tanpa pemeriksaan","Menyentuh busi saat mesin hidup"],2]
  ],
  quiz: [
    ["Perbedaan utama AC CDI dan DC CDI adalah ...",
     ["Jenis businya","Sumber energi CDI","Bentuk ban","Jumlah silinder","Jenis oli"],1],
    ["Komponen yang menyimpan energi sebelum dilepaskan pada CDI adalah ...",
     ["Kapasitor","Busi","Pulser","Baterai kendaraan lain","Platina"],0],
    ["Jika kabel massa buruk, salah satu akibatnya adalah ...",
     ["Sistem pengapian dapat terganggu","Ban menjadi keras","Oli bertambah","Lampu selalu terang","Bahan bakar menjadi air"],0],
    ["Pada sistem baterai konvensional, platina membuka menyebabkan ...",
     ["Arus primer terputus","Busi hilang","Baterai terisi penuh","Ban berputar","Radiator kosong"],0],
    ["Pemeriksaan CDI sebaiknya mengikuti ...",
     ["Perkiraan saja","Manual servis kendaraan","Warna motor","Ukuran ban","Nomor rumah siswa"],1],
    ["Percikan busi lemah dapat disebabkan oleh ...",
     ["Tegangan suplai rendah","Kursi rusak","Spion kotor","Ban baru","Cat bodi"],0],
    ["Pulser pada CDI berkaitan dengan ...",
     ["Sinyal waktu pengapian","Tekanan ban","Suhu radiator","Volume oli","Lampu sein"],0],
    ["Koil menghasilkan tegangan tinggi melalui prinsip ...",
     ["Induksi elektromagnetik","Pembakaran mekanis","Tekanan hidrolik","Gesekan ban","Pendinginan"],0],
    ["Pada DC CDI, sumber tegangan awal berasal dari ...",
     ["Baterai","Busi","Kondensor","Spul lampu saja","Knalpot"],0],
    ["Tujuan pemeriksaan sistematis adalah ...",
     ["Menentukan sumber gangguan berdasarkan prosedur","Mengganti semua komponen sekaligus","Mengabaikan manual servis","Mempercepat kerusakan","Menghilangkan K3"],0]
  ],
  posttest: [
    ["Sistem pengapian menghasilkan percikan pada ...",["Busi","Radiator","Karburator","Knalpot","Rantai"],0],
    ["Sumber energi utama baterai konvensional adalah ...",["Baterai/aki","Pulser","Kondensor","Busi","Magnet saja"],0],
    ["Fungsi platina adalah ...",["Mengatur pemutusan arus primer","Menaikkan tegangan ban","Mengatur oli","Mengisi bensin","Mendinginkan mesin"],0],
    ["Ketika platina membuka, arus primer ...",["Terputus","Bertambah terus","Tidak berubah selamanya","Masuk ke radiator","Masuk ke ban"],0],
    ["Kondensor dipasang untuk membantu ...",["Mengurangi percikan pada kontak pemutus","Menaikkan tekanan ban","Mengisi tangki","Mendinginkan busi","Mengatur rantai"],0],
    ["Koil pengapian berfungsi ...",["Menaikkan tegangan melalui induksi","Menurunkan tekanan ban","Menyaring bensin","Mengatur oli","Mengisi radiator"],0],
    ["Pada sistem magnet konvensional, energi listrik dibangkitkan akibat ...",["Perubahan medan magnet karena putaran","Tekanan ban","Aliran oli","Pembakaran busi","Putaran kipas"],0],
    ["Komponen penghasil sinyal pemicu CDI adalah ...",["Pulser/pick-up coil","Kondensor radiator","Busi belakang","Kunci roda","Filter udara"],0],
    ["AC CDI menggunakan sumber pengisian dari ...",["Exciter/charging coil","Baterai saja","Lampu sein","Starter mekanis","Klakson"],0],
    ["DC CDI menggunakan sumber awal ...",["Baterai DC","Knalpot","Rantai","Radiator","Busi"],0],
    ["Energi pada CDI disimpan dalam ...",["Kapasitor","Ban","Karburator","Radiator","Knalpot"],0],
    ["Urutan sederhana AC CDI yang benar adalah ...",["Exciter → CDI → koil → busi","Busi → ban → CDI → radiator","Ban → koil → aki → knalpot","Radiator → busi → spul → ban","Knalpot → CDI → ban → busi"],0],
    ["Urutan sederhana DC CDI yang benar adalah ...",["Baterai → CDI → koil → busi","Busi → baterai → ban → CDI","Ban → radiator → CDI → busi","Knalpot → aki → ban → koil","Radiator → CDI → ban → busi"],0],
    ["Jika baterai DC CDI lemah, salah satu dampaknya adalah ...",["Sistem pengapian dapat terganggu","Tekanan ban otomatis naik","Oli berubah menjadi bensin","Busi menjadi filter","Rantai bertambah panjang"],0],
    ["Jika tidak ada percikan pada AC CDI, langkah awal yang tepat adalah ...",["Memeriksa sumber, konektor, pulser, koil, dan busi sesuai prosedur","Mengganti semua komponen tanpa tes","Melepas mesin","Mengganti ban","Mengecat bodi"],0],
    ["Pemeriksaan tahanan komponen harus dibandingkan dengan ...",["Spesifikasi/manual servis","Warna kabel saja","Ukuran ban","Jumlah penumpang","Warna bodi"],0],
    ["Kabel tegangan tinggi perlu diperiksa karena ...",["Menyalurkan tegangan tinggi ke busi","Mengisi bensin","Mengatur oli","Mengatur ban","Mendinginkan mesin"],0],
    ["K3 saat pengujian pengapian adalah ...",["Menghindari bagian bertegangan tinggi dan menggunakan alat sesuai prosedur","Memegang kabel HV dengan tangan basah","Bekerja tanpa alat pelindung","Menyentuh busi saat mesin hidup","Melepas semua kabel sembarangan"],0],
    ["Troubleshooting yang baik dilakukan dengan ...",["Pemeriksaan sistematis dari sumber menuju komponen terkait","Menebak komponen","Mengganti semua komponen","Mengabaikan gejala","Tidak menggunakan alat ukur"],0],
    ["Tujuan pembelajaran materi ini salah satunya adalah ...",["Membedakan AC CDI dan DC CDI","Menghafal semua merek motor","Mengganti ban","Mengecat rangka","Membongkar mesin tanpa prosedur"],0]
  ]
};

function setupSistemPengapian() {
  const ss = SpreadsheetApp.create("REKAP NILAI - SISTEM PENGAPIAN XI TSM");
  const first = ss.getSheets()[0];
  first.setName("PETUNJUK");
  first.getRange("A1:B6").setValues([
    ["REKAP NILAI SISTEM PENGAPIAN XI TSM",""],
    ["Sekolah","SMKN 1 Kabupaten Tangerang"],
    ["Guru","Wasja, S.Pd"],
    ["Cara rekap","Buka sheet respons dari masing-masing Form"],
    ["Catatan","Nama dan kelas diisi siswa sebelum soal."],
    ["Spreadsheet","URL ada di log eksekusi."]
  ]);

  const forms = {};
  forms.pretest = createQuizForm_("PRE TEST SISTEM PENGAPIAN - XI TSM", BANK.pretest, 10, ss);
  forms.quiz = createQuizForm_("QUIZ SISTEM PENGAPIAN - XI TSM", BANK.quiz, 10, ss);
  forms.posttest = createQuizForm_("POST TEST SISTEM PENGAPIAN - XI TSM", BANK.posttest, 5, ss);

  Logger.log("=== SELESAI ===");
  Logger.log("SPREADSHEET: " + ss.getUrl());
  Logger.log("PRE TEST: " + forms.pretest.publishedUrl);
  Logger.log("EDIT PRE TEST: " + forms.pretest.editUrl);
  Logger.log("QUIZ: " + forms.quiz.publishedUrl);
  Logger.log("EDIT QUIZ: " + forms.quiz.editUrl);
  Logger.log("POST TEST: " + forms.posttest.publishedUrl);
  Logger.log("EDIT POST TEST: " + forms.posttest.editUrl);
}

function createQuizForm_(title, bank, points, ss) {
  const form = FormApp.create(title);
  form.setDescription(
    "Kelistrikan Sepeda Motor - Sistem Pengapian\n" +
    "Kelas XI TSM - SMKN 1 Kabupaten Tangerang\n" +
    "Guru Mapel: Wasja, S.Pd\n\n" +
    "Isi nama dan kelas dengan benar sebelum mengerjakan."
  );
  form.setIsQuiz(true);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage("Jawaban sudah dikirim. Nilai akan direkap pada Spreadsheet guru.");

  const nama = form.addTextItem();
  nama.setTitle("Nama Siswa");
  nama.setRequired(true);

  const kelas = form.addTextItem();
  kelas.setTitle("Kelas");
  kelas.setRequired(true);

  bank.forEach((item, i) => {
    const q = form.addMultipleChoiceItem();
    const choices = item[1].map((text, idx) => q.createChoice(text, idx === item[2]));
    q.setTitle((i + 1) + ". " + item[0]);
    q.setChoices(choices);
    q.setRequired(true);
    q.setPoints(points);
  });

  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  return {
    publishedUrl: form.getPublishedUrl(),
    editUrl: form.getEditUrl()
  };
}
