// Data rekening penjual
const sellerAccounts = {
  dana: {
    number: "081234567890",
    name: "Budi Store"
  },
  gopay: {
    number: "081234567891",
    name: "Budi Store" 
  },
  qris: {
    note: "Scan QR di atas"
  }
};

// Kata-kata motivasi
const motivasiList = [
  "Kesuksesan dimulai dari langkah pertama",
  "Setiap transaksi adalah langkah menuju kemandirian",
  "Keberhasilan dibangun dengan konsistensi",
  "Pembayaran tepat waktu membangun kepercayaan"
];

// Random motivasi
function getRandomMotivasi() {
  return motivasiList[Math.floor(Math.random() * motivasiList.length)];
}

// Navigasi halaman
function navigate(pageId) {
  // Update motivasi setiap kembali ke home
  if(pageId === 'home-page') {
    document.getElementById('motivasi-text').textContent = `"${getRandomMotivasi()}"`;
  }
  
  document.getElementById('home-page').classList.toggle('hidden', pageId !== 'home-page');
  document.getElementById('payment-page').classList.toggle('hidden', pageId === 'home-page');
  
  // Navigasi internal di payment page
  if(pageId !== 'home-page' && pageId !== 'main-menu') {
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.toggle('hidden', sec.id !== pageId);
    });
  }
}

// Tampilkan info rekening saat konfirmasi
function showInfo(method) {
  const seller = sellerAccounts[method];
  const infoBox = document.getElementById("payment-data");
  
  infoBox.innerHTML = `
    <strong>Metode:</strong> ${method.toUpperCase()}<br>
    <strong>Nomor Rekening:</strong> ${seller.number}<br>
    <strong>Nama Penerima:</strong> ${seller.name}<br>
    ${seller.note ? `<strong>Catatan:</strong> ${seller.note}<br>` : ''}
  `;
  
  navigate('info');
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('motivasi-text').textContent = `"${getRandomMotivasi()}"`;
});