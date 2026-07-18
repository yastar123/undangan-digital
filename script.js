const audio = document.getElementById("bg-wedding-music");
const musicBtn = document.getElementById("musicBtn");
const iconPlay = document.getElementById("icon-play");
const iconMute = document.getElementById("icon-mute");
let isPlaying = false;

// 1. Fungsi Buka Undangan
function openInvitation() {
  document.getElementById("cover").style.transform = "translateY(-100%)";
  document.body.style.overflow = "auto";
  document.getElementById("main-content").style.opacity = "1";

  musicBtn.style.visibility = "visible";
  musicBtn.style.opacity = "1";

  playAudio();
  handleScrollAnimation();
  initCountdown(); // Mulai hitung mundur saat undangan dibuka
}

// 2. Fungsi Musik Toggle
function toggleMusic() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  audio
    .play()
    .then(() => {
      isPlaying = true;
      musicBtn.classList.add("rotate-animation");
      iconPlay.style.display = "block";
      iconMute.style.display = "none";
    })
    .catch((err) => console.log("Autoplay blocked. Need interaction."));
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  musicBtn.classList.remove("rotate-animation");
  iconPlay.style.display = "none";
  iconMute.style.display = "block";
}

// 3. Efek Pop Up Scroll
const mainContainer = document.getElementById("main-content");
const hiddenElements = document.querySelectorAll(".hidden");

function handleScrollAnimation() {
  hiddenElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 30) {
      el.classList.add("show-up");
    }
  });
}
mainContainer.addEventListener("scroll", handleScrollAnimation);

// 4. Auto Ambil Nama Tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("to");
if (guestName) {
  document.getElementById("guest-name-placeholder").innerText = guestName;
  document.getElementById("form-nama").value = guestName;
}

// 5. Fitur Salin Teks Otomatis
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor berhasil disalin: " + text);
  });
}

// 6. Fitur Submit Form Tamu
let hadirCount = 1;
let tidakHadirCount = 0;
function submitUcapan(event) {
  event.preventDefault();
  const nama = document.getElementById("form-nama").value;
  const pesan = document.getElementById("form-pesan").value;
  const status = document.getElementById("form-konfirmasi").value;

  if (status === "Hadir") {
    hadirCount++;
    document.getElementById("count-h").innerText = hadirCount;
  } else {
    tidakHadirCount++;
    document.getElementById("count-th").innerText = tidakHadirCount;
  }

  const box = document.getElementById("box-komentar");
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment-item";
  commentDiv.innerHTML = `<span class="comment-name">${nama} <span style="color:#5bc0de;">✓</span></span><p>${pesan}</p><span class="comment-time">Baru saja</span>`;
  box.insertBefore(commentDiv, box.firstChild);

  document.getElementById("form-pesan").value = "";
  document.getElementById("form-konfirmasi").selectedIndex = 0;
  alert("Terima kasih atas ucapan dan konfirmasinya!");
}

// 7. SISTEM LOGIKA HITUNG MUNDUR (COUNTDOWN)
function initCountdown() {
  // Target tanggal: Senin, 10 Agustus 2026 pukul 10:00 WIB
  const targetDate = new Date(2026, 7, 10, 10, 0, 0).getTime();

  const interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText =
      seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
    }
  }, 1000);
}
