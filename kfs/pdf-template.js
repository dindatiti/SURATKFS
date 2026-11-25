function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID').format(Number(angka) || 0);
}

function formatTanggalIndo(tgl) {
  if (!tgl) return '';
  const parts = String(tgl).split('-');
  if (parts.length === 3) {
    const dt = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return dt.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
  return new Date(tgl).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function bersihNilai(val) {
  if (val === undefined || val === null) return '';
  const str = String(val).trim();
  return str === '-' ? '' : str;
}

function teksBersih(teks, minWidth = '100%') {
  const isi = bersihNilai(teks);
  return `
    <div style="display:inline-block; width:${minWidth}; min-height:15px; line-height:15px; font-family:Arial, Helvetica, sans-serif; font-size:9pt; color:#000000; padding:0 2px; box-sizing:border-box; vertical-align:bottom;">
      ${isi ? `<span style="color:#000000;">${isi}</span>` : '&nbsp;'}
    </div>
  `;
}

function teksInlineBersih(teks, minWidth = '100px', align = 'center') {
  const isi = bersihNilai(teks);
  return `<span style="display:inline-block; min-width:${minWidth}; text-align:${align}; padding:0 4px; line-height:1.15; font-family:Arial, Helvetica, sans-serif; font-size:9pt; color:#000000;">${isi || '&nbsp;'}</span>`;
}

function renderKotakNPWP(npwp) {
  const d = String(npwp || '').replace(/[^0-9]/g, '').padEnd(15, ' ');
  const slots = [
    { v: d[0], sep: false },
    { v: d[1], sep: false },
    { v: '.', sep: true },
    { v: d[2], sep: false },
    { v: d[3], sep: false },
    { v: d[4], sep: false },
    { v: '.', sep: true },
    { v: d[5], sep: false },
    { v: d[6], sep: false },
    { v: d[7], sep: false },
    { v: '.', sep: true },
    { v: d[8], sep: false },
    { v: '-', sep: true },
    { v: d[9], sep: false },
    { v: d[10], sep: false },
    { v: d[11], sep: false },
    { v: '.', sep: true },
    { v: d[12], sep: false },
    { v: d[13], sep: false },
    { v: d[14], sep: false }
  ];

  return `
    <table style="border-collapse:collapse; display:inline-table; vertical-align:middle;">
      <tr>
        ${slots.map(s => `
          <td style="border:1px solid #000000 !important; width:18px; height:20px; text-align:center; vertical-align:middle; font-family:Arial, Helvetica, sans-serif; font-size:9pt; font-weight:${s.sep ? 'bold' : 'normal'}; padding:0; background:#ffffff !important; color:#000000;">
            ${s.v === ' ' ? '&nbsp;' : s.v}
          </td>
        `).join('')}
      </tr>
    </table>
  `;
}

function renderKotakIdPelanggan(idPel) {
  const chars = String(idPel || '').trim().padEnd(11, ' ').slice(0, 11);
  return `<table style="border-collapse:collapse; display:inline-table; vertical-align:middle;"><tr>${
    chars.split('').map(ch =>
      `<td style="border:1px solid #000000 !important; width:18px; height:20px; text-align:center; vertical-align:middle; font-family:Arial, Helvetica, sans-serif; font-size:9pt; font-weight:normal; padding:0; background:#ffffff !important; color:#000000;">${ch === ' ' ? '&nbsp;' : ch}</td>`
    ).join('')
  }</tr></table>`;
}

function renderLogoTelkom() {
  return `
    <div style="text-align:right; vertical-align:middle; padding:0;">
      <img src="../logotelkom-removebg-preview.png" alt="Logo Telkom Indonesia" style="max-height:50px; width:auto; display:inline-block;" />
    </div>
  `;
}

function renderKopHalaman(judulKiri, d, isKontrakAwal = false) {
  const labelNomorKontrak = isKontrakAwal ? 'Nomor Kontrak Awal' : 'Nomor Kontrak';
  const nomAmandemen = bersihNilai(d.nomorAmandemen);
  const nomKontrak = bersihNilai(d.nomorKontrak) || 'K.TEL8743/HK810/543/86/2026';

  return `
    <div style="height:36px; line-height:36px; font-size:10pt;">&nbsp;</div>
    <table style="width:100%; border-collapse:collapse; margin-bottom:4px; font-family:Arial, Helvetica, sans-serif; color:#000000; font-size:11pt;">
      <tr>
        <td style="width:28%; font-weight:bold; font-size:10pt; line-height:1.2; vertical-align:middle; padding:0; text-align:left; text-transform:uppercase;">
          ${judulKiri}
        </td>
        <td style="width:46%; font-weight:bold; font-size:10pt; line-height:1.2; vertical-align:middle; padding-top:14px; text-align:center;">
          PERUSAHAAN PERSEROAN (PERSERO)<br>
          PT TELEKOMUNIKASI INDONESIA Tbk
        </td>
        <td style="width:26%; text-align:right; vertical-align:middle; padding:0;">
          ${renderLogoTelkom()}
        </td>
      </tr>
    </table>

    <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

    <table style="width:100%; border-collapse:collapse; margin-bottom:4px; font-family:Arial, Helvetica, sans-serif; font-size:10pt; color:#000000;">
      <tr>
        <td style="width:19%; padding:1px 0; white-space:nowrap; vertical-align:middle;">Nomor ID Pelanggan</td>
        <td style="width:31%; padding:1px 4px; vertical-align:middle;">${renderKotakIdPelanggan(d.pelanggan.idPelanggan)}</td>
        <td style="width:19%; padding:1px 4px; white-space:nowrap; vertical-align:middle;">Nomor Amandemen</td>
        <td style="width:31%; padding:1px 0; vertical-align:middle;">${teksBersih(nomAmandemen)}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding:1px 0;"></td>
        <td style="padding:1px 4px; white-space:nowrap; vertical-align:middle;">${labelNomorKontrak}</td>
        <td style="padding:1px 0; vertical-align:middle;">
          <div style="padding-bottom:1px; font-weight:bold; font-size:9pt;">${nomKontrak}</div>
        </td>
      </tr>
    </table>
    <div style="height:12px; line-height:12px; font-size:9pt;">&nbsp;</div>
  `;
}

function ambilDaftarLayanan(d) {
  if (Array.isArray(d.daftarLayanan) && d.daftarLayanan.length > 0) {
    return d.daftarLayanan;
  }
  return [{
    namaLayanan: bersihNilai(d.namaLayanan),
    paket: bersihNilai(d.paket),
    lokasi: bersihNilai(d.lokasi),
    alamatInstalasi: bersihNilai(d.alamatInstalasi) || bersihNilai(d.lokasi),
    lebarPita: bersihNilai(d.lebarPita),
    biayaInstalasi: Number(d.biayaInstalasi || 0),
    biayaBulanan: Number(d.biayaBulanan || 0),
    pic: bersihNilai(d.pelA && d.pelA.nama) || bersihNilai(d.pelanggan && d.pelanggan.wakilNama)
  }];
}

function generateKFSHTML(d, isExportMode = false) {
  const layananList = ambilDaftarLayanan(d);
  const totalInstalasi = layananList.reduce((acc, item) => acc + Number(item.biayaInstalasi || 0), 0);
  const totalBulanan = layananList.reduce((acc, item) => acc + Number(item.biayaBulanan || 0), 0);

  const cekConn = d.jenisLayanan === 'Layanan Connectivity TELKOM' ? '✓' : '&nbsp;';
  const cekNonConn = d.jenisLayanan === 'Layanan Non-Connectivity TELKOM' ? '✓' : '&nbsp;';
  const cekBundling = d.jenisLayanan === 'Bundling Layanan Connectivity TELKOM & Solusi' ? '✓' : '&nbsp;';

  const barisLayananUtama = layananList.map((item, i) => `
    <tr>
      <td style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle;">${i + 1}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${bersihNilai(item.namaLayanan)}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${bersihNilai(item.paket)}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${bersihNilai(item.alamatInstalasi)}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${bersihNilai(item.pic) || bersihNilai(d.pelA && d.pelA.nama) || bersihNilai(d.pelanggan.wakilNama)}</td>
      <td style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle;">${bersihNilai(item.lebarPita)}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${formatRupiah(item.biayaInstalasi)}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${formatRupiah(item.biayaBulanan)}</td>
      <td style="border:1px solid #000000; padding:5px 6px; text-align:center; vertical-align:middle;">${bersihNilai(item.lokasi)}</td>
    </tr>
  `).join('');

  const barisKosongLampiran1 = Math.max(0, 5 - layananList.length);
  let ekstraBarisLampiran1 = '';
  for (let i = 0; i < barisKosongLampiran1; i++) {
    ekstraBarisLampiran1 += `<tr><td style="border:1px solid #000000; height:24px;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td></tr>`;
  }

  const tglMulai = formatTanggalIndo(d.berlakuDari) || '';
  const tglSelesai = formatTanggalIndo(d.berlakuSampai) || '';
  const tglSurat = formatTanggalIndo(d.tanggalSurat) || '';
  const kotaSurat = bersihNilai(d.kotaSurat) || 'Banyuwangi';

  const rawJangka = bersihNilai(d.jangkaWaktu);
  const labelJangkaWaktu = rawJangka
    ? (/bulan|tahun|hari/i.test(rawJangka) ? rawJangka : `${rawJangka} Bulan`)
    : '';

  // Variabel penanda tangan dari data form (fallback ke default jika kosong)
  const namaTelkom = bersihNilai(d.wakilTelkom && d.wakilTelkom.nama) || 'AzkiZarkasiMuhammad';
  const jabatanTelkom = bersihNilai(d.wakilTelkom && d.wakilTelkom.jabatan) || 'Account Manager';
  const namaPelanggan = bersihNilai(d.pelanggan && d.pelanggan.wakilNama) || 'Yanti Cantika';
  const jabatanPelanggan = bersihNilai(d.pelanggan && d.pelanggan.wakilJabatan) || 'Sekertaris';

  const BLUE_HEADER_BOX = 'background-color:#cde7fa !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; padding:2px 5px; margin-top:2px; margin-bottom:1px; font-size:9pt; line-height:1.15; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:justify;';
  const BLUE_SECTION_BAR_NORMAL = 'background-color:#cde7fa !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-weight:normal; padding:2px 5px; margin-top:3px; margin-bottom:1px; font-size:9pt; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:left;';
  const CHK_BOX = 'display:inline-block; border:1px solid #000000; width:12px; height:11px; text-align:center; line-height:10px; font-size:9pt; font-weight:bold; background:#ffffff;';

  const PAGE_BASE = isExportMode
    ? 'background:#ffffff; width:210mm; height:294mm; max-height:294mm; padding:5mm 10mm; margin:0; font-family:Arial, Helvetica, sans-serif; color:#000000; font-size:9pt; line-height:1.15; box-sizing:border-box; overflow:hidden; text-align:justify; page-break-inside:avoid;'
    : 'background:#ffffff; width:210mm; height:294mm; max-height:294mm; padding:5mm 10mm; margin:0 auto 12px auto; box-shadow:0 4px 16px rgba(0,0,0,0.22); font-family:Arial, Helvetica, sans-serif; color:#000000; font-size:9pt; line-height:1.15; box-sizing:border-box; overflow:hidden; text-align:justify;';

  return `
    <div id="kfs-printable-root" style="font-family:Arial, Helvetica, sans-serif; color:#000000; text-align:justify; font-size:9pt;">
      <!-- ==================== HALAMAN 1 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} text-align:justify;">
        ${renderKopHalaman('AMANDEMEN<br>KONTRAK<br>BERLANGGANAN', d, true)}

        <div style="${BLUE_HEADER_BOX} text-align:justify;">
1. &nbsp;PERUSAHAAN PERSEROAN (PERSERO) PT TELEKOMUNIKASI INDONESIA Tbk (TELKOM)<br>
          Suatu perusahaan penyedia jasa dan jaringan telekomunikasi yang dibentuk dan didirikan berdasarkan hukum Republik Indonesia, berkedudukan di Jalan Japati Nomor 1 Bandung, Indonesia 40133.<br>
          Diwakili secara sah oleh :
        </div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
            <tr>
              <td style="width:120px; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:justify;">${teksBersih(d.wakilTelkom && d.wakilTelkom.nama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Jabatan</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:justify;">${teksBersih(d.wakilTelkom && d.wakilTelkom.jabatan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Unit</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:justify;">${teksBersih((d.wakilTelkom && d.wakilTelkom.unit) || 'Telda Banyuwangi - Witel Jatim Timur')}</td>
            </tr>
          </table>
          <div style="height:10px; line-height:10px; font-size:9pt;">&nbsp;</div>
        </div>

        <div style="${BLUE_HEADER_BOX} text-align:justify;">
2. &nbsp;PELANGGAN<br>
          Identitas Perusahaan/Institusi
        </div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <tr>
              <td style="width:120px; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:justify;">${teksBersih(d.pelanggan.perusahaan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; vertical-align:top; text-align:justify;">Alamat</td>
              <td style="padding:1px 0; vertical-align:top;">:</td>
              <td style="padding:1px 0; text-align:justify;">
                ${teksBersih(d.pelanggan.alamat)}
                <div style="margin-top:1px; text-align:right; padding-right:45px;">
                  Kode Pos &nbsp;${teksInlineBersih(d.pelanggan.kodePos, '70px', 'center')}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">NPWP</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:right;">${renderKotakNPWP(d.pelanggan.npwp)}</td>
            </tr>
          </table>
        </div>

        <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

        <div style="background-color:#e6f2fc !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-weight:normal; padding:1.5px 5px; margin-top:2px; margin-bottom:1px; font-size:9pt; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:justify;">Diwakili secara sah oleh :</div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <tr>
              <td style="width:120px; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:justify;">${teksBersih(d.pelanggan.wakilNama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Jabatan</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:justify;">${teksBersih(d.pelanggan.wakilJabatan)}</td>
            </tr>
          </table>
        </div>

        <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:justify;">3. &nbsp;LAYANAN</div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <tr>
              <td style="width:54%; padding:1px 0; text-align:justify;">Layanan Connectivity TELKOM</td>
              <td style="padding:1px 0;"><span style="${CHK_BOX}">${cekConn}</span></td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Layanan Non-Connectivity TELKOM</td>
              <td style="padding:1px 0;"><span style="${CHK_BOX}">${cekNonConn}</span></td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Bundling Layanan Connectivity TELKOM &amp; Solusi</td>
              <td style="padding:1px 0;"><span style="${CHK_BOX}">${cekBundling}</span></td>
            </tr>
          </table>
        </div>

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:justify;">Jaminan Layanan</div>
        <div style="padding: 1px 5px; font-size:9pt; text-align:justify;">
          Tingkat Availability ...... %
        </div>

        <div style="height:12px; line-height:12px; font-size:9pt;">&nbsp;</div>

        <div style="font-weight:normal; font-size:9pt; margin-top:3px; margin-bottom:1px; font-family:Arial, Helvetica, sans-serif; color:#000000; text-align:justify; padding-left:5px;">Mekanisme Pemenuhan CPE</div>
        <div style="padding: 1px 5px; font-size:9pt; line-height:1.15; text-align:justify; padding-left:5px;">
          PELANGGAN harus menyiapkan Customer Premises Equipment (CPE) sesuai dengan spesifikasi yang ditentukan TELKOM sebelum proses integrasi.
        </div>

        <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

        <div style="background-color:#e6f2fc !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-weight:normal; padding:1.5px 5px; margin-top:2px; margin-bottom:1px; font-size:9pt; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:justify;">Rincian Layanan</div>
        <table style="width:100%; border-collapse:collapse; margin:2px 0; table-layout:fixed; word-wrap:break-word; font-size:8.5pt;">
          <thead>
            <tr>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 3px; text-align:center; vertical-align:middle; width:24px; font-weight:normal;">No</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:12%; font-weight:normal;">Layanan</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:11%; font-weight:normal;">Paket</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:29%; font-weight:normal;">Lokasi</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:10%; font-weight:normal;">Lebar Pita<br>(Kbps)</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:22%; font-weight:normal;">Biaya</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:12%; font-weight:normal;">Keterangan</th>
            </tr>
            <tr>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; font-weight:normal;">Alamat Instalasi</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; font-weight:normal;">PIC</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; font-weight:normal;">Instalasi</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; font-weight:normal;">Bulanan</th>
            </tr>
          </thead>
          <tbody>
            ${barisLayananUtama}
            <tr>
              <td colspan="6" style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle; font-weight:normal;">Jumlah</td>
              <td style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle; font-weight:normal;">${formatRupiah(totalInstalasi)}</td>
              <td style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle; font-weight:normal;">${formatRupiah(totalBulanan)}</td>
              <td style="border:1px solid #000000; padding:5px 4px; vertical-align:middle;"></td>
            </tr>
          </tbody>
        </table>

        <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

        <div style="font-size:8.5pt; line-height:1.15; margin-top:2px; text-align:justify;">
          Apabila kolom rincian layanan di atas tidak cukup, rincian layanan akan diuraikan dalam Lampiran I yang merupakan satu kesatuan serta bagian yang tidak terpisahkan dengan Kontrak Berlangganan ini.
        </div>
        <div style="font-size:8.5pt; line-height:1.15; margin-top:2px; text-align:justify;">
          PELANGGAN akan diberikan masa uji coba layanan maksimum selama 12 (dua belas) hari kalender terhitung sejak tanggal aktivasi yang dituangkan dalam Berita Acara Siap Operasi (BASO). <em style="color:#cc0000;">(layanan temporer tidak diberikan masa uji coba/trial)</em>
        </div>
        <div style="font-size:8.5pt; line-height:1.15; margin-top:2px; text-align:justify;">
          Tanggal efektif dimulainya penagihan biaya-biaya akan ditentukan dalam Berita Acara Siap Operasi (BASO).
        </div>

        <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:justify;">4. &nbsp;BIAYA-BIAYA (Rupiah)</div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <tr>
              <td style="width:45%; padding:1px 0; font-weight:normal; text-align:justify;">Biaya Instalasi</td>
              <td style="width:10px; padding:1px 0; font-weight:normal;">:</td>
              <td style="padding:1px 0; text-align:right; font-weight:normal;">
                Rp &nbsp;<span style="display:inline-block; min-width:160px; text-align:right; padding-right:4px; font-weight:normal;">${formatRupiah(totalInstalasi)}</span>,-
              </td>
            </tr>
            <tr>
              <td style="padding:1px 0; font-weight:normal; text-align:justify;">Biaya Langganan Bulanan</td>
              <td style="width:10px; padding:1px 0; font-weight:normal;">:</td>
              <td style="padding:1px 0; text-align:right; font-weight:normal;">
                Rp &nbsp;<span style="display:inline-block; min-width:160px; text-align:right; padding-right:4px; font-weight:normal;">${formatRupiah(totalBulanan)}</span>,-
              </td>
            </tr>
            <tr>
              <td style="padding:1px 0; font-weight:normal; text-align:justify;">Biaya Lainnya (IKG, Biaya Integrasi)</td>
              <td style="width:10px; padding:1px 0; font-weight:normal;">:</td>
              <td style="padding:1px 0; text-align:right; font-weight:normal;">
                Rp &nbsp;<span style="display:inline-block; min-width:160px; text-align:right; padding-right:4px; font-weight:normal;">${formatRupiah(d.biayaLainnya || 0)}</span>,-
              </td>
            </tr>
          </table>
          <div style="margin-top:1px; font-size:8.5pt; font-style:italic; text-align:justify;">Biaya-biaya tersebut di atas belum termasuk PPN</div>
        </div>

        <div style="height:14px; line-height:14px; font-size:9pt;">&nbsp;</div>

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:justify;">5. &nbsp;TATA CARA PEMBAYARAN</div>
        <div style="padding: 1px 5px; font-size:9pt; line-height:1.2; text-align:justify;">
          TELKOM akan mengirim Official Receipt selambat-lambatnya pada tanggal 10 (sepuluh) setiap bulannya ke alamat kontak person PELANGGAN yang dicantumkan dalam Kontrak Berlangganan ini.
        </div>
      </div>

      <!-- ==================== HALAMAN 2 (Tanpa Kop Surat) ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} text-align:justify;">
        <div style="height:10px; line-height:10px; font-size:9pt;">&nbsp;</div>

        <div style="font-size:9pt; line-height:1.2; text-align:justify; margin-bottom:14px;">
          <br>
          PELANGGAN harus melakukan pembayaran paling lambat pada tanggal 20 (dua puluh) setiap bulannya (Tanggal Jatuh Tempo) atau sesuai tanggal jatuh tempo yang tercantum di dalam tagihan (invoice) setiap bulannya, dengan cara transfer ke rekening bank TELKOM atau virtual account yang tercantum di dalam tagihan (invoice), kecuali ditentukan lain berdasarkan suatu instrumen tertulis yang diterbitkan oleh TELKOM. Seluruh biaya yang timbul dari dan/atau berhubungan dengan pembayaran tersebut merupakan tanggung jawab PELANGGAN sendiri.
        </div>

        <div style="
          background-color:#cde7fa !important;
          -webkit-print-color-adjust:exact;
          print-color-adjust:exact;
          padding:2px 5px;
          margin-top:0;
          margin-bottom:3px;
          font-size:9pt;
          line-height:1.15;
          font-family:Arial, Helvetica, sans-serif;
          color:#000000;
          text-align:left;
        ">
          6. &nbsp;JANGKA WAKTU
        </div>

        <div style="
          padding:0 12px 0 2px;
          font-size:9pt;
          line-height:1.15;
          font-family:Arial, Helvetica, sans-serif;
          color:#000000;
          text-align:justify;
        ">

          <p style="margin:2px 0 14px 0; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
            Jangka waktu Kontrak Berlangganan adalah terhitung sejak tanggal mulai jangka waktu delivery Layanan, sampai dengan diselesaikan seluruh hak dan kewajiban TELKOM dan PELANGGAN.
          </p>

          <p style="margin:0 0 14px 0; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
            Jangka waktu Kontrak Berlangganan terhitung sejak tanggal
            <span style="font-weight:bold; letter-spacing:1px; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
              ${tglMulai || '....................'}
            </span>
            sampai dengan tanggal
            <span style="font-weight:bold; letter-spacing:1px; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
              ${tglSelesai || '....................'}
            </span>,
            dengan rincian sebagai berikut:
          </p>

          <table style="
            width:100%;
            border-collapse:collapse;
            font-size:9pt;
            font-family:Arial, Helvetica, sans-serif;
            color:#000000;
            line-height:1.15;
          ">
            <tr>
              <td style="width:50%; padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                Jangka waktu delivery
              </td>
              <td style="width:50%; padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                ${bersihNilai(d.deliveryTime) || '......'} hari
              </td>
            </tr>

            <tr>
              <td style="padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                Maksimal sampai dengan tanggal
              </td>
              <td style="padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                <span style="letter-spacing:1px; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                  ${tglSelesai || '....................'}
                </span>
              </td>
            </tr>

            <tr>
              <td colspan="2" style="height:10px;"></td>
            </tr>

            <tr>
              <td style="padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                Jangka waktu Layanan
              </td>
              <td style="padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                ${labelJangkaWaktu.replace(/\s*bulan$/i, '') || '..........'} bulan
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:2px 0; vertical-align:top; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                berlaku sejak tanggal
                <span style="font-weight:bold; letter-spacing:1px; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                  ${tglMulai || '....................'}
                </span>
                sampai dengan
                <span style="font-weight:bold; letter-spacing:1px; font-size:9pt; font-family:Arial, Helvetica, sans-serif;">
                  ${tglSelesai || '....................'}
                </span>
              </td>
            </tr>
          </table>

          <p style="
            margin:14px 0 0 0;
            text-align:justify;
            line-height:1.15;
            font-size:9pt;
            font-family:Arial, Helvetica, sans-serif;
          ">
            Jangka waktu tersebut dapat diperpanjang berdasarkan kesepakatan tertulis antara TELKOM dan PELANGGAN. PELANGGAN harus menyampaikan pemberitahuan secara tertulis kepada TELKOM sekurang-kurangnya 30 (tiga puluh) hari sebelum tanggal berakhirnya jangka waktu Kontrak untuk melakukan perpanjangan Layanan berdasarkan Kontrak Berlangganan ini.
          </p>

          <br><br>

        </div>

        <div style="background-color:#cde7fa !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-size:9pt; color:#000000; font-family:Arial, Helvetica, sans-serif; margin-top:10px; margin-bottom:1px;">
          <div style="padding:2px 5px; text-align:left; font-weight:normal;">7. &nbsp;KONTAK PERSON</div>
          <div style="padding:1.5px 5px; text-align:center; font-weight:normal;">TELKOM</div>
        </div>
        <div style="padding: 1.5px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <tr>
              <td style="width:16%; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.am && d.am.nama)}</td>
              <td style="width:16%; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.payroll && d.payroll.nama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Jabatan</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.am && d.am.jabatan)}</td>
              <td style="padding:1px 0; text-align:justify;">Jabatan</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.payroll && d.payroll.jabatan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Telepon/GSM *)</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.am && d.am.gsm)}</td>
              <td style="padding:1px 0; text-align:justify;">Telepon/GSM *)</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.payroll && d.payroll.gsm)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Telepon Kantor *)</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.am && d.am.kantor)}</td>
              <td style="padding:1px 0; text-align:justify;">Telepon Kantor *)</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.payroll && d.payroll.kantor)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Faksimil</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.am && d.am.fax)}</td>
              <td style="padding:1px 0; text-align:justify;">Faksimil</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.payroll && d.payroll.fax)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">E-mail</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.am && d.am.email)}</td>
              <td style="padding:1px 0; text-align:justify;">E-mail</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.payroll && d.payroll.email)}</td>
            </tr>
          </table>
          <div style="height:12px; line-height:12px; font-size:9pt;">&nbsp;</div>
        </div>

        <div style="background-color:#cde7fa !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-weight:normal; padding:1.5px 5px; margin-top:2px; margin-bottom:1px; font-size:9pt; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:center;">PELANGGAN</div>
        <div style="padding: 1.5px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <tr>
              <td style="width:16%; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.pelA && d.pelA.nama)}</td>
              <td style="width:16%; padding:1px 0; text-align:justify;">Nama</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.pelB && d.pelB.nama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Jabatan</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.pelA && d.pelA.jabatan)}</td>
              <td style="padding:1px 0; text-align:justify;">Jabatan</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.pelB && d.pelB.jabatan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Telepon/GSM *)</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.pelA && d.pelA.gsm)}</td>
              <td style="padding:1px 0; text-align:justify;">Telepon/GSM *)</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.pelB && d.pelB.gsm)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Telepon Kantor *)</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih((d.pelA && d.pelA.kantor) || d.pelanggan.telepon)}</td>
              <td style="padding:1px 0; text-align:justify;">Telepon Kantor *)</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.pelB && d.pelB.kantor)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">Faksimil</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.pelA && d.pelA.fax)}</td>
              <td style="padding:1px 0; text-align:justify;">Faksimil</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.pelB && d.pelB.fax)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; text-align:justify;">E-mail</td>
              <td style="width:34%; padding:1px 10px 1px 0; text-align:justify;">${teksBersih(d.pelA && d.pelA.email)}</td>
              <td style="padding:1px 0; text-align:justify;">E-mail</td>
              <td style="width:34%; padding:1px 0; text-align:justify;">${teksBersih(d.pelB && d.pelB.email)}</td>
            </tr>
          </table>
          <div style="font-size:8.5pt; margin-top:1px; text-align:justify;">*) : wajib diisi</div>

          <div style="height:12px; line-height:12px; font-size:9pt;">&nbsp;</div>

        </div>

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:justify;">8. &nbsp;LAIN-LAIN</div>
        <div style="padding: 1.5px 5px; font-size:9pt; line-height:1.24; text-align:justify;">
          Syarat-syarat dan ketentuan-ketentuan yang belum diatur dalam Kontrak Berlangganan ini akan diatur dalam lampiran-lampiran yang merupakan satu bagian yang tidak terpisahkan dengan Kontrak Berlangganan ini.<br>

          <div style="height:12px; line-height:12px; font-size:9pt;">&nbsp;</div>

          Dengan menandatangani Kontrak Berlangganan ini, kami menyatakan: (i) seluruh data dan informasi yang kami berikan dalam Kontrak Berlangganan adalah lengkap, benar dan akurat; (ii) telah membaca, memahami dan menyetujui untuk tunduk kepada seluruh syarat dan ketentuan Kontrak Berlangganan ini berikut seluruh lampiran dan tambahannya yang merupakan bagian dan satu kesatuan yang tidak terpisahkan dengan Kontrak Berlangganan ini.

          <div style="text-align:right; margin-top:6px;">
            ${teksInlineBersih(kotaSurat, '105px', 'center')}, ${teksInlineBersih(tglSurat, '125px', 'center')}
          </div>
          
          <div style="height:12px; line-height:12px; font-size:9pt;">&nbsp;</div>

          <table style="width:100%; margin-top:4px; border-collapse:collapse; font-size:9pt; table-layout:fixed;">
            <tr>
              <td style="width:50%; font-weight:normal; text-align:center; padding-bottom:2px;">TELKOM</td>
              <td style="width:50%; font-weight:normal; text-align:center; padding-bottom:2px;">PELANGGAN</td>
            </tr>
            <tr>
              <td style="height:42px; vertical-align:bottom;"><br><br><br><br><br><br><br></td>
              <td style="height:42px; vertical-align:bottom;"><br><br><br><br><br><br><br></td>
            </tr>
            <tr>
              <td style="vertical-align:top; text-align:center;">
                <table style="display:inline-table; margin:0 0 0 16px; border-collapse:collapse; font-size:9pt; text-align:left;">
                  <tr>
                    <td style="width:55px; vertical-align:top; padding:1px 0;">Nama</td>
                    <td style="width:10px; vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${namaTelkom}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top; padding:1px 0;">Jabatan</td>
                    <td style="vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${jabatanTelkom}</td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:top; text-align:center;">
                <table style="display:inline-table; margin:0 0 0 16px; border-collapse:collapse; font-size:9pt; text-align:left;">
                  <tr>
                    <td style="width:55px; vertical-align:top; padding:1px 0;">Nama</td>
                    <td style="width:10px; vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${namaPelanggan}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top; padding:1px 0;">Jabatan</td>
                    <td style="vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${jabatanPelanggan}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ==================== HALAMAN 3 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} text-align:justify;">
        ${renderKopHalaman('LAMPIRAN I<br>AMANDEMEN<br>KONTRAK BERLANGGANAN', d, false)}

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:center; margin-bottom:0;">RINCIAN LAYANAN</div>
        <table style="width:100%; border-collapse:collapse; margin:0 0 4px 0; table-layout:fixed; word-wrap:break-word; font-size:8.5pt;">
          <thead>
            <tr>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 3px; text-align:center; vertical-align:middle; width:26px; font-weight:normal;">NO</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:12%; font-weight:normal;">LAYANAN</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:11%; font-weight:normal;">PAKET</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:29%; font-weight:normal;">LOKASI</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:10%; font-weight:normal;">LEBAR PITA<br>(Kbps)</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:22%; font-weight:normal;">BIAYA</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:middle; width:12%; font-weight:normal;">KETERANGAN</th>
            </tr>
            <tr>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:normal;">ALAMAT INSTALASI</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:normal;">PIC</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:normal;">INSTALASI</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:4px 4px; text-align:center; vertical-align:normal;">BULANAN</th>
            </tr>
          </thead>
          <tbody>
            ${barisLayananUtama}
            ${ekstraBarisLampiran1}
            <tr>
              <td colspan="6" style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle; font-weight:normal;">JUMLAH</td>
              <td style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle; font-weight:normal;">${formatRupiah(totalInstalasi)}</td>
              <td style="border:1px solid #000000; padding:5px 4px; text-align:center; vertical-align:middle; font-weight:normal;">${formatRupiah(totalBulanan)}</td>
              <td style="border:1px solid #000000; padding:5px 4px; vertical-align:middle;"></td>
            </tr>
          </tbody>
        </table>

        <div style="padding: 2px; font-size:9pt; line-height:1.25; text-align:justify;">
          <strong>Keterangan:</strong><br>
          Untuk jenis layanan yang membutuhkan alat atau perangkat disisi PELANGGAN, maka alat atau perangkat tersebut akan tetap merupakan milik TELKOM dan tidak menjadi milik PELANGGAN. Setelah berakhirnya jangka waktu Kontrak, TELKOM akan membongkar <em>(dismantle)</em> alat atau perangkat tersebut. Pelanggan dengan ini menjamin untuk bekerjasama dan memberikan bantuan yang diperlukan secara wajar untuk pembongkaran <em>(dismantling)</em> alat atau perangkat tersebut.

          <table style="width:100%; margin-top:12px; border-collapse:collapse; font-size:9pt; table-layout:fixed;">
            <tr>
              <td style="width:50%; font-weight:normal; text-align:center; padding-bottom:2px;">TELKOM</td>
              <td style="width:50%; font-weight:normal; text-align:center; padding-bottom:2px;">PELANGGAN</td>
            </tr>
            <tr>
              <td style="height:45px; vertical-align:bottom;"><br><br><br><br><br><br><br></td>
              <td style="height:45px; vertical-align:bottom;"><br><br><br><br><br><br><br></td>
            </tr>
            <tr>
              <td style="vertical-align:top; text-align:center;">
                <table style="display:inline-table; margin:0 0 0 16px; border-collapse:collapse; font-size:9pt; text-align:left;">
                  <tr>
                    <td style="width:55px; vertical-align:top; padding:1px 0;">Nama</td>
                    <td style="width:10px; vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${namaTelkom}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top; padding:1px 0;">Jabatan</td>
                    <td style="width:10px; vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${jabatanTelkom}</td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:top; text-align:center;">
                <table style="display:inline-table; margin:0 0 0 16px; border-collapse:collapse; font-size:9pt; text-align:left;">
                  <tr>
                    <td style="width:55px; vertical-align:top; padding:1px 0;">Nama</td>
                    <td style="width:10px; vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${namaPelanggan}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top; padding:1px 0;">Jabatan</td>
                    <td style="width:10px; vertical-align:top; padding:1px 0;">:</td>
                    <td style="vertical-align:top; padding:1px 0; font-weight:normal;">${jabatanPelanggan}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ==================== HALAMAN 4 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:9pt; line-height:1.18; text-align:justify;">
        ${renderKopHalaman('LAMPIRAN II<br>AMANDEMEN KONTRAK BERLANGGANAN', d, false)}

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:center; margin-bottom:2px;">SYARAT-SYARAT DAN KETENTUAN-KETENTUAN BERLANGGANAN</div>

        <div style="font-weight:normal; text-align:center; margin-top:1px; margin-bottom:1px;">Pasal 1<br>PENGERTIAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Layanan adalah layanan telekomunikasi dari TELKOM yang menyediakan jaringan komunikasi data secara khusus (private) dan internet untuk PELANGGAN sebagaimana disepakati dan tercantum dalam Kontrak Berlangganan dan/atau Lampiran I (Rincian Layanan) Kontrak Berlangganan dan/atau setiap amandemen, perubahan dan/atau tambahannya yang dibuat dari waktu ke waktu.</li>
          <li style="text-align:justify;">Tingkat Availability adalah tingkat ketersediaan jaringan telekomunikasi yang menjamin Layanan berdasarkan Kontrak Berlangganan ini sesuai dengan kualitas teknis yang distandarkan.</li>
          <li style="text-align:justify;">Biaya Instalasi adalah sejumlah biaya yang harus dibayar satu kali oleh PELANGGAN kepada TELKOM pada saat terintegrasikannya Layanan berdasarkan Kontrak Berlangganan ini.</li>
          <li style="text-align:justify;">Biaya Langganan Bulanan adalah sejumlah biaya yang harus dibayar setiap bulannya oleh PELANGGAN kepada TELKOM untuk penggunaan Layanan berdasarkan Kontrak Berlangganan ini.</li>
          <li style="text-align:justify;">Pengisoliran adalah pemutusan sementara Layanan sehingga Layanan tersebut tidak dapat berfungsi sebagaimana mestinya.</li>
          <li style="text-align:justify;">Berita Acara Siap Operasi adalah suatu dokumen yang ditandatangani oleh perwakilan yang berwenang dari TELKOM dan PELANGGAN yang merupakan bagian dan satu kesatuan yang tidak terpisahkan dengan Kontrak Berlangganan yang digunakan sebagai bukti dimulainya penggunaan Layanan oleh Pelanggan.</li>
          <li style="text-align:justify;">Fraud adalah tindakan kecurangan, penipuan dan/atau penggelapan dalam penggunaan Layanan TELKOM, atas kesalahan/kesengajaan/kelalaian yang dilakukan oleh PELANGGAN, dengan tujuan apapun termasuk namun tidak terbatas pada menghindari biaya jasa atau pelacakan rekaman percakapan. Adapun contoh Fraud termasuk namun tidak terbatas pada :
            <br>a. Subscription Fraud, yaitu PELANGGAN secara sengaja menghindari kewajiban membayar tagihan;
            <br>b. PBX Hacking Fraud, yaitu penggunaan PBX tanpa sepengetahuan pemiliknya untuk melakukan panggilan keluar baik lokal, SLJJ, maupun SLI;
            <br>c. Bypass Fraud, yaitu PELANGGAN melakukan routing atas suatu panggilan tanpa melewati titik-titik interkoneksi yang resmi;
            <br>d. Penjualan Kembali Ilegal, yaitu penjualan kembali Layanan TELKOM tanpa persetujuan tertulis dari TELKOM, dengan cara apapun, termasuk namun tidak terbatas pada tunnelling.
          </li>
          <li style="text-align:justify;">Kontrak Berlangganan adalah Kontrak Berlangganan berikut Lampiran I (Rincian Layanan) dan Lampiran II (Syarat-Syarat dan Ketentuan-Ketentuan Berlangganan) termasuk seluruh amandemen, perubahan dan tambahan beserta seluruh dokumen yang dibuat berdasarkan Kontrak Berlangganan ini dari waktu ke waktu.</li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:1px; margin-bottom:1px;">Pasal 2<br>RUANG LINGKUP</div>
        <p style="text-align:justify; margin:0 0 2px 0;">TELKOM akan menyediakan Layanan kepada PELANGGAN dan PELANGGAN akan menerima serta menggunakan Layanan dari TELKOM berdasarkan syarat-syarat dan ketentuan-ketentuan yang diatur dalam Kontrak Berlangganan.</p>

        <div style="font-weight:normal; text-align:center; margin-top:1px; margin-bottom:1px;">Pasal 3<br>HAK DAN KEWAJIBAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Disamping hak yang diatur dalam pasal-pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi hak TELKOM :
            <br>a. Meminta seluruh dokumen persyaratan sebagaimana ditentukan oleh TELKOM, sesuai dengan bentuk badan usaha Pelanggan yang tercantum dalam Kontrak Berlangganan ini. Telkom berhak memutuskan untuk menerima atau tidak menerima permohonan Layanan dari PELANGGAN berdasarkan penilaiannya sendiri atas kesesuaian dokumen persyaratan tersebut.
            <br>b. Melakukan pemeriksaan penggunaan Layanan.
            <br>c. Membuat dan mengirimkan [tagihan] Biaya Instalasi, Biaya Langgangan Bulanan dan Biaya Lainnya kepada PELANGGAN.
            <br>d. Menerima pembayaran tagihan secara penuh dan tepat waktu serta memungut denda (dalam hal terjadi keterlambatan pembayaran) dari PELANGGAN sebagaimana dimaksud Pasal 4 Lampiran II Kontrak Berlangganan ini.
            <br>e. Mengubah sewaktu-waktu atas pertimbangannya sendiri biaya dan/atau tarif Layanan dengan menyampaikan pemberitahuan tertulis kepada Pelanggan sekurang-kurangnya 1 (satu) bulan sebelum biaya dan/atau tarif baru tersebut diberlakukan.
            <br>f. Melakukan tindakan isolir dan/atau pemutusan Layanan secara sepihak apabila PELANGGAN terindikasi melakukan aktivitas yang berpotensi mengganggu kualitas Layanan secara nasional dan/atau melakukan tindakan kriminal/melanggar hukum termasuk dan tidak terbatas pada: botnet, penyebaran malware seperti virus, worm, trojan, spam, melakukan hacking, web defacing, menggunakan robot, spider atau automated device, yang dapat mematikan atau membebani sistem dan/atau jaringan telekomunikasi.
          </li>
          <li style="text-align:justify;">Disamping kewajiban yang diatur dalam pasal-pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi kewajiban TELKOM :
            <br>a. Menjaga agar Layanan berfungsi dengan baik sesuai dengan SLG yang disepakati oleh para pihak.
            <br>b. Melakukan perbaikan terhadap gangguan pada Layanan.
            <br>c. Memberitahukan kepada PELANGGAN mengenai adanya kegiatan pemeliharaan atau tindakan lain yang dapat mengakibatkan terganggunya atau tidak berfungsinya Layanan sekurang-kurangnya 1 (satu) hari sebelum pelaksanaan kegiatan pemelihaaraan atau tindakan lain tersebut.
          </li>
          <li style="text-align:justify;">Disamping hak yang diatur dalam pasal-pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi hak PELANGGAN :
            <br>a. Mendapatkan dan memanfaatkan Layanan selama 24 jam sehari, 7 hari seminggu.
            <br>b. Memperoleh Restitusi apabila Layanan tersebut mengalami gangguan. Syarat dan jumlah Restitusi diatur dalam Pasal 5 Lampiran II Kontrak Berlangganan ini.
          </li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 5 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:9pt; line-height:1.2; text-align:justify;">
        <ol start="4" style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Disamping kewajiban yang diatur dalam pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi kewajiban PELANGGAN :
            <br>4.1. Membayar tagihan secara penuh dan tepat waktu sebelum atau pada tanggal Tanggal Jatuh Tempo sebagaimana ditentukan dalam Kontrak Berlangganan ini.
            <br>4.2. Menyediakan, memasang, memelihara, dan memperbaiki Instalasi Kabel Gedung (IKG) dan Customer Premises Equipment (CPE) yang sesuai dengan spesifikasi teknis yang ditentukan oleh TELKOM untuk memastikan agar Layanan dapat berfungsi dengan baik.
            <br>4.3. Menjamin bahwa PELANGGAN akan menggunakan Layanan ini hanya untuk komunikasi data, tidak digunakan untuk terminasi traffik illegal, tidak akan disewakan/diretailkan, tidak dijual atau dipindahtangankan dengan cara apapun baik sebagian atau seluruhnya kepada pihak ketiga tanpa persetujuan tertulis dari TELKOM.
            <br>4.4. Menaati ketentuan yang berlaku berkaitan dengan pelaksanaan Layanan.
            <br>4.5. Menjamin tidak akan melakukan aktivitas yang berpotensi mengganggu kualitas Layanan secara nasional dan/atau melakukan tindakan kriminal/melanggar hukum termasuk dan tidak terbatas pada: botnet, penyebaran malware seperti virus, worm, trojan, spam, melakukan hacking, web defacing, menggunakan robot, spider atau automated device, yang dapat mematikan atau membebani sistem dan/atau jaringan telekomunikasi TELKOM Group.
            <br>4.6. Memelihara instalasi dan perangkat CPE TELKOM yang disewakan/diserahkan kepada PELANGGAN agar selalu dalam keadaan baik atas biaya PELANGGAN sendiri.
            <br>4.7. Memelihara dan memastikan keberlangsungan serta keamanan perangkat dan/atau jaringan miliknya agar bebas dari resiko Fraud, diantaranya dengan menyesuaikan keamanan perangkat dan/atau penggunaan perangkat yang highly secured terhadap Fraud, yang karenanya PELANGGAN bertanggung jawab atas biaya/kerugian atas Fraud yang terjadi, serta tidak akan mengajukan tuntutan/gugatan serta akan membebaskan TELKOM dari segala tuntutan/gugatan pihak manapun sehubungan dengan tidak dilakukannya kewajiban berdasarkan ayat ini.
            <br>4.8. Bertanggung jawab dan membebaskan TELKOM dari segala tuntutan/gugatan pihak manapun terkait dengan pelanggaran Kontrak Berlangganan oleh PELANGGAN, termasuk namun tidak terbatas pada ketentuan tentang Larangan Bagi PELANGGAN di bawah ini.
            <br>4.9. Bertanggungjawab sepenuhnya dan membebaskan TELKOM dari segala tuntutan, dalam hal timbul gugatan atau tuntutan dari pihak ketiga atas setiap penggunaan Layanan TELKOM oleh siapapun termasuk penggunaan oleh anggota keluarga, pegawai, penghuni atau pihak ketiga lainnya.
          </li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 4<br>PEMBAYARAN DAN TATA CARA PEMBAYARAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Pelanggan harus membayar Biaya Instalasi bersamaan dengan pembayaran Biaya Langganan Bulanan untuk bulan pertama. Biaya Langganan Bulanan bulan pertama dihitung secara prorata sesuai dengan jumlah hari dimana Pelanggan telah menggunakan Layanan pada bulan tersebut.</li>
          <li style="text-align:justify;">Seluruh pemenuhan kewajiban perpajakan yang timbul dari atau sehubungan dengan tagihan berdasarkan Kontrak Berlangganan ini akan menjadi tanggung jawab masing-masing pihak berdasarkan ketentuan peraturan perundang-undangan perpajakan yang berlaku di Indonesia.</li>
          <li style="text-align:justify;">Dalam hal PELANGGAN melakukan pemotongan PPh Pasal 23, maka PELANGGAN wajib menyerahkan bukti pemotongan PPh Pasal 23 tersebut kepada TELKOM, paling lambat akhir bulan N+1 setelah pembayaran.</li>
          <li style="text-align:justify;">Besaran nilai PPN mengikuti ketentuan yang berlaku di Indonesia dan menjadi kewajiban bagi PELANGGAN.</li>
          <li style="text-align:justify;">Tanggal Jatuh Tempo pembayaran tagihan biaya-biaya atas Layanan yang ditagihkan secara bulanan adalah pada tanggal 20 setiap bulannya atau tanggal yang tercantum di dalam tagihan (invoice) setiap bulannya.</li>
          <li style="text-align:justify;">Tanggal Jatuh Tempo pembayaran tagihan biaya-biaya atas Layanan yang ditagihkan dengan periode penagihan non-bulanan (misalnya, dua bulanan, triwulanan, dan periode lainnya) ditetapkan setiap tanggal 20 pada bulan jatuh tempo.</li>
          <li style="text-align:justify;">Perhitungan jumlah denda keterlambatan dan pengenaan sanksi pemutusan Layanan ditentukan berdasarkan batas akhir pembayaran yang ditetapkan dalam Kontrak atau Amandemen.</li>
          <li style="text-align:justify;">Apabila PELANGGAN terlambat membayar tagihan, PELANGGAN akan dikenakan denda keterlambatan yang dihitung sejak Tanggal Jatuh Tempo (due date) pembayaran sampai dengan dilakukannya pembayaran tagihan oleh PELANGGAN, dengan ketentuan sebagai berikut:
            <br>a. Denda dihitung per hari kalender sejak tanggal Jatuh Tempo pembayaran dan jumlahnya ditentukan dalam Kontrak atau Amandemen dan besar denda yang dikenakan adalah 1‰ (satu perseribu) dari nilai Kontrak;
            <br>b. Apabila melewati tanggal 20 pada bulan Jatuh Tempo PELANGGAN belum melakukan pembayaran, maka paling lambat tanggal 7 (tujuh) bulan berikutnya akan dilakukan pemutusan atau isolir terhadap Layanan.
            <br>c. Apabila PELANGGAN tetap tidak melakukan kewajiban pembayaran atas Layanan yang telah digunakan, TELKOM berhak melakukan pemutusan dan/atau isolir terhadap semua layanan TELKOM Group.
            <br>d. TELKOM atas keputusannya sendiri dapat melakukan penyambungan kembali Layanan setelah Pelanggan menyelesaikan seluruh kewajiban pembayarannya berdasarkan Kontrak Berlangganan ini terhadap TELKOM.
            <br>e. Apabila PELANGGAN tetap tidak beritikad baik untuk menyelesaikan seluruh kewajibannya, termasuk kewajiban pembayaran, berdasarkan Kontrak atau Amandemen, TELKOM akan menolak permohonan PELANGGAN untuk mendapatkan layanan apapun yang diberikan oleh TELKOM Group.
          </li>
          <li style="text-align:justify;">TELKOM dapat menyerahkan proses penagihan pembayaran atas Layanan yang telah digunakan PELANGGAN kepada Pihak lain, apabila PELANGGAN tidak beritikad baik untuk menyelesaikan kewajiban pembayaran atas Layanan.</li>
          <li style="text-align:justify;">Dalam hal PELANGGAN memutuskan Layanan berdasarkan Kontrak Berlangganan ini secara sepihak dan/atau mengundurkan diri sebelum berakhirnya jangka waktu Kontrak, maka PELANGGAN wajib membayar denda 30% (tiga puluh perseratus) dari Biaya Langganan Bulanan dikalikan jumlah sisa jangka waktu Kontrak yang belum dijalani sampai dengan berakhirnya jangka waktu Kontrak tersebut.</li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 6 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:9pt; line-height:1.2; text-align:justify;">
        <div style="font-weight:normal; text-align:center; margin-top:0; margin-bottom:1px;">Pasal 5<br>RESTITUSI</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Apabila Layanan mengalami gangguan sehingga tidak sesuai dengan tingkat Availability yang disepakati, maka untuk lokasi yang mengalami gangguan, PELANGGAN berhak memperoleh restitusi, dengan perhitungan sebagai berikut :
            <div style="margin:2px 0 2px 12px;">
              <strong>Restitusi = [(A-Av) / C] x B</strong><br>
              A &nbsp;&nbsp;= jumlah jam gangguan dalam bulan gangguan<br>
              Av = [(100% - Tingkat Availability) x jumlah jam dalam bulan gangguan]<br>
              B &nbsp;&nbsp;= Biaya Langganan Bulanan<br>
              C &nbsp;&nbsp;= jumlah jam dalam bulan gangguan
            </div>
          </li>
          <li style="text-align:justify;">Permintaan restitusi dimaksud pada ayat ini, dapat diajukan oleh PELANGGAN, sebanyak-banyaknya adalah sebesar 0,05% dari Biaya Langganan Bulanan.</li>
          <li style="text-align:justify;">TELKOM akan memberitahukan jumlah restitusi secara tertulis kepada PELANGGAN bersamaan dengan penyampaian tagihan. Restitusi akan secara otomatis akan mengurangi jumlah total tagihan bulan tersebut.</li>
          <li style="text-align:justify;">Restitusi tidak akan diberikan apabila gangguan terjadi diluar ruas Layanan yang menjadi tanggung jawab TELKOM dan/atau akibat gangguan yang bukan merupakan kelalaian atau kesalahan TELKOM.</li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 6<br>LARANGAN BAGI PELANGGAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">PELANGGAN dilarang melakukan pemindahan atau perubahan apapun terhadap Jaringan TELKOM serta melakukan Fraud sehubungan dengan penggunaan Layanan TELKOM.</li>
          <li style="text-align:justify;">PELANGGAN dilarang dengan sengaja dan tanpa hak atau melawan hukum menyalahgunakan Layanan TELKOM dengan cara melakukan akses melalui komputer dan/atau sistem elektronik apapun dengan cara dan dengan tujuan apapun tanpa izin TELKOM.</li>
          <li style="text-align:justify;">PELANGGAN dilarang menggunakan Layanan TELKOM untuk melakukan tindakan yang dapat merugikan pihak manapun, termasuk namun tidak terbatas pada :
            <br>a. Mengganggu atau merusak suatu Jaringan TELKOM atau sistem komputer pihak manapun;
            <br>b. Menggunakan Perangkat yang tidak secure terhadap terjadinya Fraud;
            <br>c. Pengiriman e-mail secara terus menerus dengan tidak bertanggung jawab (spamming);
            <br>d. Memalsukan e-mail header atau metode lain yang digunakan dengan tujuan untuk memalsukan identitas PELANGGAN;
            <br>e. Pelanggaran terhadap Hak atas Kekayaan Intelektual (HaKI) pihak lain;
            <br>f. Tindakan-tindakan yang melanggar norma-norma kesopanan, kesusilaan, peraturan atau hukum yang berlaku di wilayah Negara Republik Indonesia.
          </li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 7<br>SANKSI-SANKSI</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Pelanggaran yang dilakukan PELANGGAN terhadap ketentuan dalam Kontrak Berlangganan dapat dikenakan sanksi berupa isolir Layanan, termasuk denda keterlambatan, ganti rugi Fraud, dan denda pengakhiran, downgrade, pemutusan/pencabutan Layanan dan/atau blacklist.</li>
          <li style="text-align:justify;">Pengenaan sanksi berdasarkan ketentuan Kontrak Berlangganan tidak mengurangi kewajiban PELANGGAN untuk melunasi seluruh tagihan/tunggakan/denda kepada TELKOM.</li>
          <li style="text-align:justify;">PELANGGAN dengan ini memahami, mengetahui dan menyatakan bahwa ketentuan dalam Kontrak Berlangganan merupakan pemberitahuan/informasi tentang kemungkinan dikenakannya sanksi tersebut, oleh karena itu tidak ada kewajiban bagi TELKOM untuk memberitahukan terlebih dahulu kepada PELANGGAN atas pengenaan sanksi dimaksud.</li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 8<br>PEMBATASAN TANGGUNG JAWAB TELKOM</div>
        <p style="text-align:justify; margin:0 0 1px 0;">TELKOM dibebaskan dari tanggung jawab atas pembayaran kompensasi atau kerugian yang ditanggung oleh PELANGGAN, baik kerugian langsung ataupun tidak langsung sebagai akibat dari berfungsinya atau tidak berfungsinya sambungan Layanan TELKOM, karena :</p>
        <ol type="a" style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Kerusakan atau gangguan Layanan TELKOM akibat kesalahan atau kelalaian PELANGGAN;</li>
          <li style="text-align:justify;">Perubahan Jaringan TELKOM, perubahan nomor, atau jaringan telekomunikasi TELKOM yang bukan disebabkan oleh kesalahan atau kelalaian TELKOM;</li>
          <li style="text-align:justify;">Kegagalan interkoneksi Jaringan dengan penyelenggara telekomunikasi lain;</li>
          <li style="text-align:justify;">Kesalahan tagihan akibat dari akses/pemakaian Layanan yang disediakan oleh penyelenggara jasa telekomunikasi lain di luar TELKOM;</li>
          <li style="text-align:justify;">Kerusakan akibat peristiwa/kejadian diluar batas kendali normal TELKOM (Keadaan Kahar).</li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 7 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:9pt; line-height:1.2; text-align:justify;">
        <div style="font-weight:normal; text-align:center; margin-top:0; margin-bottom:1px;">Pasal 9<br>KEADAAN KAHAR</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Keadaan kahar adalah keadaan-keadaan diluar kekuasaan salah satu atau para pihak yang mengakibatkan pihak dimaksud tidak dapat melaksanakan kewajibannya berdasarkan Kontrak Berlangganan ini. Keadaaan kahar meliputi gempa bumi, angin taufan, banjir besar, kebakaran besar, tanah longsor, wabah penyakit, dan pemogokan umum, huru-hara, perang, sabotase, pemberontakan, kerusakan jaringan akibat perbuatan pihak ketiga, putus aliran listrik umum/PLN diluar kemampuan Para Pihak untuk mengatasinya, kebijakan pemerintah dan hal-hal lain sejenis yang berada diluar kekuasaan atau kemampuan para pihak.</li>
          <li style="text-align:justify;">Dalam hal terjadi keadaan kahar sebagaimana dimaksud ayat (1) Pasal ini, maka pihak yang mengalami keadaan kahar harus memberitahukan secara tertulis mengenai terjadinya keadaan kahar tersebut kepada Pihak lainnya paling lambat 14 (empat belas) hari kalender sejak saat terjadinya keadaan kahar tersebut.</li>
          <li style="text-align:justify;">Semua kerugian dan biaya salah satu pihak atau para pihak yang timbul akibat peristiwa keadaan kahar tidak menjadi tanggung-jawab pihak lainnya.</li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 10<br>PEMUTUSAN KONTRAK</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Apabila pemerintah Republik Indonesia mengundangkan peraturan dan/atau menetapkan kebijakan baru yang mengakibatkan Kontrak Berlangganan ini tidak mungkin dilaksanakan, para pihak dapat mengakhiri Kontrak Berlangganan ini tanpa adanya tuntutan apapun atau beban keuangan atau kewajiban apapun kepada pihak lainnya.</li>
          <li style="text-align:justify;">TELKOM berhak untuk mengakhiri Kontrak Berlangganan ini secara sepihak tanpa pemberitahuan apapun dengan ketentuan sebagai berikut:
            <br>a. Apabila PELANGGAN tetap tidak melakukan pembayaran dalam jangka waktu yang ditentukan dalam Kontrak atau Amandemen.
            <br>b. Apabila PELANGGAN melanggar Pasal 3 ayat (4) butir 4.3 dan 4.5 Lampiran II Kontrak Berlangganan ini.
            <br>c. Setelah TELKOM melakukan pemutusan atau isolir terhadap Layanan.
          </li>
          <li style="text-align:justify;">Apabila pada saat Kontrak Berlangganan ini berakhir atau diakhiri masih terdapat kewajiban yang belum diselesaikan oleh salah satu pihak, maka berakhirnya atau diakhirinya Kontrak Berlangganan ini tidak akan mengakhiri kewajiban-kewajiban pihak tersebut sampai dengan diselesaikannya kewajiban-kewajiban tersebut sesuai dengan ketentuan dalam Kontrak Berlangganan ini.</li>
          <li style="text-align:justify;">Para Pihak sepakat untuk menyampingkan berlakunya ketentuan Pasal 1266 Kitab Undang-Undang Hukum Perdata Indonesia terhadap Kontrak Berlangganan ini, sehingga pemutusan Layanan dan/atau pengakhiran Kontrak Berlangganan ini dapat dilakukan tanpa perlu terlebih dahulu menunggu keputusan pengadilan.</li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 11<br>PENYELESAIAN PERSELISIHAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li style="text-align:justify;">Apabila terjadi perbedaan pendapat atau perselisihan dalam pelaksanaan dan/atau penafsiran Kontrak Berlangganan ini, sejauh mungkin Para Pihak akan menyelesaikan melalui musyawarah.</li>
          <li style="text-align:justify;">Apabila musyawarah tidak mencapai kesepakatan, maka Para Pihak sepakat untuk menyelesaikannya melalui Pengadilan Negeri Jakarta Barat.</li>
          <li style="text-align:justify;">Selama perselisihan masih dalam proses penyelesaian, maka TELKOM dan PELANGGAN wajib untuk tetap melaksanakan kewajibannya berdasarkan Kontrak Berlangganan ini.</li>
        </ol>

        <div style="font-weight:normal; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 12<br>PENUTUP</div>
        <ol style="margin:0 0 2px 14px; padding:0; z-index:0; text-align:justify;">
          <li style="text-align:justify;">Apabila terjadi penambahan, pengurangan atau perubahan Layanan, akan dibuat secara tertulis dalam Amandemen dan merupakan bagian yang tak terpisahkan serta mempunyai kekuatan hukum yang sama dengan Kontrak Berlangganan ini.</li>
          <li style="text-align:justify;">Kontrak Berlangganan ini tunduk pada Hukum Negara Republik Indonesia.</li>
          <li style="text-align:justify;">Dalam melaksanakan Kontrak Berlangganan ini Para Pihak wajib untuk mentaati ketentuan perundang-undangan atau peraturan-peraturan yang dikeluarkan oleh instansi yang berwenang yang berkaitan dengan Kontrak Berlangganan ini.</li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 8 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} text-align:justify;">
        ${renderKopHalaman('LAMPIRAN III<br>AMANDEMEN<br>KONTRAK BERLANGGANAN', d, false)}

        <div style="${BLUE_SECTION_BAR_NORMAL} text-align:center;">Dokumen Pendukung</div>
        <div style="height: 300px; max-height: 300px; padding: 4px; overflow: hidden;"></div>
      </div>
    </div>
  `;
}