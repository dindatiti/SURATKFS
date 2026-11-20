function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID').format(angka || 0);
}

function formatTanggalIndo(tgl) {
  if (!tgl) return '....................';
  return new Date(tgl).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function generateKFSHTML(d) {
  const cekConn = d.jenisLayanan === 'Layanan Connectivity TELKOM' ? '☑' : '☐';
  const cekNonConn = d.jenisLayanan === 'Layanan Non-Connectivity TELKOM' ? '☑' : '☐';
  const cekBundling = d.jenisLayanan === 'Bundling Layanan Connectivity TELKOM & Solusi' ? '☑' : '☐';

  return `
    <table class="doc-table">
      <tr>
        <td style="width:45%; font-weight:bold; font-size:12pt;">
          AMANDEMEN<br>KONTRAK BERLANGGANAN
        </td>
        <td style="width:35%; font-weight:bold; font-size:9.5pt;">
          PERUSAHAAN PERSEROAN (PERSERO)<br>PT TELEKOMUNIKASI INDONESIA Tbk
        </td>
        <td style="width:20%; text-align:right; font-weight:bold; color:#e11d48;">
          Telkom Indonesia
        </td>
      </tr>
      <tr>
        <td><strong>Nomor ID Pelanggan:</strong> ${d.pelanggan.idPelanggan}</td>
        <td colspan="2"><strong>Nomor Amandemen:</strong> ${d.nomorAmandemen || '-'}</td>
      </tr>
      <tr>
        <td colspan="3"><strong>Nomor Kontrak Awal:</strong> ${d.nomorKontrak}</td>
      </tr>
    </table>

    <div class="doc-section-title">1. PERUSAHAAN PERSEROAN (PERSERO) PT TELEKOMUNIKASI INDONESIA Tbk (TELKOM)</div>
    <div class="doc-box">
      Suatu perusahaan penyedia jasa dan jaringan telekomunikasi yang dibentuk dan didirikan berdasarkan hukum Republik Indonesia, berkedudukan di Jalan Japati Nomor 1 Bandung, Indonesia 40133.<br>
      <strong>Diwakili secara sah oleh :</strong><br>
      <table style="width:100%; border:none; margin-top:4px;">
        <tr><td style="border:none; width:120px;">Nama</td><td style="border:none;">: ${d.wakilTelkom.nama}</td></tr>
        <tr><td style="border:none;">Jabatan</td><td style="border:none;">: ${d.wakilTelkom.jabatan}</td></tr>
        <tr><td style="border:none;">Unit</td><td style="border:none;">: ${d.wakilTelkom.unit}</td></tr>
      </table>
    </div>

    <div class="doc-section-title">2. PELANGGAN</div>
    <div class="doc-box">
      <strong>Identitas Perusahaan/Institusi</strong>
      <table style="width:100%; border:none; margin-top:4px;">
        <tr><td style="border:none; width:120px;">Nama</td><td style="border:none;">: ${d.pelanggan.perusahaan}</td></tr>
        <tr><td style="border:none;">Alamat</td><td style="border:none;">: ${d.pelanggan.alamat} &nbsp;&nbsp; <strong>Kode Pos:</strong> ${d.pelanggan.kodePos || '-'}</td></tr>
        <tr><td style="border:none;">NPWP</td><td style="border:none;">: ${d.pelanggan.npwp || '-'}</td></tr>
      </table>
      <strong>Diwakili secara sah oleh :</strong>
      <table style="width:100%; border:none; margin-top:4px;">
        <tr><td style="border:none; width:120px;">Nama</td><td style="border:none;">: ${d.pelanggan.wakilNama}</td></tr>
        <tr><td style="border:none;">Jabatan</td><td style="border:none;">: ${d.pelanggan.wakilJabatan}</td></tr>
      </table>
    </div>

    <div class="doc-section-title">3. LAYANAN</div>
    <div class="doc-box">
      <div>${cekConn} Layanan Connectivity TELKOM</div>
      <div>${cekNonConn} Layanan Non-Connectivity TELKOM</div>
      <div>${cekBundling} Bundling Layanan Connectivity TELKOM & Solusi</div>
      <p style="margin-top:6px;"><strong>Jaminan Layanan:</strong> Tingkat Availability <strong>${d.availability}%</strong></p>
      <p><strong>Mekanisme Pemenuhan CPE:</strong> PELANGGAN harus menyiapkan Customer Premises Equipment (CPE) sesuai dengan spesifikasi yang ditentukan TELKOM sebelum proses integrasi.</p>

      <table class="doc-table" style="margin-top:8px;">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Layanan</th>
            <th rowspan="2">Paket</th>
            <th colspan="2">Lokasi</th>
            <th rowspan="2">Lebar Pita (Kbps)</th>
            <th colspan="2">Biaya (Rp)</th>
            <th rowspan="2">Keterangan</th>
          </tr>
          <tr>
            <th>Alamat Instalasi</th>
            <th>PIC</th>
            <th>Instalasi</th>
            <th>Bulanan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${d.namaLayanan}</td>
            <td>${d.paket || '-'}</td>
            <td>${d.alamatInstalasi || d.lokasi || '-'}</td>
            <td>${(d.pelA && d.pelA.nama) || d.pelanggan.wakilNama || '-'}</td>
            <td>${d.lebarPita}</td>
            <td>${formatRupiah(d.biayaInstalasi)}</td>
            <td>${formatRupiah(d.biayaBulanan)}</td>
            <td>${d.lokasi || '-'}</td>
          </tr>
          <tr>
            <td colspan="6" style="text-align:right; font-weight:bold;">Jumlah</td>
            <td style="font-weight:bold;">${formatRupiah(d.biayaInstalasi)}</td>
            <td style="font-weight:bold;">${formatRupiah(d.biayaBulanan)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:8.5pt;">
        Apabila kolom rincian layanan di atas tidak cukup, rincian layanan akan diuraikan dalam Lampiran I yang merupakan satu kesatuan serta bagian yang tidak terpisahkan dengan Kontrak Berlangganan ini.<br>
        PELANGGAN akan diberikan masa uji coba layanan maksimum selama 12 (dua belas) hari kalender terhitung sejak tanggal aktivasi yang dituangkan dalam Berita Acara Siap Operasi (BASO).
      </p>
    </div>

    <div class="doc-section-title">4. BIAYA-BIAYA (Rupiah)</div>
    <div class="doc-box">
      <table style="width:100%; border:none;">
        <tr><td style="border:none; width:240px;">Biaya Instalasi</td><td style="border:none;">: Rp ${formatRupiah(d.biayaInstalasi)},-</td></tr>
        <tr><td style="border:none;">Biaya Langganan Bulanan</td><td style="border:none;">: Rp ${formatRupiah(d.biayaBulanan)},-</td></tr>
        <tr><td style="border:none;">Biaya Lainnya (IKG, Biaya Integrasi)</td><td style="border:none;">: Rp ${formatRupiah(d.biayaLainnya)},-</td></tr>
      </table>
      <em>Biaya-biaya tersebut di atas belum termasuk PPN.</em>
    </div>

    <div class="doc-section-title">5. TATA CARA PEMBAYARAN</div>
    <div class="doc-box" style="font-size:8.8pt;">
      TELKOM akan mengirim Official Receipt selambat-lambatnya pada tanggal 10 (sepuluh) setiap bulannya ke alamat kontak person PELANGGAN yang dicantumkan dalam Kontrak Berlangganan ini. PELANGGAN harus melakukan pembayaran paling lambat pada tanggal 20 (dua puluh) setiap bulannya (Tanggal Jatuh Tempo) atau sesuai tanggal jatuh tempo yang tercantum di dalam tagihan (invoice) setiap bulannya, dengan cara transfer ke rekening bank TELKOM atau virtual account yang tercantum di dalam tagihan (invoice).
    </div>

    <div class="doc-section-title">6. JANGKA WAKTU</div>
    <div class="doc-box" style="font-size:9pt;">
      Jangka waktu Kontrak Berlangganan terhitung sejak tanggal <strong>${formatTanggalIndo(d.berlakuDari)}</strong> sampai dengan tanggal <strong>${formatTanggalIndo(d.berlakuSampai)}</strong>, dengan rincian:<br>
      • Jangka waktu delivery (Delivery Time): <strong>${d.deliveryTime || '...'}</strong> hari<br>
      • Jangka waktu Layanan (Term of subscribe): <strong>${d.jangkaWaktu || '...'}</strong> berlaku sejak tanggal <strong>${formatTanggalIndo(d.berlakuDari)}</strong> sampai dengan <strong>${formatTanggalIndo(d.berlakuSampai)}</strong>.
    </div>

    <div class="doc-section-title">7. KONTAK PERSON</div>
    <table class="doc-table">
      <tr><th colspan="2">TELKOM (Account Manager)</th><th colspan="2">TELKOM (Payroll / Billing)</th></tr>
      <tr><td>Nama: ${d.am.nama || '-'}</td><td>Jabatan: ${d.am.jabatan || '-'}</td><td>Nama: ${d.payroll.nama || '-'}</td><td>Jabatan: ${d.payroll.jabatan || '-'}</td></tr>
      <tr><td>GSM *): ${d.am.gsm || '-'}</td><td>Email: ${d.am.email || '-'}</td><td>Telp Kantor *): ${d.payroll.kantor || '-'}</td><td>Fax: ${d.payroll.fax || '-'}</td></tr>
      <tr><td colspan="2"></td><td colspan="2">Email: ${d.payroll.email || '-'}</td></tr>

      <tr><th colspan="2">PELANGGAN A</th><th colspan="2">PELANGGAN B</th></tr>
      <tr><td>Nama: ${d.pelA.nama || '-'}</td><td>Jabatan: ${d.pelA.jabatan || '-'}</td><td>Nama: ${d.pelB.nama || '-'}</td><td>Jabatan: ${d.pelB.jabatan || '-'}</td></tr>
      <tr><td>GSM *): ${d.pelA.gsm || '-'}</td><td>Email: ${d.pelA.email || '-'}</td><td>GSM *): ${d.pelB.gsm || '-'}</td><td>Email: ${d.pelB.email || '-'}</td></tr>
    </table>

    <div class="doc-section-title">8. LAIN-LAIN</div>
    <div class="doc-box" style="font-size:8.8pt;">
      Dengan menandatangani Kontrak Berlangganan ini, kami menyatakan: (i) seluruh data dan informasi yang kami berikan dalam Kontrak Berlangganan adalah lengkap, benar dan akurat; (ii) telah membaca, memahami dan menyetujui untuk tunduk kepada seluruh syarat dan ketentuan Kontrak Berlangganan ini berikut seluruh lampiran dan tambahannya yang merupakan bagian dan satu kesatuan yang tidak terpisahkan dengan Kontrak Berlangganan ini.
      <div style="text-align:right; margin-top:12px;">${d.kotaSurat}, ${formatTanggalIndo(d.tanggalSurat)}</div>
      <table style="width:100%; border:none; margin-top:10px; text-align:center;">
        <tr>
          <td style="border:none; width:50%; font-weight:bold;">TELKOM</td>
          <td style="border:none; width:50%; font-weight:bold;">PELANGGAN</td>
        </tr>
        <tr>
          <td style="border:none; height:60px;"></td>
          <td style="border:none; height:60px;"></td>
        </tr>
        <tr>
          <td style="border:none;"><strong><u>${d.wakilTelkom.nama}</u></strong><br>${d.wakilTelkom.jabatan}</td>
          <td style="border:none;"><strong><u>${d.pelanggan.wakilNama}</u></strong><br>${d.pelanggan.wakilJabatan}</td>
        </tr>
      </table>
    </div>
  `;
}