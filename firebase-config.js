// js/firebase-config.js

// 1. Import ฟังก์ชันที่จำเป็นจาก Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // 👈 เพิ่มบรรทัดนี้

// 2. นำรหัสจาก Firebase Console มาวางตรงนี้แทนที่ข้อความข้างล่าง
const firebaseConfig = {
  apiKey: "AIzaSyBcBYJwrfkd7ElV43rMAENPeoWnZly9tLQ",
  authDomain: "my-surprise-love.firebaseapp.com",
  projectId: "my-surprise-love",
  storageBucket: "my-surprise-love.firebasestorage.app",
  messagingSenderId: "1071079326326",
  appId: "1:1071079326326:web:32fea417c636c474531557"
};

// 3. เริ่มต้นการทำงานของ Firebase และ Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // 👈 เพิ่มบรรทัดนี้แล้ว export ออกไป
// js/firebase-config.js
