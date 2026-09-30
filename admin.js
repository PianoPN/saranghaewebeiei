import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

async function loadAnswers() {
  const container = document.getElementById('answers-list');
  container.innerHTML = "";

  try {
    const q = query(collection(db, "relationship_answers"), orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      container.innerHTML = "<p>ยังไม่มีคำตอบถูกส่งเข้ามาครับ 🌸</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement('div');
      card.className = 'answer-card';
      card.innerHTML = `
        <h4>👤 คนตอบ: ${data.partnerName} (แฟนของ: ${data.myName})</h4>
        <p><strong>เริ่มชอบเมื่อไหร่:</strong> ${data.whenStartLiking}</p>
        <p><strong>ทำไมถึงชอบ:</strong> ${data.whyLike}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching answers: ", error);
    container.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  }
}