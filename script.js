const questForm = document.getElementById("quest-form");
const questInput = document.getElementById("quest-input");
const priorityInput = document.getElementById("priority-input");
const questList = document.getElementById("quest-list");
const emptyState = document.querySelector(".empty-state");
const questCount = document.getElementById("quest-count");
const clearCompletedBtn = document.getElementById("clear-completed");

const filterButtons = document.querySelectorAll(".filter button");
const priorityFilterButtons = document.querySelectorAll(".priority-filter-btn");

let statusFilter = "all";
let priorityFilter = "all";

// ===============================
// TAMBAH QUEST
// ===============================

questForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const namaQuest = questInput.value.trim();
  const priority = priorityInput.value;

  if (namaQuest === "") {
    return;
  }

  const li = document.createElement("li");

  li.classList.add("quest-item");
  li.dataset.priority = priority;
  li.dataset.completed = "false";

  const questText = document.createElement("span");
  questText.textContent = namaQuest;

  const priorityText = document.createElement("span");
  priorityText.textContent = priority;
  priorityText.classList.add("priority");

  const selesaiButton = document.createElement("button");
  selesaiButton.textContent = "Selesai";
  selesaiButton.type = "button";

  const hapusButton = document.createElement("button");
  hapusButton.textContent = "Hapus";
  hapusButton.type = "button";

  li.appendChild(questText);
  li.appendChild(priorityText);
  li.appendChild(selesaiButton);
  li.appendChild(hapusButton);

  questList.appendChild(li);

  // Tombol selesai
  selesaiButton.addEventListener("click", function () {
    if (li.dataset.completed === "false") {
      li.dataset.completed = "true";
      li.classList.add("completed");

      questText.style.textDecoration = "line-through";
      selesaiButton.textContent = "Batal";
    } else {
      li.dataset.completed = "false";
      li.classList.remove("completed");

      questText.style.textDecoration = "none";
      selesaiButton.textContent = "Selesai";
    }

    updateQuest();
  });

  // Tombol hapus
  hapusButton.addEventListener("click", function () {
    li.remove();

    updateQuest();
  });

  questInput.value = "";

  updateQuest();
});

// ===============================
// FILTER STATUS
// ===============================

filterButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    if (index === 0) {
      statusFilter = "all";
    } else if (index === 1) {
      statusFilter = "unfinished";
    } else if (index === 2) {
      statusFilter = "completed";
    }

    filterButtons.forEach(function (btn) {
      btn.classList.remove("btn-filter-active");
      btn.classList.add("btn-filter");
    });

    button.classList.remove("btn-filter");
    button.classList.add("btn-filter-active");

    updateQuest();
  });
});

// ===============================
// FILTER PRIORITY
// ===============================

priorityFilterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    priorityFilter = button.dataset.priority;

    priorityFilterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    updateQuest();
  });
});

// ===============================
// HAPUS QUEST YANG SELESAI
// ===============================

clearCompletedBtn.addEventListener("click", function () {
  const questItems = document.querySelectorAll(".quest-item");

  questItems.forEach(function (item) {
    if (item.dataset.completed === "true") {
      item.remove();
    }
  });

  updateQuest();
});

// ===============================
// UPDATE TAMPILAN
// ===============================

function updateQuest() {
  const questItems = document.querySelectorAll(".quest-item");

  let questTersisa = 0;
  let questTerlihat = 0;

  questItems.forEach(function (item) {
    const completed = item.dataset.completed === "true";
    const priority = item.dataset.priority;

    // Hitung quest yang belum selesai
    if (!completed) {
      questTersisa++;
    }

    let tampilStatus = true;
    let tampilPriority = true;

    // Filter status
    if (statusFilter === "unfinished" && completed) {
      tampilStatus = false;
    }

    if (statusFilter === "completed" && !completed) {
      tampilStatus = false;
    }

    // Filter priority
    if (priorityFilter !== "all" && priority !== priorityFilter) {
      tampilPriority = false;
    }

    // Tampilkan / sembunyikan
    if (tampilStatus && tampilPriority) {
      item.style.display = "";
      questTerlihat++;
    } else {
      item.style.display = "none";
    }
  });

  questCount.textContent = questTersisa + " quest tersisa";

  // Empty state
  if (questItems.length === 0) {
    emptyState.textContent = "Belum ada quest. Chill dulu";
    emptyState.style.display = "block";
  } else if (questTerlihat === 0) {
    emptyState.textContent = "Tidak ada quest di filter ini";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}
