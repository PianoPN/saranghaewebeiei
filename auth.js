import { auth } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let isSignUpMode = true;

const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const errorDiv = document.getElementById('auth-error');
const toggleBtn = document.getElementById('btn-toggle-auth');

// สลับโหมด Login / Register
toggleBtn.addEventListener('click', () => {
  isSignUpMode = !isSignUpMode;
  document.getElementById('auth-title').textContent = isSignUpMode ? "สมัครเป็นแฟนสุดน่ารัก" : "เข้าสู่ระบบ";
  document.getElementById('btn-auth-submit').textContent = isSignUpMode ? "สมัครสมาชิกแฟน 🌸" : "เข้าสู่ระบบ 💕";
  document.getElementById('toggle-text').textContent = isSignUpMode ? "มีบัญชีแล้วใช่ไหม?" : "ยังไม่มีบัญชีใช่ไหม?";
  toggleBtn.textContent = isSignUpMode ? "เข้าสู่ระบบ" : "สมัครสมาชิก";
  errorDiv.textContent = "";
});

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  errorDiv.textContent = "";

  try {
    if (isSignUpMode) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    // เข้าสู่ระบบสำเร็จ ไปหน้าเลือกบทบาท
    window.location.href = 'landing.html';
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      errorDiv.textContent = "อีเมลนี้ถูกใช้งานแล้ว ลองเข้าสู่ระบบดูนะ!";
    } else if (err.code === 'auth/invalid-email') {
      errorDiv.textContent = "รูปแบบอีเมลไม่ถูกต้องครับ";
    } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
      errorDiv.textContent = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
    } else {
      errorDiv.textContent = "เกิดข้อผิดพลาด: " + err.message;
    }
  }
});