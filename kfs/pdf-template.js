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
    <div style="display:inline-block; width:${minWidth}; min-height:15px; line-height:15px; font-family:Arial, Helvetica, sans-serif; font-size:8.5pt; color:#000000; padding:0 2px; box-sizing:border-box; vertical-align:bottom;">
      ${isi ? `<span style="color:#000000;">${isi}</span>` : '&nbsp;'}
    </div>
  `;
}

function teksInlineBersih(teks, minWidth = '110px', align = 'center') {
  const isi = bersihNilai(teks);
  return `<span style="display:inline-block; min-width:${minWidth}; text-align:${align}; padding:0 4px; line-height:1.15; font-family:Arial, Helvetica, sans-serif; color:#000000;">${isi || '&nbsp;'}</span>`;
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
          <td style="border:1px solid #000000 !important; width:15px; height:17px; text-align:center; font-family:Arial, Helvetica, sans-serif; font-size:8.5pt; font-weight:${s.sep ? 'bold' : 'normal'}; padding:0; background:#ffffff !important; color:#000000;">
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
      `<td style="border:1px solid #000000 !important; width:16px; height:18px; text-align:center; font-family:Arial, Helvetica, sans-serif; font-size:8.5pt; font-weight:normal; padding:0; background:#ffffff !important; color:#000000;">${ch === ' ' ? '&nbsp;' : ch}</td>`
    ).join('')
  }</tr></table>`;
}

function renderLogoTelkom() {
  return `
    <div style="text-align:right; vertical-align:middle; padding:0;">
      <img src="../logotelkom-removebg-preview.png" alt="Logo Telkom Indonesia" style="max-height:60px; width:auto; display:inline-block;" />
    </div>
  `;
}

function renderKopHalaman(judulKiri, d, isKontrakAwal = false) {
  const labelNomorKontrak = isKontrakAwal ? 'Nomor Kontrak Awal' : 'Nomor Kontrak';
  const nomAmandemen = bersihNilai(d.nomorAmandemen);
  const nomKontrak = bersihNilai(d.nomorKontrak) || 'K.TEL..../HK.810/........-...../20..';

  return `
    <table style="width:100%; border-collapse:collapse; margin-bottom:4px; font-family:Arial, Helvetica, sans-serif; color:#000000;">
      <tr>
        <td style="width:29%; font-weight:bold; font-size:10pt; line-height:1.15; vertical-align:middle; padding:0; text-align:left; text-transform:uppercase;">
          ${judulKiri}
        </td>
        <td style="width:45%; font-weight:bold; font-size:9.5pt; line-height:1.2; vertical-align:middle; padding:0 4px; text-align:left;">
          PERUSAHAAN PERSEROAN (PERSERO)<br>
          PT TELEKOMUNIKASI INDONESIA Tbk
        </td>
        <td style="width:26%; text-align:right; vertical-align:middle; padding:0;">
          ${renderLogoTelkom()}
        </td>
      </tr>
    </table>

    <table style="width:100%; border-collapse:collapse; margin-bottom:4px; font-family:Arial, Helvetica, sans-serif; font-size:8.2pt; color:#000000;">
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
          <div style="padding-bottom:1px; font-weight:bold; font-size:8.2pt;">${nomKontrak}</div>
        </td>
      </tr>
    </table>
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
      <td style="border:1px solid #000000; padding:2px 3px; text-align:center; vertical-align:middle;">${i + 1}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:left; vertical-align:middle;">${bersihNilai(item.namaLayanan)}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:left; vertical-align:middle;">${bersihNilai(item.paket)}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:left; vertical-align:middle;">${bersihNilai(item.alamatInstalasi)}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:left; vertical-align:middle;">${bersihNilai(item.pic) || bersihNilai(d.pelA && d.pelA.nama) || bersihNilai(d.pelanggan.wakilNama)}</td>
      <td style="border:1px solid #000000; padding:2px 3px; text-align:center; vertical-align:middle;">${bersihNilai(item.lebarPita)}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:right; vertical-align:middle;">${formatRupiah(item.biayaInstalasi)}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:right; vertical-align:middle;">${formatRupiah(item.biayaBulanan)}</td>
      <td style="border:1px solid #000000; padding:2px 4px; text-align:left; vertical-align:middle;">${bersihNilai(item.lokasi)}</td>
    </tr>
  `).join('');

  const barisKosongLampiran1 = Math.max(0, 6 - layananList.length);
  let ekstraBarisLampiran1 = '';
  for (let i = 0; i < barisKosongLampiran1; i++) {
    ekstraBarisLampiran1 += `<tr><td style="border:1px solid #000000; height:16px;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td><td style="border:1px solid #000000;"></td></tr>`;
  }

  const tglMulai = formatTanggalIndo(d.berlakuDari) || '';
  const tglSelesai = formatTanggalIndo(d.berlakuSampai) || '';
  const tglSurat = formatTanggalIndo(d.tanggalSurat) || '';
  const kotaSurat = bersihNilai(d.kotaSurat) || 'Banyuwangi';

  const rawJangka = bersihNilai(d.jangkaWaktu);
  const labelJangkaWaktu = rawJangka
    ? (/bulan|tahun|hari/i.test(rawJangka) ? rawJangka : `${rawJangka} Bulan`)
    : '';

  const BLUE_HEADER_BOX = 'background-color:#cde7fa !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; padding:2.5px 5px; margin-top:3px; margin-bottom:1.5px; font-size:7.8pt; line-height:1.2; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:justify;';
  const BLUE_SECTION_BAR = 'background-color:#cde7fa !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-weight:bold; padding:2px 5px; margin-top:4px; margin-bottom:1.5px; font-size:8pt; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:left;';
  const BLUE_SUB_BAR = 'background-color:#e6f2fc !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; font-weight:bold; padding:1.5px 5px; margin-top:2px; margin-bottom:1.5px; font-size:7.8pt; color:#000000; font-family:Arial, Helvetica, sans-serif; text-align:left;';
  const CHK_BOX = 'display:inline-block; border:1px solid #000000; width:12px; height:11px; text-align:center; line-height:10px; font-size:7.5pt; font-weight:bold; background:#ffffff;';

  // Tinggi dikunci pas 294mm agar halaman terakhir tidak meluber menjadi halaman ke-9 yang kosong
  const PAGE_BASE = isExportMode
    ? 'background:#ffffff; width:210mm; height:294mm; max-height:294mm; padding:6mm 10mm; margin:0; font-family:Arial, Helvetica, sans-serif; color:#000000; font-size:7.8pt; line-height:1.2; box-sizing:border-box; overflow:hidden; text-align:justify; page-break-inside:avoid;'
    : 'background:#ffffff; width:210mm; height:294mm; max-height:294mm; padding:6mm 10mm; margin:0 auto 12px auto; box-shadow:0 4px 16px rgba(0,0,0,0.22); font-family:Arial, Helvetica, sans-serif; color:#000000; font-size:7.8pt; line-height:1.2; box-sizing:border-box; overflow:hidden; text-align:justify;';

  return `
    <div id="kfs-printable-root" style="font-family:Arial, Helvetica, sans-serif; color:#000000; text-align:justify;">
      <!-- ==================== HALAMAN 1 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE}">
        ${renderKopHalaman('AMANDEMEN<br>KONTRAK<br>BERLANGGANAN', d, true)}

        <div style="${BLUE_HEADER_BOX}">
          <strong>1. &nbsp;PERUSAHAAN PERSEROAN (PERSERO) PT TELEKOMUNIKASI INDONESIA Tbk (TELKOM)</strong><br>
          Suatu perusahaan penyedia jasa dan jaringan telekomunikasi yang dibentuk dan didirikan berdasarkan hukum Republik Indonesia, berkedudukan di Jalan Japati Nomor 1 Bandung, Indonesia 40133.<br>
          Diwakili secara sah oleh :
        </div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:120px; padding:1px 0;">Nama</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0;">${teksBersih(d.wakilTelkom && d.wakilTelkom.nama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Jabatan</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0;">${teksBersih(d.wakilTelkom && d.wakilTelkom.jabatan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Unit</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0;">${teksBersih((d.wakilTelkom && d.wakilTelkom.unit) || 'Telda Banyuwangi - Witel Jatim Timur')}</td>
            </tr>
          </table>
        </div>

        <div style="${BLUE_HEADER_BOX}">
          <strong>2. &nbsp;PELANGGAN</strong><br>
          Identitas Perusahaan/Institusi
        </div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:120px; padding:1px 0;">Nama</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0;">${teksBersih(d.pelanggan.perusahaan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0; vertical-align:top;">Alamat</td>
              <td style="padding:1px 0; vertical-align:top;">:</td>
              <td style="padding:1px 0;">
                ${teksBersih(d.pelanggan.alamat)}
                <div style="margin-top:1px; text-align:right;">
                  Kode Pos &nbsp;${teksInlineBersih(d.pelanggan.kodePos, '70px', 'center')}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:1px 0;">NPWP</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:right;">${renderKotakNPWP(d.pelanggan.npwp)}</td>
            </tr>
          </table>
        </div>

        <div style="${BLUE_SUB_BAR}">Diwakili secara sah oleh :</div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:120px; padding:1px 0;">Nama</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0;">${teksBersih(d.pelanggan.wakilNama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Jabatan</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0;">${teksBersih(d.pelanggan.wakilJabatan)}</td>
            </tr>
          </table>
        </div>

        <div style="${BLUE_SECTION_BAR}">3. &nbsp;LAYANAN</div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:54%; padding:1px 0;">Layanan Connectivity TELKOM</td>
              <td style="padding:1px 0;"><span style="${CHK_BOX}">${cekConn}</span></td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Layanan Non-Connectivity TELKOM</td>
              <td style="padding:1px 0;"><span style="${CHK_BOX}">${cekNonConn}</span></td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Bundling Layanan Connectivity TELKOM &amp; Solusi</td>
              <td style="padding:1px 0;"><span style="${CHK_BOX}">${cekBundling}</span></td>
            </tr>
          </table>
        </div>

        <div style="${BLUE_SUB_BAR}">Jaminan Layanan</div>
        <div style="padding: 1px 5px; font-size:7.8pt;">
          Tingkat Availability ${teksInlineBersih(d.availability, '40px', 'center')} %
        </div>

        <div style="padding: 1px 5px; font-size:7.6pt; text-align:justify;">
          <strong>Mekanisme Pemenuhan CPE</strong><br>
          PELANGGAN harus menyiapkan Customer Premises Equipment (CPE) sesuai dengan spesifikasi yang ditentukan TELKOM sebelum proses integrasi.
        </div>

        <div style="${BLUE_SUB_BAR}">Rincian Layanan</div>
        <table style="width:100%; border-collapse:collapse; margin:2px 0; table-layout:fixed; word-wrap:break-word; font-size:7pt;">
          <thead>
            <tr>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:22px; font-weight:bold;">No</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:12%; font-weight:bold;">Layanan</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:11%; font-weight:bold;">Paket</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:29%; font-weight:bold;">Lokasi</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:10%; font-weight:bold;">Lebar Pita<br>(Kbps)</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:22%; font-weight:bold;">Biaya</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:12%; font-weight:bold;">Keterangan</th>
            </tr>
            <tr>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">Alamat Instalasi</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">PIC</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">Instalasi</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">Bulanan</th>
            </tr>
          </thead>
          <tbody>
            ${barisLayananUtama}
            <tr>
              <td colspan="6" style="border:1px solid #000000; padding:2px; text-align:center; font-weight:bold;">Jumlah</td>
              <td style="border:1px solid #000000; padding:2px; text-align:right; font-weight:bold;">${formatRupiah(totalInstalasi)}</td>
              <td style="border:1px solid #000000; padding:2px; text-align:right; font-weight:bold;">${formatRupiah(totalBulanan)}</td>
              <td style="border:1px solid #000000; padding:2px;"></td>
            </tr>
          </tbody>
        </table>

        <div style="padding: 0 5px; font-size:7pt; line-height:1.2; text-align:justify;">
          Apabila kolom rincian layanan di atas tidak cukup, rincian layanan akan diuraikan dalam Lampiran I yang merupakan satu kesatuan serta bagian yang tidak terpisahkan dengan Kontrak Berlangganan ini.<br>
          PELANGGAN akan diberikan masa uji coba layanan maksimum selama 12 (dua belas) hari kalender terhitung sejak tanggal aktivasi yang dituangkan dalam Berita Acara Siap Operasi (BASO). <span style="font-style:italic;">(layanan temporer tidak diberikan masa uji coba/trial)</span><br>
          Tanggal efektif dimulainya penagihan biaya-biaya akan ditentukan dalam Berita Acara Siap Operasi (BASO).
        </div>

        <div style="${BLUE_SECTION_BAR}">4. &nbsp;BIAYA-BIAYA (Rupiah)</div>
        <div style="padding: 1px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:45%; padding:1px 0;">Biaya Instalasi</td>
              <td style="width:10px; padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:right;">
                Rp &nbsp;<span style="display:inline-block; min-width:170px; text-align:right; padding-right:4px;">${formatRupiah(totalInstalasi)}</span>,-
              </td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Biaya Langganan Bulanan</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:right;">
                Rp &nbsp;<span style="display:inline-block; min-width:170px; text-align:right; padding-right:4px;">${formatRupiah(totalBulanan)}</span>,-
              </td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Biaya Lainnya (IKG, Biaya Integrasi)</td>
              <td style="padding:1px 0;">:</td>
              <td style="padding:1px 0; text-align:right;">
                Rp &nbsp;<span style="display:inline-block; min-width:170px; text-align:right; padding-right:4px;">${formatRupiah(d.biayaLainnya || 0)}</span>,-
              </td>
            </tr>
          </table>
          <div style="margin-top:1px; font-size:7.1pt; font-style:italic;">Biaya-biaya tersebut di atas belum termasuk PPN</div>
        </div>
      </div>

      <!-- ==================== HALAMAN 2 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE}">
        <div style="${BLUE_SECTION_BAR} margin-top:0;">5. &nbsp;TATA CARA PEMBAYARAN</div>
        <div style="padding: 1.5px 5px; font-size:7.6pt; line-height:1.24; text-align:justify;">
          TELKOM akan mengirim Official Receipt selambat-lambatnya pada tanggal 10 (sepuluh) setiap bulannya ke alamat kontak person PELANGGAN yang dicantumkan dalam Kontrak Berlangganan ini.<br>
          PELANGGAN harus melakukan pembayaran paling lambat pada tanggal 20 (dua puluh) setiap bulannya (Tanggal Jatuh Tempo) atau sesuai tanggal jatuh tempo yang tercantum di dalam tagihan (invoice) setiap bulannya, dengan cara transfer ke rekening bank TELKOM atau virtual account yang tercantum di dalam tagihan (invoice), kecuali ditentukan lain berdasarkan suatu instrumen tertulis yang diterbitkan oleh TELKOM. Seluruh biaya yang timbul dari dan/atau berhubungan dengan pembayaran tersebut merupakan tanggung jawab PELANGGAN sendiri.
        </div>

        <div style="${BLUE_SECTION_BAR}">6. &nbsp;JANGKA WAKTU</div>
        <div style="padding: 1.5px 5px; font-size:7.6pt; line-height:1.24; text-align:justify;">
          Jangka waktu Kontrak Berlangganan adalah terhitung sejak tanggal mulai jangka waktu delivery Layanan, sampai dengan diselesaikan seluruh hak dan kewajiban TELKOM dan PELANGGAN.<br>
          Jangka waktu Kontrak Berlangganan terhitung sejak tanggal ${teksInlineBersih(tglMulai, '115px', 'center')} sampai dengan tanggal ${teksInlineBersih(tglSelesai, '115px', 'center')}, dengan rincian sebagai berikut:
          <table style="width:100%; border-collapse:collapse; margin:2px 0; font-size:7.5pt;">
            <tr>
              <td style="width:295px; padding:1px 0;">Jangka waktu delivery &nbsp;<em>Delivery Time</em></td>
              <td style="width:10px;">:</td>
              <td style="padding:1px 0;">${teksInlineBersih(d.deliveryTime, '40px', 'center')} hari</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Maksimal sampai dengan tanggal &nbsp;<em>Shall be maximum on date</em></td>
              <td>:</td>
              <td style="padding:1px 0;">${teksInlineBersih(tglSelesai, '125px', 'center')}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Jangka waktu Layanan &nbsp;<em>Term of subscribe</em></td>
              <td>:</td>
              <td style="padding:1px 0;">${teksInlineBersih(labelJangkaWaktu, '70px', 'center')} berlaku sejak tanggal ${teksInlineBersih(tglMulai, '95px', 'center')} sampai dengan ${teksInlineBersih(tglSelesai, '95px', 'center')}</td>
            </tr>
          </table>
          Jangka waktu tersebut dapat diperpanjang berdasarkan kesepakatan tertulis antara TELKOM dan PELANGGAN. PELANGGAN harus menyampaikan pemberitahuan secara tertulis kepada TELKOM sekurang-kurangnya 30 (tiga puluh) hari sebelum tanggal berakhirnya jangka waktu Kontrak untuk melakukan perpanjangan Layanan berdasarkan Kontrak Berlangganan ini.
        </div>

        <div style="${BLUE_SECTION_BAR}">7. &nbsp;KONTAK PERSON</div>
        <div style="${BLUE_SUB_BAR}">TELKOM</div>
        <div style="padding: 1.5px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.4pt;">
            <tr>
              <td style="width:16%; padding:1px 0;">Nama</td>
              <td style="width:34%; padding:1px 10px 1px 0;">${teksBersih(d.am && d.am.nama)}</td>
              <td style="width:16%; padding:1px 0;">Nama</td>
              <td style="width:34%; padding:1px 0;">${teksBersih(d.payroll && d.payroll.nama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Jabatan</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.am && d.am.jabatan)}</td>
              <td style="padding:1px 0;">Jabatan</td>
              <td style="padding:1px 0;">${teksBersih(d.payroll && d.payroll.jabatan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Telepon/GSM *)</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.am && d.am.gsm)}</td>
              <td style="padding:1px 0;">Telepon/GSM *)</td>
              <td style="padding:1px 0;">${teksBersih(d.payroll && d.payroll.gsm)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Telepon Kantor *)</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.am && d.am.kantor)}</td>
              <td style="padding:1px 0;">Telepon Kantor *)</td>
              <td style="padding:1px 0;">${teksBersih(d.payroll && d.payroll.kantor)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Faksimil</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.am && d.am.fax)}</td>
              <td style="padding:1px 0;">Faksimil</td>
              <td style="padding:1px 0;">${teksBersih(d.payroll && d.payroll.fax)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">E-mail</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.am && d.am.email)}</td>
              <td style="padding:1px 0;">E-mail</td>
              <td style="padding:1px 0;">${teksBersih(d.payroll && d.payroll.email)}</td>
            </tr>
          </table>
        </div>

        <div style="${BLUE_SUB_BAR}">PELANGGAN</div>
        <div style="padding: 1.5px 5px;">
          <table style="width:100%; border-collapse:collapse; font-size:7.4pt;">
            <tr>
              <td style="width:16%; padding:1px 0;">Nama</td>
              <td style="width:34%; padding:1px 10px 1px 0;">${teksBersih(d.pelA && d.pelA.nama)}</td>
              <td style="width:16%; padding:1px 0;">Nama</td>
              <td style="width:34%; padding:1px 0;">${teksBersih(d.pelB && d.pelB.nama)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Jabatan</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.pelA && d.pelA.jabatan)}</td>
              <td style="padding:1px 0;">Jabatan</td>
              <td style="padding:1px 0;">${teksBersih(d.pelB && d.pelB.jabatan)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Telepon/GSM *)</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.pelA && d.pelA.gsm)}</td>
              <td style="padding:1px 0;">Telepon/GSM *)</td>
              <td style="padding:1px 0;">${teksBersih(d.pelB && d.pelB.gsm)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Telepon Kantor *)</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih((d.pelA && d.pelA.kantor) || d.pelanggan.telepon)}</td>
              <td style="padding:1px 0;">Telepon Kantor *)</td>
              <td style="padding:1px 0;">${teksBersih(d.pelB && d.pelB.kantor)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">Faksimil</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.pelA && d.pelA.fax)}</td>
              <td style="padding:1px 0;">Faksimil</td>
              <td style="padding:1px 0;">${teksBersih(d.pelB && d.pelB.fax)}</td>
            </tr>
            <tr>
              <td style="padding:1px 0;">E-mail</td>
              <td style="padding:1px 10px 1px 0;">${teksBersih(d.pelA && d.pelA.email)}</td>
              <td style="padding:1px 0;">E-mail</td>
              <td style="padding:1px 0;">${teksBersih(d.pelB && d.pelB.email)}</td>
            </tr>
          </table>
          <div style="font-size:6.8pt; margin-top:1px;">*) : wajib diisi</div>
        </div>

        <div style="${BLUE_SECTION_BAR}">8. &nbsp;LAIN-LAIN</div>
        <div style="padding: 1.5px 5px; font-size:7.6pt; line-height:1.24; text-align:justify;">
          Syarat-syarat dan ketentuan-ketentuan yang belum diatur dalam Kontrak Berlangganan ini akan diatur dalam lampiran-lampiran yang merupakan satu bagian yang tidak terpisahkan dengan Kontrak Berlangganan ini.<br>
          Dengan menandatangani Kontrak Berlangganan ini, kami menyatakan: (i) seluruh data dan informasi yang kami berikan dalam Kontrak Berlangganan adalah lengkap, benar dan akurat; (ii) telah membaca, memahami dan menyetujui untuk tunduk kepada seluruh syarat dan ketentuan Kontrak Berlangganan ini berikut seluruh lampiran dan tambahannya yang merupakan bagian dan satu kesatuan yang tidak terpisahkan dengan Kontrak Berlangganan ini.

          <div style="text-align:right; margin-top:6px;">
            ${teksInlineBersih(kotaSurat, '105px', 'center')}, ${teksInlineBersih(tglSurat, '125px', 'center')}
          </div>

          <table style="width:100%; margin-top:4px; text-align:center; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:50%; font-weight:bold;">TELKOM</td>
              <td style="width:50%; font-weight:bold;">PELANGGAN</td>
            </tr>
            <tr>
              <td style="height:42px;"></td>
              <td style="height:42px;"></td>
            </tr>
            <tr>
              <td style="line-height:1.35;">
                Nama : ${teksInlineBersih(d.wakilTelkom && d.wakilTelkom.nama, '160px', 'left')}<br>
                Jabatan : ${teksInlineBersih(d.wakilTelkom && d.wakilTelkom.jabatan, '155px', 'left')}
              </td>
              <td style="line-height:1.35;">
                Nama : ${teksInlineBersih(d.pelanggan.wakilNama, '160px', 'left')}<br>
                Jabatan : ${teksInlineBersih(d.pelanggan.wakilJabatan, '155px', 'left')}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ==================== HALAMAN 3 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE}">
        ${renderKopHalaman('LAMPIRAN I<br>AMANDEMEN<br>KONTRAK BERLANGGANAN', d, false)}

        <div style="${BLUE_SECTION_BAR} text-align:center; margin-bottom:0;">RINCIAN LAYANAN</div>
        <table style="width:100%; border-collapse:collapse; margin:0 0 4px 0; table-layout:fixed; word-wrap:break-word; font-size:7.1pt;">
          <thead>
            <tr>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:26px; font-weight:bold;">NO</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:12%; font-weight:bold;">LAYANAN</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:11%; font-weight:bold;">PAKET</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:29%; font-weight:bold;">LOKASI</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:10%; font-weight:bold;">LEBAR PITA<br>(Kbps)</th>
              <th colspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:22%; font-weight:bold;">BIAYA</th>
              <th rowspan="2" style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; width:12%; font-weight:bold;">KETERANGAN</th>
            </tr>
            <tr>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">ALAMAT INSTALASI</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">PIC</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">INSTALASI</th>
              <th style="border:1px solid #000000; background:#e5e7eb; padding:2px; text-align:center; font-weight:bold;">BULANAN</th>
            </tr>
          </thead>
          <tbody>
            ${barisLayananUtama}
            ${ekstraBarisLampiran1}
            <tr>
              <td colspan="6" style="border:1px solid #000000; padding:2px 4px; text-align:center; font-weight:bold;">JUMLAH</td>
              <td style="border:1px solid #000000; padding:2px 4px; text-align:right; font-weight:bold;">${formatRupiah(totalInstalasi)}</td>
              <td style="border:1px solid #000000; padding:2px 4px; text-align:right; font-weight:bold;">${formatRupiah(totalBulanan)}</td>
              <td style="border:1px solid #000000; padding:2px 4px;"></td>
            </tr>
          </tbody>
        </table>

        <div style="padding: 2px; font-size:7.6pt; line-height:1.25; text-align:justify;">
          <strong>Keterangan:</strong><br>
          Untuk jenis layanan yang membutuhkan alat atau perangkat disisi PELANGGAN, maka alat atau perangkat tersebut akan tetap merupakan milik TELKOM dan tidak menjadi milik PELANGGAN. Setelah berakhirnya jangka waktu Kontrak, TELKOM akan membongkar <em>(dismantle)</em> alat atau perangkat tersebut. Pelanggan dengan ini menjamin untuk bekerjasama dan memberikan bantuan yang diperlukan secara wajar untuk pembongkaran <em>(dismantling)</em> alat atau perangkat tersebut.

          <table style="width:100%; margin-top:12px; text-align:center; border-collapse:collapse; font-size:7.8pt;">
            <tr>
              <td style="width:50%; font-weight:bold;">TELKOM</td>
              <td style="width:50%; font-weight:bold;">PELANGGAN</td>
            </tr>
            <tr>
              <td style="height:45px;"></td>
              <td style="height:45px;"></td>
            </tr>
            <tr>
              <td style="line-height:1.35;">
                Nama : ${teksInlineBersih(d.wakilTelkom && d.wakilTelkom.nama, '160px', 'left')}<br>
                Jabatan : ${teksInlineBersih(d.wakilTelkom && d.wakilTelkom.jabatan, '155px', 'left')}
              </td>
              <td style="line-height:1.35;">
                Nama : ${teksInlineBersih(d.pelanggan.wakilNama, '160px', 'left')}<br>
                Jabatan : ${teksInlineBersih(d.pelanggan.wakilJabatan, '155px', 'left')}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ==================== HALAMAN 4 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:7.2pt; line-height:1.18;">
        ${renderKopHalaman('LAMPIRAN II<br>AMANDEMEN KONTRAK BERLANGGANAN', d, false)}

        <div style="${BLUE_SECTION_BAR} text-align:center; margin-bottom:2px;">SYARAT-SYARAT DAN KETENTUAN-KETENTUAN BERLANGGANAN</div>

        <div style="font-weight:bold; text-align:center; margin-top:1px; margin-bottom:1px;">Pasal 1<br>PENGERTIAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Layanan adalah layanan telekomunikasi dari TELKOM yang menyediakan jaringan komunikasi data secara khusus (private) dan internet untuk PELANGGAN sebagaimana disepakati dan tercantum dalam Kontrak Berlangganan dan/atau Lampiran I (Rincian Layanan) Kontrak Berlangganan dan/atau setiap amandemen, perubahan dan/atau tambahannya yang dibuat dari waktu ke waktu.</li>
          <li>Tingkat Availability adalah tingkat ketersediaan jaringan telekomunikasi yang menjamin Layanan berdasarkan Kontrak Berlangganan ini sesuai dengan kualitas teknis yang distandarkan.</li>
          <li>Biaya Instalasi adalah sejumlah biaya yang harus dibayar satu kali oleh PELANGGAN kepada TELKOM pada saat terintegrasikannya Layanan berdasarkan Kontrak Berlangganan ini.</li>
          <li>Biaya Langganan Bulanan adalah sejumlah biaya yang harus dibayar setiap bulannya oleh PELANGGAN kepada TELKOM untuk penggunaan Layanan berdasarkan Kontrak Berlangganan ini.</li>
          <li>Pengisoliran adalah pemutusan sementara Layanan sehingga Layanan tersebut tidak dapat berfungsi sebagaimana mestinya.</li>
          <li>Berita Acara Siap Operasi adalah suatu dokumen yang ditandatangani oleh perwakilan yang berwenang dari TELKOM dan PELANGGAN yang merupakan bagian dan satu kesatuan yang tidak terpisahkan dengan Kontrak Berlangganan yang digunakan sebagai bukti dimulainya penggunaan Layanan oleh Pelanggan.</li>
          <li>Fraud adalah tindakan kecurangan, penipuan dan/atau penggelapan dalam penggunaan Layanan TELKOM, atas kesalahan/kesengajaan/kelalaian yang dilakukan oleh PELANGGAN, dengan tujuan apapun termasuk namun tidak terbatas pada menghindari biaya jasa atau pelacakan rekaman percakapan. Adapun contoh Fraud termasuk namun tidak terbatas pada :
            <br>a. Subscription Fraud, yaitu PELANGGAN secara sengaja menghindari kewajiban membayar tagihan;
            <br>b. PBX Hacking Fraud, yaitu penggunaan PBX tanpa sepengetahuan pemiliknya untuk melakukan panggilan keluar baik lokal, SLJJ, maupun SLI;
            <br>c. Bypass Fraud, yaitu PELANGGAN melakukan routing atas suatu panggilan tanpa melewati titik-titik interkoneksi yang resmi;
            <br>d. Penjualan Kembali Ilegal, yaitu penjualan kembali Layanan TELKOM tanpa persetujuan tertulis dari TELKOM, dengan cara apapun, termasuk namun tidak terbatas pada tunnelling.
          </li>
          <li>Kontrak Berlangganan adalah Kontrak Berlangganan berikut Lampiran I (Rincian Layanan) dan Lampiran II (Syarat-Syarat dan Ketentuan-Ketentuan Berlangganan) termasuk seluruh amandemen, perubahan dan tambahan beserta seluruh dokumen yang dibuat berdasarkan Kontrak Berlangganan ini dari waktu ke waktu.</li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:1px; margin-bottom:1px;">Pasal 2<br>RUANG LINGKUP</div>
        <p style="text-align:justify; margin:0 0 2px 0;">TELKOM akan menyediakan Layanan kepada PELANGGAN dan PELANGGAN akan menerima serta menggunakan Layanan dari TELKOM berdasarkan syarat-syarat dan ketentuan-ketentuan yang diatur dalam Kontrak Berlangganan.</p>

        <div style="font-weight:bold; text-align:center; margin-top:1px; margin-bottom:1px;">Pasal 3<br>HAK DAN KEWAJIBAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Disamping hak yang diatur dalam pasal-pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi hak TELKOM :
            <br>a. Meminta seluruh dokumen persyaratan sebagaimana ditentukan oleh TELKOM, sesuai dengan bentuk badan usaha Pelanggan yang tercantum dalam Kontrak Berlangganan ini. Telkom berhak memutuskan untuk menerima atau tidak menerima permohonan Layanan dari PELANGGAN berdasarkan penilaiannya sendiri atas kesesuaian dokumen persyaratan tersebut.
            <br>b. Melakukan pemeriksaan penggunaan Layanan.
            <br>c. Membuat dan mengirimkan [tagihan] Biaya Instalasi, Biaya Langgangan Bulanan dan Biaya Lainnya kepada PELANGGAN.
            <br>d. Menerima pembayaran tagihan secara penuh dan tepat waktu serta memungut denda (dalam hal terjadi keterlambatan pembayaran) dari PELANGGAN sebagaimana dimaksud Pasal 4 Lampiran II Kontrak Berlangganan ini.
            <br>e. Mengubah sewaktu-waktu atas pertimbangannya sendiri biaya dan/atau tarif Layanan dengan menyampaikan pemberitahuan tertulis kepada Pelanggan sekurang-kurangnya 1 (satu) bulan sebelum biaya dan/atau tarif baru tersebut diberlakukan.
            <br>f. Melakukan tindakan isolir dan/apoptotic pemutusan Layanan secara sepihak apabila PELANGGAN terindikasi melakukan aktivitas yang berpotensi mengganggu kualitas Layanan secara nasional dan/atau melakukan tindakan kriminal/melanggar hukum termasuk dan tidak terbatas pada: botnet, penyebaran malware seperti virus, worm, trojan, spam, melakukan hacking, web defacing, menggunakan robot, spider atau automated device, yang dapat mematikan atau membebani sistem dan/atau jaringan telekomunikasi.
          </li>
          <li>Disamping kewajiban yang diatur dalam pasal-pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi kewajiban TELKOM :
            <br>a. Menjaga agar Layanan berfungsi dengan baik sesuai dengan SLG yang disepakati oleh para pihak.
            <br>b. Melakukan perbaikan terhadap gangguan pada Layanan.
            <br>c. Memberitahukan kepada PELANGGAN mengenai adanya kegiatan pemeliharaan atau tindakan lain yang dapat mengakibatkan terganggunya atau tidak berfungsinya Layanan sekurang-kurangnya 1 (satu) hari sebelum pelaksanaan kegiatan pemelihaaraan atau tindakan lain tersebut.
          </li>
          <li>Disamping hak yang diatur dalam pasal-pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi hak PELANGGAN :
            <br>a. Mendapatkan dan memanfaatkan Layanan selama 24 jam sehari, 7 hari seminggu.
            <br>b. Memperoleh Restitusi apabila Layanan tersebut mengalami gangguan. Syarat dan jumlah Restitusi diatur dalam Pasal 5 Lampiran II Kontrak Berlangganan ini.
          </li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 5 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:7.25pt; line-height:1.2;">
        <ol start="4" style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Disamping kewajiban yang diatur dalam pasal lain Kontrak Berlangganan ini, hal-hal berikut menjadi kewajiban PELANGGAN :
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

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 4<br>PEMBAYARAN DAN TATA CARA PEMBAYARAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Pelanggan harus membayar Biaya Instalasi bersamaan dengan pembayaran Biaya Langganan Bulanan untuk bulan pertama. Biaya Langganan Bulanan bulan pertama dihitung secara prorata sesuai dengan jumlah hari dimana Pelanggan telah menggunakan Layanan pada bulan tersebut.</li>
          <li>Seluruh pemenuhan kewajiban perpajakan yang timbul dari atau sehubungan dengan tagihan berdasarkan Kontrak Berlangganan ini akan menjadi tanggung jawab masing-masing pihak berdasarkan ketentuan peraturan perundang-undangan perpajakan yang berlaku di Indonesia.</li>
          <li>Dalam hal PELANGGAN melakukan pemotongan PPh Pasal 23, maka PELANGGAN wajib menyerahkan bukti pemotongan PPh Pasal 23 tersebut kepada TELKOM, paling lambat akhir bulan N+1 setelah pembayaran.</li>
          <li>Besaran nilai PPN mengikuti ketentuan yang berlaku di Indonesia dan menjadi kewajiban bagi PELANGGAN.</li>
          <li>Tanggal Jatuh Tempo pembayaran tagihan biaya-biaya atas Layanan yang ditagihkan secara bulanan adalah pada tanggal 20 setiap bulannya atau tanggal yang tercantum di dalam tagihan (invoice) setiap bulannya.</li>
          <li>Tanggal Jatuh Tempo pembayaran tagihan biaya-biaya atas Layanan yang ditagihkan dengan periode penagihan non-bulanan (misalnya, dua bulanan, triwulanan, dan periode lainnya) ditetapkan setiap tanggal 20 pada bulan jatuh tempo.</li>
          <li>Perhitungan jumlah denda keterlambatan dan pengenaan sanksi pemutusan Layanan ditentukan berdasarkan batas akhir pembayaran yang ditetapkan dalam Kontrak atau Amandemen.</li>
          <li>Apabila PELANGGAN terlambat membayar tagihan, PELANGGAN akan dikenakan denda keterlambatan yang dihitung sejak Tanggal Jatuh Tempo (due date) pembayaran sampai dengan dilakukannya pembayaran tagihan oleh PELANGGAN, dengan ketentuan sebagai berikut:
            <br>a. Denda dihitung per hari kalender sejak tanggal Jatuh Tempo pembayaran dan jumlahnya ditentukan dalam Kontrak atau Amandemen dan besar denda yang dikenakan adalah 1‰ (satu perseribu) dari nilai Kontrak;
            <br>b. Apabila melewati tanggal 20 pada bulan Jatuh Tempo PELANGGAN belum melakukan pembayaran, maka paling lambat tanggal 7 (tujuh) bulan berikutnya akan dilakukan pemutusan atau isolir terhadap Layanan.
            <br>c. Apabila PELANGGAN tetap tidak melakukan kewajiban pembayaran atas Layanan yang telah digunakan, TELKOM berhak melakukan pemutusan dan/atau isolir terhadap semua layanan TELKOM Group.
            <br>d. TELKOM atas keputusannya sendiri dapat melakukan penyambungan kembali Layanan setelah Pelanggan menyelesaikan seluruh kewajiban pembayarannya berdasarkan Kontrak Berlangganan ini terhadap TELKOM.
            <br>e. Apabila PELANGGAN tetap tidak beritikad baik untuk menyelesaikan seluruh kewajibannya, termasuk kewajiban pembayaran, berdasarkan Kontrak atau Amandemen, TELKOM akan menolak permohonan PELANGGAN untuk mendapatkan layanan apapun yang diberikan oleh TELKOM Group.
          </li>
          <li>TELKOM dapat menyerahkan proses penagihan pembayaran atas Layanan yang telah digunakan PELANGGAN kepada Pihak lain, apabila PELANGGAN tidak beritikad baik untuk menyelesaikan kewajiban pembayaran atas Layanan.</li>
          <li>Dalam hal PELANGGAN memutuskan Layanan berdasarkan Kontrak Berlangganan ini secara sepihak dan/atau mengundurkan diri sebelum berakhirnya jangka waktu Kontrak, maka PELANGGAN wajib membayar denda 30% (tiga puluh perseratus) dari Biaya Langganan Bulanan dikalikan jumlah sisa jangka waktu Kontrak yang belum dijalani sampai dengan berakhirnya jangka waktu Kontrak tersebut.</li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 6 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:7.25pt; line-height:1.2;">
        <div style="font-weight:bold; text-align:center; margin-top:0; margin-bottom:1px;">Pasal 5<br>RESTITUSI</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Apabila Layanan mengalami gangguan sehingga tidak sesuai dengan tingkat Availability yang disepakati, maka untuk lokasi yang mengalami gangguan, PELANGGAN berhak memperoleh restitusi, dengan perhitungan sebagai berikut :
            <div style="margin:2px 0 2px 12px;">
              <strong>Restitusi = [(A-Av) / C] x B</strong><br>
              A &nbsp;&nbsp;= jumlah jam gangguan dalam bulan gangguan<br>
              Av = [(100% - Tingkat Availability) x jumlah jam dalam bulan gangguan]<br>
              B &nbsp;&nbsp;= Biaya Langganan Bulanan<br>
              C &nbsp;&nbsp;= jumlah jam dalam bulan gangguan
            </div>
          </li>
          <li>Permintaan restitusi dimaksud pada ayat ini, dapat diajukan oleh PELANGGAN, sebanyak-banyaknya adalah sebesar 0,05% dari Biaya Langganan Bulanan.</li>
          <li>TELKOM akan memberitahukan jumlah restitusi secara tertulis kepada PELANGGAN bersamaan dengan penyampaian tagihan. Restitusi akan secara otomatis akan mengurangi jumlah total tagihan bulan tersebut.</li>
          <li>Restitusi tidak akan diberikan apabila gangguan terjadi diluar ruas Layanan yang menjadi tanggung jawab TELKOM dan/atau akibat gangguan yang bukan merupakan kelalaian atau kesalahan TELKOM.</li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 6<br>LARANGAN BAGI PELANGGAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>PELANGGAN dilarang melakukan pemindahan atau perubahan apapun terhadap Jaringan TELKOM serta melakukan Fraud sehubungan dengan penggunaan Layanan TELKOM.</li>
          <li>PELANGGAN dilarang dengan sengaja dan tanpa hak atau melawan hukum menyalahgunakan Layanan TELKOM dengan cara melakukan akses melalui komputer dan/atau sistem elektronik apapun dengan cara dan dengan tujuan apapun tanpa izin TELKOM.</li>
          <li>PELANGGAN dilarang menggunakan Layanan TELKOM untuk melakukan tindakan yang dapat merugikan pihak manapun, termasuk namun tidak terbatas pada :
            <br>a. Mengganggu atau merusak suatu Jaringan TELKOM atau sistem komputer pihak manapun;
            <br>b. Menggunakan Perangkat yang tidak secure terhadap terjadinya Fraud;
            <br>c. Pengiriman e-mail secara terus menerus dengan tidak bertanggung jawab (spamming);
            <br>d. Memalsukan e-mail header atau metode lain yang digunakan dengan tujuan untuk memalsukan identitas PELANGGAN;
            <br>e. Pelanggaran terhadap Hak atas Kekayaan Intelektual (HaKI) pihak lain;
            <br>f. Tindakan-tindakan yang melanggar norma-norma kesopanan, kesusilaan, peraturan atau hukum yang berlaku di wilayah Negara Republik Indonesia.
          </li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 7<br>SANKSI-SANKSI</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Pelanggaran yang dilakukan PELANGGAN terhadap ketentuan dalam Kontrak Berlangganan dapat dikenakan sanksi berupa isolir Layanan, termasuk denda keterlambatan, ganti rugi Fraud, dan denda pengakhiran, downgrade, pemutusan/pencabutan Layanan dan/atau blacklist.</li>
          <li>Pengenaan sanksi berdasarkan ketentuan Kontrak Berlangganan tidak mengurangi kewajiban PELANGGAN untuk melunasi seluruh tagihan/tunggakan/denda kepada TELKOM.</li>
          <li>PELANGGAN dengan ini memahami, mengetahui dan menyatakan bahwa ketentuan dalam Kontrak Berlangganan merupakan pemberitahuan/informasi tentang kemungkinan dikenakannya sanksi tersebut, oleh karena itu tidak ada kewajiban bagi TELKOM untuk memberitahukan terlebih dahulu kepada PELANGGAN atas pengenaan sanksi dimaksud.</li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 8<br>PEMBATASAN TANGGUNG JAWAB TELKOM</div>
        <p style="text-align:justify; margin:0 0 1px 0;">TELKOM dibebaskan dari tanggung jawab atas pembayaran kompensasi atau kerugian yang ditanggung oleh PELANGGAN, baik kerugian langsung ataupun tidak langsung sebagai akibat dari berfungsinya atau tidak berfungsinya sambungan Layanan TELKOM, karena :</p>
        <ol type="a" style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Kerusakan atau gangguan Layanan TELKOM akibat kesalahan atau kelalaian PELANGGAN;</li>
          <li>Perubahan Jaringan TELKOM, perubahan nomor, atau jaringan telekomunikasi TELKOM yang bukan disebabkan oleh kesalahan atau kelalaian TELKOM;</li>
          <li>Kegagalan interkoneksi Jaringan dengan penyelenggara telekomunikasi lain;</li>
          <li>Kesalahan tagihan akibat dari akses/pemakaian Layanan yang disediakan oleh penyelenggara jasa telekomunikasi lain di luar TELKOM;</li>
          <li>Kerusakan akibat peristiwa/kejadian diluar batas kendali normal TELKOM (Keadaan Kahar).</li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 7 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE} font-size:7.25pt; line-height:1.2;">
        <div style="font-weight:bold; text-align:center; margin-top:0; margin-bottom:1px;">Pasal 9<br>KEADAAN KAHAR</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Keadaan kahar adalah keadaan-keadaan diluar kekuasaan salah satu atau para pihak yang mengakibatkan pihak dimaksud tidak dapat melaksanakan kewajibannya berdasarkan Kontrak Berlangganan ini. Keadaaan kahar meliputi gempa bumi, angin taufan, banjir besar, kebakaran besar, tanah longsor, wabah penyakit, dan pemogokan umum, huru-hara, perang, sabotase, pemberontakan, kerusakan jaringan akibat perbuatan pihak ketiga, putus aliran listrik umum/PLN diluar kemampuan Para Pihak untuk mengatasinya, kebijakan pemerintah dan hal-hal lain sejenis yang berada diluar kekuasaan atau kemampuan para pihak.</li>
          <li>Dalam hal terjadi keadaan kahar sebagaimana dimaksud ayat (1) Pasal ini, maka pihak yang mengalami keadaan kahar harus memberitahukan secara tertulis mengenai terjadinya keadaan kahar tersebut kepada Pihak lainnya paling lambat 14 (empat belas) hari kalender sejak saat terjadinya keadaan kahar tersebut.</li>
          <li>Semua kerugian dan biaya salah satu pihak atau para pihak yang timbul akibat peristiwa keadaan kahar tidak menjadi tanggung-jawab pihak lainnya.</li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 10<br>PEMUTUSAN KONTRAK</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Apabila pemerintah Republik Indonesia mengundangkan peraturan dan/atau menetapkan kebijakan baru yang mengakibatkan Kontrak Berlangganan ini tidak mungkin dilaksanakan, para pihak dapat mengakhiri Kontrak Berlangganan ini tanpa adanya tuntutan apapun atau beban keuangan atau kewajiban apapun kepada pihak lainnya.</li>
          <li>TELKOM berhak untuk mengakhiri Kontrak Berlangganan ini secara sepihak tanpa pemberitahuan apapun dengan ketentuan sebagai berikut:
            <br>a. Apabila PELANGGAN tetap tidak melakukan pembayaran dalam jangka waktu yang ditentukan dalam Kontrak atau Amandemen.
            <br>b. Apabila PELANGGAN melanggar Pasal 3 ayat (4) butir 4.3 dan 4.5 Lampiran II Kontrak Berlangganan ini.
            <br>c. Setelah TELKOM melakukan pemutusan atau isolir terhadap Layanan.
          </li>
          <li>Apabila pada saat Kontrak Berlangganan ini berakhir atau diakhiri masih terdapat kewajiban yang belum diselesaikan oleh salah satu pihak, maka berakhirnya atau diakhirinya Kontrak Berlangganan ini tidak akan mengakhiri kewajiban-kewajiban pihak tersebut sampai dengan diselesaikannya kewajiban-kewajiban tersebut sesuai dengan ketentuan dalam Kontrak Berlangganan ini.</li>
          <li>Para Pihak sepakat untuk menyampingkan berlakunya ketentuan Pasal 1266 Kitab Undang-Undang Hukum Perdata Indonesia terhadap Kontrak Berlangganan ini, sehingga pemutusan Layanan dan/och pengakhiran Kontrak Berlangganan ini dapat dilakukan tanpa perlu terlebih dahulu menunggu keputusan pengadilan.</li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 11<br>PENYELESAIAN PERSELISIHAN</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Apabila terjadi perbedaan pendapat atau perselisihan dalam pelaksanaan dan/atau penafsiran Kontrak Berlangganan ini, sejauh mungkin Para Pihak akan menyelesaikan melalui musyawarah.</li>
          <li>Apabila musyawarah tidak mencapai kesepakatan, maka Para Pihak sepakat untuk menyelesaikannya melalui Pengadilan Negeri Jakarta Barat.</li>
          <li>Selama perselisihan masih dalam proses penyelesaian, maka TELKOM dan PELANGGAN wajib untuk tetap melaksanakan kewajibannya berdasarkan Kontrak Berlangganan ini.</li>
        </ol>

        <div style="font-weight:bold; text-align:center; margin-top:2px; margin-bottom:1px;">Pasal 12<br>PENUTUP</div>
        <ol style="margin:0 0 2px 14px; padding:0; text-align:justify;">
          <li>Apabila terjadi penambahan, pengurangan atau perubahan Layanan, akan dibuat secara tertulis dalam Amandemen dan merupakan bagian yang tak terpisahkan serta mempunyai kekuatan hukum yang sama dengan Kontrak Berlangganan ini.</li>
          <li>Kontrak Berlangganan ini tunduk pada Hukum Negara Republik Indonesia.</li>
          <li>Dalam melaksanakan Kontrak Berlangganan ini Para Pihak wajib untuk mentaati ketentuan perundang-undangan atau peraturan-peraturan yang dikeluarkan oleh instansi yang berwenang yang berkaitan dengan Kontrak Berlangganan ini.</li>
        </ol>
      </div>

      <!-- ==================== HALAMAN 8 ==================== -->
      <div class="kfs-page" style="${PAGE_BASE}">
        ${renderKopHalaman('LAMPIRAN III<br>AMANDEMEN<br>KONTRAK BERLANGGANAN', d, false)}

        <div style="${BLUE_SECTION_BAR} text-align:center;">Dokumen Pendukung</div>
        <div style="height: 300px; max-height: 300px; padding: 4px; overflow: hidden;"></div>
      </div>
    </div>
  `;
}