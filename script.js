// Data rekening penjual
const sellerAccounts = {
  dana: {
    number: "081234567890",
    name: "Budi Store",
    note: "Gunakan fitur QR Dana jika tersedia"
  },
  gopay: {
    number: "081234567891",
    name: "Budi Store",
    note: "Pastikan transfer ke nomor yang benar"
  },
  qris: {
    number: "QRIS Dinamis",
    name: "Budi Store",
    note: "Scan QR code di atas untuk pembayaran"
  }
};

// Kata-kata motivasi
const motivasiList = [
  "Kesuksesan dimulai dari langkah pertama",
  "Setiap transaksi adalah langkah menuju kemandirian",
  "Keberhasilan dibangun dengan konsistensi",
  "Pembayaran tepat waktu membangun kepercayaan",
  "Kualitas layanan adalah prioritas kami",
  "Transaksi lancar, hubungan harmonis"
];

let currentPage = "motivation";
let lastMethod = '';

// Update motivasi text
function updateMotivation() {
  const motivasiElement = document.getElementById('motivation-text');
  motivasiElement.style.opacity = 0;
  
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * motivasiList.length);
    motivasiElement.textContent = `"${motivasiList[randomIndex]}"`;
    motivasiElement.style.opacity = 1;
  }, 500);
}

// Navigasi halaman
function navigate(pageId) {
  if (pageId === 'home') {
    document.getElementById('motivation-page').classList.add('hidden');
    document.getElementById('payment-page').classList.remove('hidden');
    currentPage = "payment";
  } 
  else if (pageId === 'motivation') {
    updateMotivation();
    document.getElementById('motivation-page').classList.remove('hidden');
    document.getElementById('payment-page').classList.add('hidden');
    currentPage = "motivation";
  }
  else {
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    lastMethod = pageId;
  }
}

// Kembali ke halaman sebelumnya
function goBack() {
  if (currentPage === "payment") {
    const activeSection = document.querySelector('.section:not(.hidden)');
    if (activeSection.id === 'home') {
      navigate('motivation');
    } else {
      navigate('home');
    }
  }
}

// Validasi data pembayaran
function validateData(method) {
  const name = document.getElementById(`${method}-name`).value.trim();
  const amount = document.getElementById(`${method}-amount`).value.trim();
  const warn = document.getElementById(`${method}-warning`);
  warn.innerHTML = '';

  if (name === '' || amount === '') {
    warn.innerHTML = `<div class='error-box'>⚠️ Harap isi semua data terlebih dahulu!</div>`;
    return;
  }

  warn.innerHTML = `
    <div class='confirm-box'>
      Pastikan data yang Anda masukkan benar:<br>
      <strong>Nama:</strong> ${name}<br>
      <strong>Jumlah:</strong> Rp ${amount}
      <div class='confirm-buttons'>
        <button onclick="showInfo('${method}')" class="btn">Lanjut</button>
        <button onclick="document.getElementById('${method}-warning').innerHTML=''" class="btn">Batal</button>
      </div>
    </div>
  `;
}

// Tampilkan info pembayaran
function showInfo(method) {
  const name = document.getElementById(`${method}-name`).value;
  const amount = document.getElementById(`${method}-amount`).value;
  const infoBox = document.getElementById("payment-data");
  const seller = sellerAccounts[method];

  infoBox.innerHTML = `
    <strong>Metode Pembayaran:</strong> ${method.toUpperCase()}<br>
    <strong>Nama Anda:</strong> ${name}<br>
    <strong>Jumlah:</strong> Rp ${amount}<br><br>
    <strong>Informasi Penjual:</strong><br>
    <strong>Nama:</strong> ${seller.name}<br>
    <strong>Nomor/Tujuan:</strong> ${seller.number}<br>
    <strong>Catatan:</strong> ${seller.note}
  `;

  const message = encodeURIComponent(
    `💳 Bukti Pembayaran\n` +
    `Metode: ${method}\n` +
    `Nama: ${name}\n` +
    `Jumlah: Rp ${amount}\n\n` +
    `Sabar ya, pembayaran sedang dicek ✅`
  );
  
  document.getElementById('sendToTelegram').setAttribute(
    'onclick', 
    `window.open('https://t.me/ditx222?text=${message}', '_blank')`
  );

  navigate('info');
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  updateMotivation();
  navigate('motivation');
});
