import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase Configuration
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyANYoQSKphY_XAnilkdY-5R61iCC-aYukQ",
  authDomain: "id-tipshub.firebaseapp.com",
  projectId: "id-tipshub",
  storageBucket: "id-tipshub.firebasestorage.app",
  messagingSenderId: "386076617554",
  appId: "1:386076617554:web:d5051dcbb01fb89446e88b",
  measurementId: "G-3TLPW3QLBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const tipForm = document.getElementById("tipForm");
const tipsContainer = document.getElementById("tipsContainer");
const addTipButton = document.getElementById("addTipButton");
const showTipsButton = document.getElementById("showTipsButton");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalTip = document.getElementById("modalTip");
const closeModal = document.getElementById("closeModal");

// Toggle Form Visibility
addTipButton.addEventListener("click", () => {
  tipForm.classList.toggle("hidden");
});

// Toggle Tips Grid Visibility
showTipsButton.addEventListener("click", () => {
  if (tipsContainer.classList.contains("hidden")) {
    tipsContainer.classList.remove("hidden");
    tipsContainer.classList.add("show");
    showTipsButton.textContent = "Hide Tips";
  } else {
    tipsContainer.classList.add("hidden");
    tipsContainer.classList.remove("show");
    showTipsButton.textContent = "Show Tips";
  }
});

// Submit Tip
tipForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const tip = document.getElementById("tip").value;

  try {
    await addDoc(collection(db, "tips"), {
      name,
      title,
      tip,
      timestamp: new Date(),
    });
    tipForm.reset();
    tipForm.classList.add("hidden");
  } catch (error) {
    console.error("Error adding tip:", error);
  }
});

// Display Tips with Click Event for Modal
onSnapshot(collection(db, "tips"), (snapshot) => {
  tipsContainer.innerHTML = "";
  snapshot.forEach((doc) => {
    const { name, title, tip } = doc.data();
    const tipCard = document.createElement("div");
    tipCard.className = "tip-card";
    tipCard.innerHTML = `<h3>${name} - ${title}</h3><p>${tip.slice(
      0,
      50
    )}...</p>`;

    tipCard.addEventListener("click", () => {
      modalTitle.textContent = `${name} - ${title}`;
      modalTip.textContent = tip;
      modal.classList.remove("hidden");
    });

    tipsContainer.appendChild(tipCard);
  });
});

// Close Modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
