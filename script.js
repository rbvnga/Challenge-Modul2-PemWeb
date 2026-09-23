// Mengambil elemen dari HTML
const questForm = document.getElementById("quest-form");
const questInput = document.getElementById("quest-input");
const priorityInput = document.getElementById("priority-input");
const questList = document.getElementById("quest-list");
const emptyState = document.querySelector(".empty-state");
const questCount = document.getElementById("quest-count");
const clearCompletedBtn = document.getElementById("clear-completed");

const filterButtons = document.querySelectorAll(".btn-filter");
const priorityButtons = document.querySelectorAll(".priority-filter-btn");

// Filter awal
let statusFilter = "semua";
let priorityFilter = "all";

// ======================================
// TAMBAH QUEST
// ======================================

questForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const namaQuest = questInput.value.trim();
  const priority = priorityInput.value;

  // Kalau input kosong, tidak melakukan apa-apa
  if (namaQuest === "") {
    return;
  }

  // Membuat li
  const li = document.createElement("li");

  li.className = "quest-item";

  // Menyimpan status dan priority
  li.setAttribute("priority", priority);
  li.setAttribute("status", "belum");

  // Membuat nama quest
  const nama = document.createElement("span");

  nama.textContent = namaQuest;

  // Membuat tulisan priority
  const prioritas = document.createElement("span");

  prioritas.textContent = priority;

  prioritas.className = "priority";

  // Membuat tombol selesai
  const tombolSelesai = document.createElement("button");

  tombolSelesai.textContent = "Selesai";

  tombolSelesai.type = "button";

  // Membuat tombol hapus
  const tombolHapus = document.createElement("button");

  tombolHapus.textContent = "Hapus";

  tombolHapus.type = "button";

  // Memasukkan semuanya ke li
  li.appendChild(nama);

  li.appendChild(prioritas);

  li.appendChild(tombolSelesai);

  li.appendChild(tombolHapus);

  // Memasukkan li ke ul
  questList.appendChild(li);

  // ======================================
  // TOMBOL SELESAI
  // ======================================

  tombolSelesai.addEventListener("click", function () {
    const status = li.getAttribute("status");

    if (status === "belum") {
      li.setAttribute("status", "selesai");

      nama.style.textDecoration = "line-through";

      tombolSelesai.textContent = "Batal";
    } else {
      li.setAttribute("status", "belum");

      nama.style.textDecoration = "none";

      tombolSelesai.textContent = "Selesai";
    }

    updateTampilan();
  });

  // ======================================
  // TOMBOL HAPUS
  // ======================================

  tombolHapus.addEventListener("click", function () {
    li.remove();

    updateTampilan();
  });

  // Mengosongkan input
  questInput.value = "";

  updateTampilan();
});

// ======================================
// FILTER STATUS
// ======================================

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    // Tombol pertama = Semua
    if (i === 0) {
      statusFilter = "semua";
    }

    // Tombol kedua = Belum Selesai
    if (i === 1) {
      statusFilter = "belum";
    }

    // Tombol ketiga = Selesai
    if (i === 2) {
      statusFilter = "selesai";
    }

    for(let j=0; j < filterButtons.length; j++){
      filterButtons[j].classList.remove("active");
    }
    filterButtons[i].classList.add("active");

    updateTampilan();
  });
}

// ======================================
// FILTER PRIORITY
// ======================================

for (let i = 0; i < priorityButtons.length; i++) {
  priorityButtons[i].addEventListener("click", function () {
    priorityFilter = priorityButtons[i].getAttribute("data-priority");

    for (let j = 0; j < priorityButtons.length; j++){
      priorityButtons[j].classList.remove("active");
    }
    priorityButtons[i].classList.add("active")
    updateTampilan();
  });
}

// ======================================
// HAPUS SEMUA YANG SUDAH SELESAI
// ======================================

clearCompletedBtn.addEventListener("click", function () {
  const semuaQuest = document.querySelectorAll(".quest-item");

  for (let i = 0; i < semuaQuest.length; i++) {
    const status = semuaQuest[i].getAttribute("status");

    if (status === "selesai") {
      semuaQuest[i].remove();
    }
  }

  updateTampilan();
});

// ======================================
// UPDATE TAMPILAN
// ======================================

function updateTampilan() {
  const semuaQuest = document.querySelectorAll(".quest-item");

  let jumlahBelumSelesai = 0;
  let jumlahTerlihat = 0;

  for (let i = 0; i < semuaQuest.length; i++) {
    const quest = semuaQuest[i];

    const status = quest.getAttribute("status");

    const priority = quest.getAttribute("priority");

    // Menghitung quest yang belum selesai
    if (status === "belum") {
      jumlahBelumSelesai++;
    }

    let tampil = true;

    // Filter status
    if (statusFilter !== "semua") {
      if (status !== statusFilter) {
        tampil = false;
      }
    }

    // Filter priority
    if (priorityFilter !== "all") {
      if (priority !== priorityFilter) {
        tampil = false;
      }
    }

    // Tampilkan atau sembunyikan quest
    if (tampil === true) {
      quest.style.display = "";

      jumlahTerlihat++;
    } else {
      quest.style.display = "none";
    }
  }

  // Mengubah jumlah quest tersisa
  questCount.textContent = jumlahBelumSelesai + " quest tersisa";

  // Kalau belum ada quest
  if (semuaQuest.length === 0) {
    emptyState.textContent = "Belum ada quest. Chill dulu";

    emptyState.style.display = "block";
  }

  // Kalau ada quest, tetapi tidak sesuai filter
  else if (jumlahTerlihat === 0) {
    emptyState.textContent = "Tidak ada quest di filter ini";

    emptyState.style.display = "block";
  }

  // Kalau ada quest yang ditampilkan
  else {
    emptyState.style.display = "none";
  }
}
