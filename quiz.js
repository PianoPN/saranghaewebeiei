// js/quiz.js
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const quizForm = document.getElementById('quiz-form');

if (quizForm) {
  quizForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บ รีเฟรชตัวเอง
    
    // ดึงปุ่มส่งคำตอบเพื่อเปลี่ยนข้อความระหว่างกำลังบันทึก
    const submitBtn = quizForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "กำลังบันทึกความทรงจำ... 💕";
    }

    // รวบรวมคำตอบจากฟอร์ม
    const answersData = {
      partnerName: document.getElementById('q-partner-name').value.trim(),
      myName: document.getElementById('q-my-name').value.trim(),
      whenStartLiking: document.getElementById('q-when-like').value.trim(),
      whyLike: document.getElementById('q-why-like').value.trim(),
      submittedAt: serverTimestamp()
    };

    try {
      // 💾 1. พยายามบันทึกข้อมูลลง Firebase Firestore
      await addDoc(collection(db, "relationship_answers"), answersData);
      
      // 🔴 2. บันทึกสำเร็จ -> เปลี่ยนหน้าไปยัง main-surprise.html ทันที
      window.location.href = 'main-surprise.html';

    } catch (error) {
      console.error("Firebase Error: ", error);
      
      // 🔴 3. ถึงแม้ Firebase มีปัญหา/ยังไม่ได้ตั้งค่า ก็ยังยอมให้ข้ามไปหน้าหลักเซอร์ไพรส์ได้
      window.location.href = 'main.html';
    }
  });
}