// portfolio.js
// Load this script with type="module"

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAr_Y7ZbXCPH--Oe3j8l2Zg0RCmAkV8iBk",
  authDomain: "natania-9a7c1.firebaseapp.com",
  projectId: "natania-9a7c1",
  storageBucket: "natania-9a7c1.appspot.com", // ✅ Make sure this is exact
  messagingSenderId: "1051121387245",
  appId: "1:1051121387245:web:d3bef085cee8aa29af2ee4",
  measurementId: "G-1X0QJT74QT"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// ✅ DOM Elements
const uploadInput = document.getElementById("photo-upload");
const photoGrid = document.getElementById("photo-grid");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const confirmation = document.getElementById("confirmation");

// ✅ Upload and Save Image
uploadInput?.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `photos/${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "photos"), {
      url,
      timestamp: serverTimestamp()
    });

    showConfirmation();
    loadImages();
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed. Please try again.");
  }
});

// ✅ Load Images
async function loadImages() {
  photoGrid.innerHTML = "";

  const snapshot = await getDocs(query(collection(db, "photos"), orderBy("timestamp", "desc")));
  snapshot.forEach((doc) => {
    const data = doc.data();
    const img = document.createElement("img");
    img.src = data.url;
    img.alt = "Uploaded photo";
    img.classList.add("grid-photo");
    img.addEventListener("click", () => openModal(img.src));
    photoGrid.appendChild(img);
  });
}

// ✅ Modal Viewer
function openModal(src) {
  modalImg.src = src;
  modal.classList.add("active");
}

modal?.addEventListener("click", () => {
  modal.classList.remove("active");
});

// ✅ Show Upload Confirmation
function showConfirmation() {
  if (!confirmation) return;
  confirmation.classList.add("show");
  setTimeout(() => confirmation.classList.remove("show"), 2000);
}

// ✅ Load on Page Ready
window.addEventListener("DOMContentLoaded", loadImages);
